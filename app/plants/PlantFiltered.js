"use client";
import Image from "next/image";
import Searchbar from "./Searchbar";
import { searchPlants } from "@/api/plants";
import { getScientific, getCommon, getLocal } from "@/api/reasonings";
import { useState, useEffect } from "react";
import NotFound from "@/public/assets/images/404.svg";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardSkeleton, CustomButton } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { fetchScientificNames } from "@/store/actions/scientificNames";
import { fetchCommonNames } from "@/store/actions/commonNames";
import { fetchLocalNames } from "@/store/actions/localNames";
import PlantList from "./PlantList";
import { searchPhotos } from "@/api/photos";

const CardWithImage = ({ title, description, button, onClick }) => {
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    searchPhotos({ query: title }).then((res) => {
      try {
        setImg(res?.results[0]?.urls?.small);
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

export default function PlantFiltered() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const queryFilter = searchParams.get("code") || searchParams.get("ethnic");
  const query =
    searchParams.get("scientific-name") ||
    searchParams.get("local-name") ||
    searchParams.get("common-name");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [plantList, setPlantList] = useState([]);
  const isLocal = searchParams.get("local-name");
  const isCommon = searchParams.get("common-name");
  const isScientific = searchParams.get("scientific-name");

  useEffect(() => {
    setIsLoading(true);
    if (isLocal !== null) {
      getLocal(query, queryFilter)
        .then((res) => {
          dispatch(fetchLocalNames(res));
          setPlantList(res?.data?.local_names);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query, queryFilter, dispatch]);

  useEffect(() => {
    setIsLoading(true);
    if (isCommon !== null) {
      getCommon(query, queryFilter)
        .then((res) => {
          dispatch(fetchCommonNames(res));
          setPlantList(res?.data?.common_names);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query, queryFilter, dispatch]);

  useEffect(() => {
    setIsLoading(true);
    if (isScientific !== null) {
      getScientific(query)
        .then((res) => {
          dispatch(fetchScientificNames(res));
          setPlantList(res?.data?.scientific_names);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [query, dispatch]);

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
              {isCommon && (
                <span>
                  with{" "}
                  <span className="font-semibold text-green-700">
                    “{queryFilter}”{" "}
                  </span>{" "}
                  language code
                </span>
              )}
              {isLocal && (
                <span>
                  with{" "}
                  <span className="font-semibold text-green-700">
                    “{queryFilter}”{" "}
                  </span>{" "}
                  ethnic
                </span>
              )}{" "}
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
              <span className="font-semibold text-green-700">“{query}” </span>
              in {isScientific ? "scientific name" : "local name"}{" "}
              {isCommon && (
                <span>
                  with{" "}
                  <span className="font-semibold text-green-700">
                    “{queryFilter}”{" "}
                  </span>{" "}
                  language code
                </span>
              )}
              {isLocal && (
                <span>
                  with{" "}
                  <span className="font-semibold text-green-700">
                    “{queryFilter}”{" "}
                  </span>{" "}
                  ethnic
                </span>
              )}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              {isLoading === true ? (
                <CardSkeleton />
              ) : (
                plantList.length > 0 && (
                  <div className="w-full">
                    <CardWithImage
                      button="Explore More"
                      title={plantList[0]?.Plant?.properties?.label}
                      description={query}
                      onClick={() =>
                        router.push(
                          `/plants/${plantList[0]?.Plant?.properties?.label}`
                        )
                      }
                    />
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    )
  );
}
