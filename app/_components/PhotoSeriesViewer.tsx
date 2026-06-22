"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

type PhotoSeriesViewerProps = {
  title: string;
  subtitle: string;
  images: string[];
};

export function PhotoSeriesViewer({
  title,
  subtitle,
  images,
}: PhotoSeriesViewerProps) {
  const [index, setIndex] = useState(0);

  const total = images.length;

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex((nextIndex + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        goTo(index + 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goTo, index]);

  const currentImage = useMemo(() => images[index], [images, index]);

  if (!images.length) {
    return null;
  }

  return (
    <section className="photo-series-viewer">
      <div className="photo-series-meta">
        <span>
          {index + 1} / {total}
        </span>
        <div>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
      </div>

      <div className="photo-series-stage">
        <button
          className="photo-series-nav photo-series-nav-left"
          type="button"
          aria-label="Previous image"
          onClick={() => goTo(index - 1)}
        >
          ←
        </button>

        <button
          className="photo-series-image-button"
          type="button"
          aria-label="Next image"
          onClick={() => goTo(index + 1)}
        >
          <Image
            src={currentImage}
            alt={`${title} ${index + 1}`}
            fill
            priority
            sizes="100vw"
          />
        </button>

        <button
          className="photo-series-nav photo-series-nav-right"
          type="button"
          aria-label="Next image"
          onClick={() => goTo(index + 1)}
        >
          →
        </button>
      </div>
    </section>
  );
}
