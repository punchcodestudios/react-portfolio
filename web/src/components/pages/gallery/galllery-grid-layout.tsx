import { Box, Flex, Grid, GridItem, Show } from "@chakra-ui/react";
import { useState } from "react";
import useGalleryQueryStore from "../../../state-management/gallery/gallery-store";
import SearchInput from "../../common/search-input/search-input";
import SortSelector from "../../common/sort-selector/sort-selector";
import DisciplineSelector from "../../gallery/discipline-selector";
import GalleryGrid from "../../gallery/gallery-grid";
import SkillsList from "../../gallery/skills-list";

export interface GalleryQuery {
  skillId?: number;
  disciplineId?: number;
  sortOrder: string;
  searchText: string;
}

const GalleryGridLayout = () => {
  const store = useGalleryQueryStore();

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <GridItem area="nav">
        <SearchInput />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside">
          <SkillsList />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={2}>
          <Flex marginBottom={5}>
            <Box marginRight={5}>
              <DisciplineSelector />
            </Box>
            <SortSelector />
          </Flex>
        </Box>
        <GalleryGrid />
      </GridItem>
    </Grid>
  );
};

export default GalleryGridLayout;
