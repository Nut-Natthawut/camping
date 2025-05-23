import { fetchLandmarks } from "@/actions/actions";
import LandmarkList from "./LandmarkList";
import { LandmarkCardProps } from "@/utils/types";
import Hero from "../hero/Hero";
import CategoriseList from "./CategoriseList";

const LandmarkContainer = async ({
  search,category
}: {
  search?: string;
  category?: string;
}) => {
  const lanmarks: LandmarkCardProps[] = await fetchLandmarks({search,category});
  // console.log(lanmarks)

  return (
    <div>
      <Hero landmarks={lanmarks} />
      <CategoriseList  search={search} category={category}/>
      <LandmarkList landmarks={lanmarks} />
    </div>
  );
};
export default LandmarkContainer;
