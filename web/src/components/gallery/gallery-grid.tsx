import { Row } from "react-bootstrap";
import useGalleries from "../../hooks/useGalleries";
import { GalleryQuery } from "../pages/gallery/galllery-grid-layout";
import GalleryGridItem from "./gallery-grid-item";
import GalleryItemSkeleton from "./gallery-item-skeleton";

const GalleryGrid = () => {
  const { data, error, isLoading } = useGalleries();
  const skeletons = ["1", "2"];

  return (
    <div>
      {error && (
        <div>
          <p className="danger">{error.message}</p>
        </div>
      )}
      {isLoading && (
        <Row xs={1} md={2} lg={2} className="g-1 align-items-middle">
          {skeletons.map((skeleton) => (
            <GalleryItemSkeleton key={skeleton}></GalleryItemSkeleton>
          ))}
        </Row>
      )}
      <Row xs={1} md={2} lg={2} className="g-1 align-items-middle">
        {data?.results.map((result: any) => (
          <GalleryGridItem
            key={result.id}
            name={result.name}
            thumbnail={result.background_image}
            description={result.description}
            badgeItems={result.genres}
            slug={result.slug}
          />
        ))}
      </Row>
    </div>
  );
};

export default GalleryGrid;
