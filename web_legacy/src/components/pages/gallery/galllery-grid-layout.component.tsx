import { Grid, GridItem } from "@chakra-ui/react";
import GalleryGrid from "../../gallery/gallery-grid";
import GalleryNav from "./gallery-nav.component";
import PageBanner from "@/components/common/page-banner/page-banner.component";

const hero = require("../../../assets/img/gallery.png");

export interface GalleryQuery {
  skillId?: number;
  disciplineId?: number;
  sortOrder: string;
  searchText: string;
}

const GalleryGridLayout = () => {
  return (
    <Grid
      templateAreas={{
        base: `"hero" "nav" "main"`,
      }}
      templateColumns={{
        base: "1fr",
      }}
    >
      <GridItem area="hero">
        <PageBanner
          src={hero}
          alt="grayscale image of a mimimalistic art gallery"
        ></PageBanner>
      </GridItem>
      <GridItem area="nav">
        <GalleryNav></GalleryNav>
      </GridItem>
      <GridItem area="main">
        <GalleryGrid />
      </GridItem>
    </Grid>
  );
};

export default GalleryGridLayout;
