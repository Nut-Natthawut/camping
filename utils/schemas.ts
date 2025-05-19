import { z, ZodSchema } from "zod";
//validate
// const profileSchema = z.string().min(2,{message:"อักขระต้องมากกว่า 2 ตัว"});
export const profileSchema = z.object({
  firstName: z.string().min(2, { message: "ชื่อ ต้องมากกว่า 2 อักขระ" }),
  lastName: z.string().min(2, { message: "นามสกุล ต้องมากกว่า 2 อักขระ" }),
  userName: z.string().min(2, { message: "ชื่อผู้ใช้ ต้องมากกว่า 2 อักขระ" }),
});

const validateImage = () => {
  const maxFileSize = 1024 * 1024;
  return z.instanceof(File).refine((file) => {
    return file.size <= maxFileSize;
  }, "File size must be less than 1MB");
};
export const imageSchema = z.object({
  image: validateImage(),
});

export const landmarkSchema = z.object({
  name: z
    .string()
    .min(2, { message: "ชื่อต้องมากกว่า 2 อักขระ" })
    .max(30, { message: "ชื่อต้องน้อยกว่ากว่า 30 อักขระ" }),
  category: z.string(),
  description: z.string()
    .min(2, { message: "รายละเอียดต้องมากกว่า 2 อักขระ" })
    .max(200, { message: "รายละเอียดต้องน้อยกว่ากว่า 200 อักขระ" }),
    price: z.coerce.number().int().min(0,{message: "ราคาต้องมากกว่า 0"}),
    province : z.string(),
    lat: z.coerce.number(),
    lng: z.coerce.number(),
});

export const validateWithZod = <T>(schema: ZodSchema<T>, data: unknown): T => {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error?.errors.map((error) => error.message);
    throw new Error(errors.join(","));
  }
  return result.data;
};
