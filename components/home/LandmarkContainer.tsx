import { fetchLandmarks } from "@/actions/actions"
import LandmarkList from "./LandmarkList";
import { LandmarkCardProps } from "@/utils/types";


const LandmarkContainer = async() => {

    const lanmarks:LandmarkCardProps[] = await fetchLandmarks();
    console.log(lanmarks)

  return (
    <LandmarkList landmarks={lanmarks}/>
  )
}
export default LandmarkContainer