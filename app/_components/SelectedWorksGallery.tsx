"use client";

import { useEffect, useState } from "react";

type Orientation = "portrait" | "landscape";

type LayoutItem = {
  src: string;
  className: string;
};

function getOrientation(width: number, height: number): Orientation {
  return width >= height ? "landscape" : "portrait";
}

export function SelectedWorksGallery({
  images,
}: {
  images: string[];
}) {
  const [orientationMap, setOrientationMap] = useState<Record<string, Orientation>>({});

  useEffect(() => {
    let cancelled = false;

    const preload = async () => {
      const results = await Promise.all(
        images.map(
          (src) =>
            new Promise<{ src: string; orientation: Orientation }>((resolve) => {
              const img = new window.Image();
              img.onload = () => {
                resolve({
                  src,
                  orientation: getOrientation(img.naturalWidth, img.naturalHeight),
                });
              };
              img.onerror = () => {
                resolve({
                  src,
                  orientation: "portrait",
                });
              };
              img.src = src;
            })
        )
      );

      if (!cancelled) {
        setOrientationMap(
          Object.fromEntries(results.map(({ src, orientation }) => [src, orientation]))
        );
      }
    };

    preload();

    return () => {
      cancelled = true;
    };
  }, [images]);

  const layoutItems: LayoutItem[] = [];

  for (let index = 0; index < images.length; index += 1) {
    const src = images[index];
    const orientation = orientationMap[src] ?? "portrait";

    if (orientation === "landscape") {
      layoutItems.push({ src, className: "is-landscape" });
      continue;
    }

    const nextSrc = images[index + 1];
    const nextOrientation = nextSrc ? orientationMap[nextSrc] ?? "portrait" : "portrait";

    const shouldPair = nextSrc && nextOrientation === "portrait";

    if (shouldPair) {
      layoutItems.push({ src, className: "is-portrait-pair-left" });
      layoutItems.push({ src: nextSrc, className: "is-portrait-pair-right" });
      index += 1;
    } else {
      layoutItems.push({
        src,
        className: "is-portrait-single",
      });
    }
  }

  return (
    <section className="selected-works-gallery" aria-label="Selected photographs">
      {layoutItems.map((item) => (
        <figure className={`selected-works-card ${item.className}`} key={item.src}>
          <img src={item.src} alt="Selected work" loading="lazy" />
        </figure>
      ))}
    </section>
  );
}
