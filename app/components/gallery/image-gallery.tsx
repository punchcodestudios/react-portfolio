import type { data } from "autoprefixer";
import React from "react";
import { Link } from "react-router";
import { useDataContext } from "../data/dataContext";
import { Button } from "../ui/button";
import type { GalleryItem } from "~/routes/ui/dataGalleryContainer";

const ImageGallery = () => {
  const { displayData } = useDataContext<GalleryItem>();
  return (
    <div className="flex flex-row flex-wrap justify-start">
      {displayData &&
        displayData.map((item: GalleryItem) => {
          return (
            <div key={item.id} className="p-4">
              <div className="w-full md:w-[300px] lg:w-[400px] h-[300px] bg-slate-50 rounded-md p-4 flex flex-col">
                <div>
                  <img src="/images/error-401.png"></img>
                </div>
                <h2>{item.title}</h2>
                <div className="flex flex-grow">
                  <p>{item.description}</p>
                </div>

                <Link to={item.ctaUrl}>
                  <Button variant="secondary">GO</Button>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ImageGallery;
