/* eslint-disable @typescript-eslint/no-explicit-any */
import { createLandmarkAction } from "@/actions/actions";
import { SubmitButton } from "@/components/form/Buttons";
import CategoryInput from "@/components/form/CategoryInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/Forminput";
import ImageInput from "@/components/form/ImageInput";
import ProviceInput from "@/components/form/ProvinceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import MapLandmark from "@/components/map/MapLandmark";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const CreateProfile = async () => {
  return (
    <section>
      <h1 className="2xl font-semibold mb-8 capitalize">Create Landmark</h1>
      <div className="border p-8 rounded-md">
        <FormContainer action={createLandmarkAction}>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="name"
              label="Landmark Name"
              type="text"
              placeholder="Landmark Name"
            />

            {/* Category */}
            <CategoryInput />
          </div>
          <TextAreaInput name="description" />
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <FormInput
              name="price"
              label="Price"
              type="number"
              placeholder="Price"
            />

             <ProviceInput />
          </div>
          <ImageInput />
         <MapLandmark />

          <SubmitButton className="mt-4" size="lg" text="Create Landmark" />
        </FormContainer>
      </div>
    </section>
  );
};
export default CreateProfile;
