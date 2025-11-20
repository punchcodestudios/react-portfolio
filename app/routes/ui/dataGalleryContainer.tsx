import type { ReactNode } from "react";
import { Link, type LoaderFunctionArgs, useLoaderData } from "react-router";
import {
  DataContextProvider,
  useDataContext,
} from "~/components/data/data-context";
import DataFilterContainer from "~/components/data/data-filter-container";
import DataPager from "~/components/data/data-pager";
import DataSortContainer from "~/components/data/data-sort-container";
import type { DataItemProps } from "~/components/data/data-table-types";
import ImageGallery from "~/components/gallery/image-gallery";
import { Button } from "~/components/ui/button";

export type GalleryItem = {
  id: string | number;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaUrl: string;
};

const initData: GalleryItem[] = [
  {
    id: 1,
    image: "/images/error-404.png",
    title: "Mountain Sunrise",
    description:
      "Experience the beauty of a sunrise over the mountains. What happens with this expands to be larger than the others?",
    ctaText: "View Gallery",
    ctaUrl: "#",
  },
  {
    id: 2,
    image: "/images/error-404.png",
    title: "City Lights",
    description: "Explore the vibrant nightlife and cityscapes.",
    ctaText: "See More",
    ctaUrl: "#",
  },
  {
    id: 3,
    image: "/images/self_portrait.png",
    title: "Forest Path",
    description: "Take a walk through serene forest trails.",
    ctaText: "Discover",
    ctaUrl: "#",
  },
  {
    id: 4,
    image: "/images/error-500.png",
    title: "Desert Adventure",
    description: "Embark on a journey across golden sands.",
    ctaText: "Start Adventure",
    ctaUrl: "#",
  },
  {
    id: 5,
    image: "/images/error-401.png",
    title: "Ocean Breeze",
    description: "Relax by the calming waves of the ocean.",
    ctaText: "Book Now",
    ctaUrl: "#",
  },
  {
    id: 6,
    image: "/images/about-this-site.png",
    title: "Countryside Escape",
    description: "Unwind in the peaceful countryside.",
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    id: 7,
    image: "/images/callout-coding.png",
    title: "Winter Wonderland",
    description: "Enjoy the magic of snowy landscapes.",
    ctaText: "Explore",
    ctaUrl: "#",
  },
  {
    id: 8,
    image: "/images/callout-deployment.png",
    title: "Tropical Paradise",
    description: "Soak up the sun in a tropical paradise.",
    ctaText: "Plan Trip",
    ctaUrl: "#",
  },
  {
    id: 9,
    image: "/images/callout-design.png",
    title: "Historic Landmarks",
    description: "Visit iconic landmarks from around the world.",
    ctaText: "View Landmarks",
    ctaUrl: "#",
  },
  {
    id: 10,
    image: "/images/callout-maintenance.png",
    title: "Wildlife Safari",
    description: "Get close to nature on a thrilling safari.",
    ctaText: "Join Safari",
    ctaUrl: "#",
  },
  {
    id: 11,
    image: "/images/callout-testing.png",
    title: "Cultural Festival",
    description: "Experience the colors and sounds of local festivals.",
    ctaText: "Attend Event",
    ctaUrl: "#",
  },
];

export async function loader({ params }: LoaderFunctionArgs) {
  return {
    data: {
      initData: [...initData],
    },
  };
}

interface DynamicGridProps {
  columns: number;
  children: ReactNode[];
  gap?: string; // e.g., "gap-4"
}

const DataGalleryContainer: React.FC<DynamicGridProps> = ({
  columns = 4,
  children,
  gap = "gap-4",
}: DynamicGridProps) => {
  const { data } = useLoaderData();

  const initColumns: DataItemProps[] = [
    {
      key: "ID",
      label: "ID",
      filterable: false,
      sortable: false,
      hidden: true,
    },
    { key: "Title", label: "Title", filterable: true, sortable: true },
    {
      key: "Description",
      label: "Description",
      filterable: true,
      sortable: true,
    },
  ];

  return (
    <>
      <DataContextProvider<GalleryItem> initialData={data.initData}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            Responsive Content Grid with Data Context
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row px-3 pb-0">
          <div className="w-full lg:w-1/2">
            <DataFilterContainer columns={initColumns}></DataFilterContainer>
          </div>
          <div className="w-full lg:w-1/2">
            <DataSortContainer columns={initColumns}></DataSortContainer>
          </div>
        </div>
        <div className="bg-slate-200 p-4 rounded-md mt-4">
          <DataPager />
        </div>
        <div className="flex justify-center">
          <ImageGallery></ImageGallery>
        </div>
      </DataContextProvider>
    </>
  );
};

export default DataGalleryContainer;
