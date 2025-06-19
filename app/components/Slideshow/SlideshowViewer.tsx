import React, { useEffect, useState } from "react";

type SlideshowImage = {
  id: string | number;
  src: string;
  alt?: string;
  orientation?: "portrait" | "landscape";
  thumbnail?: string;
};

const fetchImages = async (): Promise<SlideshowImage[]> => {
  // Simulate REST API call
  // In a real app, replace with fetch("/api/images").then(res => res.json())
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          {
            id: 1,
            src: "/images/callout-coding.png",
            thumbnail: "/images/callout-coding.png",
            alt: "Landscape 1",
            orientation: "landscape",
          },
          {
            id: 2,
            src: "/images/self_portrait.png",
            thumbnail: "/images/self_portrait.png",
            alt: "Portrait 1",
            orientation: "portrait",
          },
          {
            id: 3,
            src: "/images/graduation-logo.png",
            thumbnail: "/images/graduation-logo.png",
            alt: "Landscape 2",
            orientation: "landscape",
          },
          {
            id: 4,
            src: "/images/callout-planning.png",
            thumbnail: "/images/callout-planning.png",
            alt: "Portrait 2",
            orientation: "portrait",
          },
        ]),
      500
    )
  );
};

const getOrientation = (img: SlideshowImage) => {
  if (img.orientation) return img.orientation;
  return img.src.toLowerCase().includes("portrait") ? "portrait" : "landscape";
};

const SlideshowViewer: React.FC = () => {
  const [images, setImages] = useState<SlideshowImage[]>([]);
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    fetchImages().then(setImages);
  }, []);

  const goPrev = () =>
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goNext = () =>
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const openFullscreen = () => setFullscreen(true);
  const closeFullscreen = () => setFullscreen(false);

  if (!images || images.length === 0) {
    return <div className="text-center py-8">Loading images...</div>;
  }

  const currentImage = images[current];
  const orientation = getOrientation(currentImage);

  const ImageDisplay = (
    <div className="relative flex justify-center items-center bg-gray-100 rounded shadow p-4 w-full min-h-[300px]">
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100"
        onClick={goPrev}
        aria-label="Previous"
      >
        ◀
      </button>
      <img
        src={currentImage.src}
        alt={currentImage.alt || `Slide ${current + 1}`}
        className={`object-contain transition-all duration-300 ${
          orientation === "portrait"
            ? "h-[400px] w-[80vw] xl:h-[60vh]"
            : "w-[600px] h-[60vh] xl:w-[90vw] "
        }`}
        style={{ borderRadius: 8 }}
      />
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-100"
        onClick={goNext}
        aria-label="Next"
      >
        ▶
      </button>
      <button
        className="absolute right-2 bottom-2 bg-white bg-opacity-80 rounded px-3 py-1 text-xs shadow hover:bg-opacity-100"
        onClick={openFullscreen}
        aria-label="Expand to fullscreen"
      >
        ⛶
      </button>
    </div>
  );

  return (
    <>
      {!fullscreen && (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
          {ImageDisplay}
          <div className="flex justify-center items-center mt-4 space-x-2">
            {images.map((img, idx) => (
              <button
                key={img.id}
                className={`w-3 h-3 rounded-full ${
                  idx === current ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {images.map((img, idx) => (
              <button
                key={img.id}
                className={`border-2 rounded ${
                  idx === current ? "border-blue-600" : "border-transparent"
                } p-0.5 bg-white`}
                onClick={() => setCurrent(idx)}
                aria-label={`Thumbnail for slide ${idx + 1}`}
              >
                <img
                  src={img.thumbnail || img.src}
                  alt={img.alt || `Thumbnail ${idx + 1}`}
                  className={`object-cover ${
                    getOrientation(img) === "portrait"
                      ? "h-16 w-12"
                      : "h-12 w-16"
                  } rounded`}
                />
              </button>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {currentImage.alt || `Slide ${current + 1} of ${images.length}`}
          </div>
        </div>
      )}

      {fullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-4 bg-white bg-opacity-80 rounded px-3 py-1 text-xs shadow hover:bg-opacity-100"
            onClick={closeFullscreen}
            aria-label="Close fullscreen"
          >
            ✕
          </button>
          <div className="flex flex-col items-center w-full h-full justify-center">
            <div className="relative flex justify-center items-center w-full h-full">
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-3 shadow hover:bg-opacity-100"
                onClick={goPrev}
                aria-label="Previous"
              >
                ◀
              </button>
              <img
                src={currentImage.src}
                alt={currentImage.alt || `Slide ${current + 1}`}
                className={`object-contain transition-all duration-300 max-h-[90vh] max-w-[90vw] ${
                  orientation === "portrait"
                    ? "h-[80vh] w-auto"
                    : "w-[90vw] h-auto"
                }`}
                style={{ borderRadius: 12 }}
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-3 shadow hover:bg-opacity-100"
                onClick={goNext}
                aria-label="Next"
              >
                ▶
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  className={`border-2 rounded ${
                    idx === current ? "border-blue-600" : "border-transparent"
                  } p-0.5 bg-white`}
                  onClick={() => setCurrent(idx)}
                  aria-label={`Thumbnail for slide ${idx + 1}`}
                >
                  <img
                    src={img.thumbnail || img.src}
                    alt={img.alt || `Thumbnail ${idx + 1}`}
                    className={`object-cover ${
                      getOrientation(img) === "portrait"
                        ? "h-16 w-12"
                        : "h-12 w-16"
                    } rounded`}
                  />
                </button>
              ))}
            </div>
            <div className="mt-4 text-white text-lg">
              {currentImage.alt || `Slide ${current + 1} of ${images.length}`}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SlideshowViewer;
