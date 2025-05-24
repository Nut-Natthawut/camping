import { fetchLandmarkDetail } from "@/actions/actions";
import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import Breadcrums from "@/components/landmark/Breadcrums";
import Description from "@/components/landmark/Description";
import ImageContainer from "@/components/landmark/ImageContainer";
import ShareButton from "@/components/landmark/ShareButton";
import MapLandmark from "@/components/map/MapLandmark";
import { redirect } from "next/navigation";

const LandmarkDetail = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const landmark = await fetchLandmarkDetail({ id });
  if (!landmark) redirect("/");

  return (
    <section>
      <Breadcrums name={landmark.name} />
      <header className="flex justify-between items-center mt-4">
        <h1 className="text-4xl font-bold ">{landmark.name}</h1>
        <div className="flex items-center gap-4">
          <ShareButton landmarkId={landmark.id} name={landmark.name}  />
          <FavoriteToggleButton landmarkId={landmark.id} />
        </div>
      </header>
      {/* Image */}
      <ImageContainer mainImage={landmark.image} name={landmark.name} />
      {/* Detail */}
      <section>
        <div>
          <Description description={landmark.description} />
          <div className="my-8">
            <MapLandmark location={{ lat: landmark.lat, lng: landmark.lng }} />
          </div>
        </div>
      </section>
    </section>
  );
};
export default LandmarkDetail;
