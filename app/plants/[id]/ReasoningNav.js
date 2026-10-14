import clsx from "clsx";
import Link from "next/link";
import { Suspense } from "react";
import Taxonomy from "./Taxonomy";
import PlantNames from "./PlantNames";
import Pharmacology from "./Pharmacology";
import TraditionalUse from "./TraditionalUse";
import { reasoningNav } from "@/constans";
import { CardSkeleton } from "@/components";

export default function ReasoningNav({ plantName, reasoningState }) {
  return (
    <div className="space-y-3 md:space-y-6">
      <ul className="flex justify-start md:justify-between pt-3 md:pt-6 overflow-x-auto space-x-10 no-scrollbar">
        {reasoningNav.map((item, index) => (
          <Link href={`/plants/${plantName}?reasoning=${item.url}`} key={index}>
            <h3
              className={clsx(
                "text-base md:text-lg font-semibold hover:text-green-900 transition-colors duration-300 whitespace-nowrap",
                {
                  "text-gray-800": reasoningState === item.url,
                  "text-gray-400": reasoningState !== item.url,
                }
              )}
            >
              {item.label}
            </h3>
            <div
              className={clsx("border-t-4 w-6 mx-auto", {
                "border-black": reasoningState === item.url,
                "border-gray-400": reasoningState !== item.url,
              })}
            ></div>
          </Link>
        ))}
      </ul>
      <div className="pt-3">
        <Suspense fallback={<CardSkeleton />}>
          {reasoningState === "taxonomy" ? ( <Taxonomy plantName={plantName} />
          ) : reasoningState === "traditional-use" ? ( <TraditionalUse plantName={plantName} />
          ) : reasoningState === "pharmacology" ? (<Pharmacology data={plantName} />
          ) : (<PlantNames data={plantName} />
          )}
        </Suspense>
      </div>
    </div>
  );
}
