"use client";
import Image from "next/image";
import { Suspense } from "react";
import Searchbar from "./Searchbar";
import PlantList from "./PlantList";
import { LoadingPage } from "@/components";
import PlantFiltered from "./PlantFiltered";
import { useSearchParams } from "next/navigation";
import Find from "@/public/assets/images/search.svg";

export default function Search() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const queryFilter =
    searchParams.get("scientific-name") ||
    searchParams.get("common-name") ||
    searchParams.get("local-name");

  return (
    <div className="min-h-screen flex justify-center md:pt-18 pt-20">
      {!query && !queryFilter && (
        <div className="sm:w-1/2 w-full flex flex-col justify-center items-center px-3">
          {/* <Searchbar />
          <div className="w-full flex flex-col justify-center">
            <p className="text-base md:text-lg font-medium text-gray-900 text-left pb-4 md:pb-6">
              Type medical plant keyword on searchbar...
            </p>
          </div> */}
          <Image
            src={Find}
            alt="Search medicinal plant"
            priority={false}
            className="h-80 w-80 md:h-96 md:w-96 object-cover"
          ></Image>
          <h2 className="text-base md:text-lg font-medium text-gray-900 pb-4">
            Explore medicinal plant
          </h2>
          <Searchbar />
        </div>
      )}
      {query && <PlantList />}
      {queryFilter && <PlantFiltered />}
    </div>
  );
}
