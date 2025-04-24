import { useQuery } from "@tanstack/react-query";
// import ms from "ms";
import APIClient from "../services/api-client_DELETE";
import { FetchResponse } from "../entities/FetchResponse";
import useGalleryQueryStore from "../state-management/gallery/gallery-query-store";
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
    staleTime: 24 * 60 * 60 * 1000,
  });
};

export default useGalleries;
