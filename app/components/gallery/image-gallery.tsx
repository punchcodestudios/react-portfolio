import React from "react";
import { Link } from "react-router";
import { useDataContext } from "../data/dataContext";
import { Button } from "../ui/button";
import type { GalleryItem } from "~/routes/ui/dataGalleryContainer";

const ImageGallery = () => {
  const { displayData } = useDataContext<GalleryItem>();
  return (
    <div className="w-full flex justify-center">
      <div
        className="
          grid
          gap-6
          justify-center
          items-start
          w-full
          max-w-7xl
          p-4
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
        "
      >
        {displayData &&
          displayData.map((item: GalleryItem) => (
            <div
              key={item.id}
              className="
                flex flex-col
                bg-slate-50
                rounded-md
                shadow
                overflow-hidden
                sm:min-w-[220px]
                sm:min-h-[320px]
                max-w-full
                md:aspect-[4/5]
                transition
                hover:shadow-lg
              "
            >
              <div className="w-full h-20 flex items-center justify-center bg-gray-200">
                <img
                  src={item.image || "/images/error-404.png"}
                  alt={item.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex-1 flex flex-col p-4">
                <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
                <p className="flex-grow text-sm text-gray-700 mb-4 flex-grow-1">
                  {item.description}
                </p>
                <Link to={item.ctaUrl}>
                  <Button variant="secondary" className="w-full">
                    GO
                  </Button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ImageGallery;
