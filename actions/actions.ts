/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { imageSchema, landmarkSchema, profileSchema, validateWithZod } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";
import { revalidatePath } from "next/cache";


const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("You must logged !!!");
  }
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  return {
    message: error instanceof Error ? error.message : "An error !!",
  };
};

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const user = await getAuthUser();
    
    const rawData = Object.fromEntries(formData);
    const validateField = validateWithZod(profileSchema, rawData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validateField,
      },
    });

    const client = await clerkClient();
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });

    // return { message: "Create Profile Success!!!" };
  } catch (error) {
    // console.log(error)
    return renderError(error);
  }
  redirect("/");
};


export const createLandmarkAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  try {
    const user = await getAuthUser();
    // validate error
    const rawData = Object.fromEntries(formData);
    const file = formData.get("image") as File

    //step1 ValidateData
    const validatedFile = validateWithZod(imageSchema, { image: file });
    const validateField = validateWithZod(landmarkSchema, rawData);
    
    //step2 Upload Image to supabase
    const fullpath = await uploadFile(validatedFile.image)
    console.log(fullpath)



    //step3 Insert to DB
    await db.landmark.create({
      data:{
        ...validateField,
        image: fullpath,
        profileId: user.id,
      }
    })

    // return { message: "Create Landmark Success!!!" };
  } catch (error) {
    // console.log(error)
    return renderError(error);
  }
  redirect("/");
};

//fetch landmark
export const fetchLandmarks = async (
  // search 
  {search = "",category}: {search?: string,category?: string}) => {
  
  const landmarks = await db.landmark.findMany({
    where:{
      category,
      OR:[
        {name : {contains: search, mode: "insensitive"}},
        {description : {contains: search, mode: "insensitive"}}
      ]
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  return landmarks
}
export const fetchLandmarksHero = async () => {
  // search 

  const landmarks = await db.landmark.findMany({
   
    orderBy:{
      createdAt:'desc'
    },
    take:5
  });

  return landmarks;
}
//fetchFavoriteId
export const fetchFavoriteId = async ({landmarkId}: {landmarkId: string}) => {
    const user = await getAuthUser();
    const favorite = await db.favorite.findFirst({
      where: {
        landmarkId: landmarkId,
        profileId: user.id,
      },
      select: {
        id: true,
      }
    })
    return favorite?.id || null
}

export const toggleFavoriteAction = async (prevState:{
  favoriteId: string | null;
  landmarkId: string;
  pathname: string
}) => {
  const { favoriteId, landmarkId, pathname } = prevState;
  const user = await getAuthUser(); 
  try{
    //Delete
    if(favoriteId){
      await db.favorite.delete({
        where: {
          id: favoriteId,
        },
      });
    }else{
      //Create
      await db.favorite.create({
        data: {
          landmarkId: landmarkId,
          profileId: user.id
        },
      });
    }
    revalidatePath(pathname)
     return {message : favoriteId
    ? 'Remove Favorite Success'
    : 'Add Favorite Success'
  }
  }catch(error){
    return  renderError(error)
  }
}

//fetchFavorites show /app/favorite/page
export const fetchFavorites = async () => {
  const user = await getAuthUser();
  const favorites = await db.favorite.findMany({
    where: {
      profileId: user.id
    },
    select:{
      landmark:{
        select:{
          id: true,
          name: true,
          description: true,
          image: true,
          price: true,
          province: true,
          lat: true,
          lng: true,
          category: true
        }
      }
    }
  })

  return favorites.map((favorite) => favorite.landmark )
}

export const fetchLandmarkDetail = async ({id}: {id: string}) => {
  return db.landmark.findFirst({
    where: {
      id:id
    },
    include: {
      profile: true
    }
  })
}