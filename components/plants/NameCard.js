"use client"
import Image from "next/image";
import { useState } from "react";
import { Information } from "@/components";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";
import clsx from "clsx";

export default function NameCard({
  title,
  data,
  id,
  tooltip,
  img,
  styles,
  children,
}) {
  const [showList, setShowList] = useState(false);
  return (
    <div className="h-min bg-white border rounded-md shadow-md p-4">
      <div
        className={clsx(
          "max-h-48 flex flex-col items-center space-y-3 overflow-y-hidden",
          { "max-h-full": showList }
        )}
      >
        <div className={`bg-green-700 ${styles} p-1 rounded-full`}>
          <Image
            src={img}
            alt={title ? title : "Plant Names"}
            height={50}
            width={50}
            className="bg-white rounded-full p-2 shadow-xl"
          />
        </div>
        <div className="flex">
          <h4 className="font-medium text-base md:text-lg text-gray-700">
            {title ? title : "Plant Names"}
          </h4>
          <Information id={id} text={tooltip} />
        </div>
        <ul>
          {data?.length > 0 ? (
            <li>
              <div className="text-sm md:text-base text-gray-600">
                {children}
              </div>
            </li>
          ) : (
            <li>
              <div className="text-sm md:text-base text-gray-600">
                names not available
              </div>
            </li>
          )}
        </ul>
      </div>
      <div className="flex justify-center">
        {data?.length > 3 &&
          (!showList ? (
            <IoIosArrowDropdownCircle
              onClick={() => setShowList(!showList)}
              className="text-xl my-auto text-green-900 cursor-pointer"
            />
          ) : (
            <IoIosArrowDropupCircle
              onClick={() => setShowList(!showList)}
              className="text-xl my-auto text-green-900 cursor-pointer"
            />
          ))}
      </div>
    </div>
  );
}
