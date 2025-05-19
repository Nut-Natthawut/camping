/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { imageSchema, landmarkSchema, profileSchema, validateWithZod } from "@/utils/schemas";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import db from "@/utils/db";
import { redirect } from "next/navigation";
import { uploadFile } from "@/utils/supabase";


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
  
) => {
  
  const landmarks = await db.landmark.findMany({
    orderBy:{
      createdAt:'desc'
    }
  })

  return landmarks
}