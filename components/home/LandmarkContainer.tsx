import { fetchLandmarks } from "@/actions/actions"
import LandmarkList from "./LandmarkList";
import { LandmarkCardProps } from "@/utils/types";
import Hero from "../hero/Hero";


const LandmarkContainer = async() => {

    const lanmarks:LandmarkCardProps[] = await fetchLandmarks();
    // console.log(lanmarks)

  return (
    <div>
      <Hero landmarks={lanmarks}/>
      <LandmarkList landmarks={lanmarks}/>

    </div>
  )
}
export default LandmarkContainer