//rafce
import LoadingCart from "@/components/card/LoadingCart";
import LandmarkContainer from "@/components/home/LandmarkContainer";
import { Suspense } from "react";

const page = async({searchParams} : 
  {searchParams: {search?: string , category?: string}}) => {
  //Search
  const {search,category} = await searchParams
  return (
    <section>
      <Suspense fallback={<LoadingCart />}>
        <LandmarkContainer search={search} category={category}/>
      </Suspense>
    </section>
  );
};
export default page;
