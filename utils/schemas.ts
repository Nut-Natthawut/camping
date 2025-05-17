import { z, ZodSchema } from "zod";
//validate
// const profileSchema = z.string().min(2,{message:"อักขระต้องมากกว่า 2 ตัว"});
export const profileSchema = z.object({
  firstName: z.string().min(2, { message: "ชื่อ ต้องมากกว่า 2 อักขระ" }),
  lastName: z.string().min(2, { message: "นามสกุล ต้องมากกว่า 2 อักขระ" }),
  userName: z.string().min(2, { message: "ชื่อผู้ใช้ ต้องมากกว่า 2 อักขระ" }),
});

export const validateWithZod = <T>(schema: ZodSchema<T>, data: unknown):T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};
