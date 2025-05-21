//rafce
import LoadingCart from "@/components/card/LoadingCart";
import LandmarkContainer from "@/components/home/LandmarkContainer";
import { Suspense } from "react";

const page = () => {
  //Search

  return (
    <section>
      <Suspense fallback={<LoadingCart />}>
        <LandmarkContainer />
      </Suspense>
    </section>
  );
};
export default page;
