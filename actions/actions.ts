/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { profileSchema, validateWithZod } from "@/utils/schemas";

const renderError = (error:unknown):{message:string} => {
  return {
    message: error instanceof Error ? error.message : "An error !!",
  }
}

export const createProfileAction = async (prevState: any,formData: FormData) =>{
    
  try{
// validate error
    const rawData = Object.fromEntries(formData);
    const validateField = validateWithZod(profileSchema,rawData);
    console.log('validated',validateField)
    return { message: "Create Profile Success!!!" };
  }catch(error) {
    console.log(error)
    return renderError(error);
  }
};
