import { Heading } from "@chakra-ui/react";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useGallery from "../../../hooks/useGallery";
import ExpandableText from "../../common/expandable-text/expandable-text.component";
import GalleryAttributes from "./gallery-attributes.component";

const GalleryDetails = () => {
  const { slug } = useParams();
  const { data: gallery, isLoading, error } = useGallery(slug!);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error || !gallery) throw error;

  return (
    <>
      <Heading>{gallery.name}</Heading>
      <ExpandableText>{gallery.description_raw}</ExpandableText>
      <GalleryAttributes gallery={gallery}></GalleryAttributes>
    </>
  );
};

export default GalleryDetails;
