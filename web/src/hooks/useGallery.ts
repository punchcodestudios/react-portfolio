import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { Gallery } from "../entities/Gallery";

const apiClient = new APIClient<Gallery>("/games");

const useGallery = (slug: string) =>
  useQuery({
    queryKey: ["gallery", slug],
    queryFn: () => apiClient.get(slug),
  });

export default useGallery;
