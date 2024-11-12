import { useQuery } from "@tanstack/react-query";
import ms from "ms";
import APIClient, { FetchResponse } from "../services/api-client";
import useGalleryQueryStore from "../state-management/gallery/gallery-store";
import { Gallery } from "../entities/Gallery";

const apiClient = new APIClient<Gallery>("games");

const useGalleries = () => {
  const galleryQuery = useGalleryQueryStore((s) => s.galleryQuery);
  return useQuery<FetchResponse<Gallery>, Error>({
    queryKey: ["gallery", galleryQuery],
    queryFn: () =>
      apiClient.getAll({
        params: {
          genres: galleryQuery.skillId,
          platforms: galleryQuery.disciplineId,
          ordering: galleryQuery.sortOrder,
          search: galleryQuery.searchText,
        },
      }),
    staleTime: ms("24h"),
  });
};

export default useGalleries;
