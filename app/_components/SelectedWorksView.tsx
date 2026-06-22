import { getPhotoSeriesImages } from "../_data/photoSeries";
import { SelectedWorksGallery } from "./SelectedWorksGallery";
import { SiteFrame } from "./SiteFrame";

export async function SelectedWorksView() {
  const images = await getPhotoSeriesImages("selected-works");

  return (
    <SiteFrame
      title="Selected Works"
      intro="Random arrangement of selected works"
    >
      <SelectedWorksGallery images={images} />
    </SiteFrame>
  );
}
