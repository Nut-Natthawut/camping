"use client";
import { toggleFavoriteAction } from "@/actions/actions";
import FormContainer from "../form/FormContainer";
import { usePathname } from "next/navigation";
import { CartSubmitButton } from "../form/Buttons";

const FavoriteToggleForm = ({
  favoriteId,
  landmarkId,
}: {
  favoriteId: string | null;
  landmarkId: string;
}) => {
  const pathname = usePathname();
  console.log("id", favoriteId);
  console.log("path", pathname);

  const toggleAction = toggleFavoriteAction.bind(null, {
    favoriteId,
    landmarkId,
    pathname,
  });

  return (
    <FormContainer action={toggleAction}>
      <CartSubmitButton  isFavorite={favoriteId ? true : false}/>
    </FormContainer>
  );
};
export default FavoriteToggleForm;
