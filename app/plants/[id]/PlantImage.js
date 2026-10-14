"use client";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";
import NoImage from "@/public/assets/images/error-plant.webp";
import { useState } from "react";
import ViewImage from "./ViewImage";

function PlantImage({ cover, references }) {
  const [showImage, setShowImage] = useState(false);
  function handleShowImage() {
    if (cover !== undefined) setShowImage(!showImage);
  }

  return (
    <>
      <div className="h-64 bg-gray-200 md:h-96 w-full relative rounded-xl shadow-md cursor-pointer mb-3 md:mb-6">
        <div className="absolute h-full w-full rounded-xl justify-center flex items-center">
          <AiOutlineLoading className="text-4xl text-green-700 animate-spin" />
        </div>
        <Image
          src={cover !== undefined ? cover : NoImage}
          onError={NoImage}
          fill
          alt="medicinal plant"
          priority
          className="object-cover rounded-xl"
          onClick={handleShowImage}
        />
        {cover !== undefined && (
          <Link href={references} target="__blank" rel="noopener noreferrer">
            <div className="absolute bottom-0 right-0 bg-gray-900 hover:bg-opacity-80 rounded-br-xl bg-opacity-60 text-gray-200 text-[6px] md:text-[8px] px-1 md:px-3">
              {references}
            </div>
          </Link>
        )}
      </div>
      {cover !== undefined && (
        <ViewImage
          showModal={showImage}
          cover={cover}
          closeModal={() => setShowImage(!showImage)}
        />
      )}
    </>
  );
}

export default PlantImage;
