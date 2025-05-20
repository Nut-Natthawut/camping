/* eslint-disable @typescript-eslint/no-explicit-any */
export type actionFunction = (
  prevState: any,
  formData: FormData
) => Promise<{ message: string }>;

//type landmark
export type LandmarkCardProps = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  province: string;
  lat: number;
  lng: number;
}