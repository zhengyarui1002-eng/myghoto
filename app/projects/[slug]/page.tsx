import { notFound } from "next/navigation";
import { PhotoSeriesViewer } from "../../_components/PhotoSeriesViewer";
import { getPhotoSeriesImages, photoSeries } from "../../_data/photoSeries";

export async function generateStaticParams() {
  return Object.keys(photoSeries).map((slug) => ({ slug }));
}

export default async function ProjectSeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = photoSeries[slug];

  if (!series) {
    notFound();
  }

  const images = await getPhotoSeriesImages(series.folder);

  return (
    <PhotoSeriesViewer
      title={series.title}
      subtitle={series.subtitle}
      images={images}
    />
  );
}
