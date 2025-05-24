import { fetchLandmarks, fetchLandmarksHero } from "@/actions/actions";
import LandmarkList from "./LandmarkList";
import { LandmarkCardProps } from "@/utils/types";
import Hero from "../hero/Hero";
import CategoriseList from "./CategoriseList";
import EmptyList from "./EmptyList";

const LandmarkContainer = async ({
  search,category
}: {
  search?: string;
  category?: string;
}) => {
  const lanmarks: LandmarkCardProps[] = await fetchLandmarks({search,category});
  const lanmarksHero: LandmarkCardProps[] = await fetchLandmarksHero();
  // console.log(lanmarks)
  return (
    <div>
      <Hero landmarks={lanmarksHero} />
      <CategoriseList  search={search} category={category}/>
      {
        lanmarks.length === 0
          ?<EmptyList heading="No result" btnText="Clear Filters"/>
          :<LandmarkList landmarks={lanmarks} />
        
      }
      
    </div>
  );
};
export default LandmarkContainer;
