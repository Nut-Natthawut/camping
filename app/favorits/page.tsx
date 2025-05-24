import { fetchFavorites } from "@/actions/actions"
import EmptyList from "@/components/home/EmptyList";
import LandmarkList from "@/components/home/LandmarkList";

const FavoritsPage = async() => {
  const favorites = await fetchFavorites();
  if(favorites.length === 0) {
  return <EmptyList heading="No Favorite" btnText="Add Favorite" />
  } 
  return <LandmarkList landmarks={favorites} />
}
export default FavoritsPage