import type { ReactNode } from "react";
import { Link, type LoaderFunctionArgs, useLoaderData } from "react-router";
import {
  DataContextProvider,
  useDataContext,
} from "~/components/data/dataContext";
import DataFilterContainer from "~/components/data/dataFilterContainer";
import DataPager from "~/components/data/dataPager";
import DataSortContainer from "~/components/data/dataSortContainer";
import type { TableColumn } from "~/components/data/dataTableTypes";
import { Button } from "~/components/ui/button";

type GalleryItem = {
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
    image: "/images/card1.jpg",
    title: "Mountain Sunrise",
    description: "Experience the beauty of a sunrise over the mountains.",
    ctaText: "View Gallery",
    ctaUrl: "#",
  },
  {
    id: 2,
    image: "/images/card2.jpg",
    title: "City Lights",
    description: "Explore the vibrant nightlife and cityscapes.",
    ctaText: "See More",
    ctaUrl: "#",
  },
  {
    id: 3,
    image: "/images/card3.jpg",
    title: "Forest Path",
    description: "Take a walk through serene forest trails.",
    ctaText: "Discover",
    ctaUrl: "#",
  },
  {
    id: 4,
    image: "/images/card4.jpg",
    title: "Desert Adventure",
    description: "Embark on a journey across golden sands.",
    ctaText: "Start Adventure",
    ctaUrl: "#",
  },
  {
    id: 5,
    image: "/images/card5.jpg",
    title: "Ocean Breeze",
    description: "Relax by the calming waves of the ocean.",
    ctaText: "Book Now",
    ctaUrl: "#",
  },
  {
    id: 6,
    image: "/images/card6.jpg",
    title: "Countryside Escape",
    description: "Unwind in the peaceful countryside.",
    ctaText: "Learn More",
    ctaUrl: "#",
  },
  {
    id: 7,
    image: "/images/card7.jpg",
    title: "Winter Wonderland",
    description: "Enjoy the magic of snowy landscapes.",
    ctaText: "Explore",
    ctaUrl: "#",
  },
  {
    id: 8,
    image: "/images/card8.jpg",
    title: "Tropical Paradise",
    description: "Soak up the sun in a tropical paradise.",
    ctaText: "Plan Trip",
    ctaUrl: "#",
  },
  {
    id: 9,
    image: "/images/card9.jpg",
    title: "Historic Landmarks",
    description: "Visit iconic landmarks from around the world.",
    ctaText: "View Landmarks",
    ctaUrl: "#",
  },
  {
    id: 10,
    image: "/images/card10.jpg",
    title: "Wildlife Safari",
    description: "Get close to nature on a thrilling safari.",
    ctaText: "Join Safari",
    ctaUrl: "#",
  },
  {
    id: 11,
    image: "/images/card11.jpg",
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
  const { displayData } = useDataContext();

  const initColumns: TableColumn[] = [
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
      <DataContextProvider initialData={data.initData}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">
            Responsive Content Grid with Data Context
          </h2>
        </div>
        <div className="flex flex-row px-3">
          <div className="w-1/2">
            <DataFilterContainer columns={initColumns}></DataFilterContainer>
          </div>
          <div className="w-1/2">
            <DataSortContainer columns={initColumns}></DataSortContainer>
          </div>
        </div>
        <DataPager></DataPager>
        <div className="flex flex-row flex-wrap justify-around">
          {data.initData &&
            data.map((item: GalleryItem) => {
              return (
                <div key={item.id} className="p-4">
                  <div className="w-full md:w-[300px] 2xl:w-[400px] h-[300px] bg-slate-50 rounded-md p-4 flex flex-col justify-between">
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
      </DataContextProvider>
    </>
  );
};

export default DataGalleryContainer;
