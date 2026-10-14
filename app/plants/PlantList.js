"use client";
import Image from "next/image";
import Searchbar from "./Searchbar";
import { searchPlants } from "@/api/plants";
import { useState, useEffect } from "react";
import NotFound from "@/public/assets/images/404.svg";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardSkeleton, CustomButton } from "@/components";
import { searchPhotos } from "@/api/photos";

const CardWithImage = ({ title, description, button, onClick }) => {
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    searchPhotos({ query: title }).then((res) => {
      try {
        setImg(res?.results[0]?.media[0]?.identifier);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching image:", error);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <Card
      img={img}
      title={title}
      description={description}
      button={button}
      isLoading={isLoading}
      onClick={onClick}
    />
  );
};

export default function PlantList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [plantList, setPlantList] = useState([]);

  useEffect(() => {
    const getPlants = async () => {
      setIsLoading(true);
      try {
        const plants = await searchPlants(query);
        setPlantList(plants?.nodes);
        setIsLoading(false);
        setIsError(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
      }
    };
    if (query) {
      getPlants();
    }
  }, [query]);

  return (
    query && (
      <div className="md:w-1/2 w-full flex flex-col py-3 md:py-5 space-y-3 md:space-y-5 px-3 md:px-0">
        <Searchbar />
        {!plantList ? (
          <div className="w-full flex flex-col justify-center items-center">
            <Image
              src={NotFound}
              alt="Not Found"
              priority={false}
              className="h-full w-96 object-cover pt-4"
            />
            <h2 className="text-base md:text-lg font-medium text-gray-900 text-left pb-4 md:pb-6">
              Sorry{" "}
              <span className="font-semibold text-green-700">“{query}”</span>{" "}
              not found
            </h2>
            <CustomButton
              text="Back to search"
              onClick={() => router.push("/plants")}
            />
          </div>
        ) : (
          <>
            <h2 className="text-base md:text-lg font-medium text-gray-900 text-left">
              Search results for{" "}
              <span className="font-semibold text-green-700">“{query}”</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              {isLoading === true ? (
                <CardSkeleton />
              ) : (
                plantList?.map((item) => (
                  <div key={item?.id} className="w-full">
                    <CardWithImage
                      button="Explore More"
                      title={item?.properties?.label}
                      description={item?.properties?.rank}
                      onClick={() =>
                        router.push(`/plants/${item?.properties?.label}`)
                      }
                    />
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    )
  );
}
