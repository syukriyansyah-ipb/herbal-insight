import Image from "next/image";
import { getPlantNames, getScientific } from "@/api/reasonings";
import { CardSkeleton } from "@/components";
import Empty from "@/public/assets/images/empty.svg";
import RenderNameCard from "@/components/plants/RenderNameCard";
import ExportPlantNames from "@/components/plants/ExportPlantNames";
import { Suspense } from "react";
import GraphNames from "@/components/plants/GraphNames";

async function PlantNames({ data }) {
  const name =
    data === "Amaranthus hybridus" ? "Amaranthus hybridus Vell." : null;
  const scientific = await getScientific(name);

  return (
    <>
      {name === null ? (
        <div className="flex flex-col justify-center items-center py-3">
          <Image src={Empty} height={200} width={200} alt="Not found"/>
          <p className="text-sm md:text-base">Plant names not available</p>
        </div>
      ) : (
        <Suspense fallback={<CardSkeleton />}>
          <div>
            <RenderNameCard data={scientific} />
          </div>
          <div>
            <ExportPlantNames data={data} scientific={scientific} />
          </div>
          {/* <div>
            <GraphNames data={scientific}/>
          </div> */}
        </Suspense>
      )}
    </>
  );
}

export default PlantNames;
