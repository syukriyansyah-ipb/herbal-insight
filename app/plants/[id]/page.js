import Link from "next/link";
import Image from "next/image";
import { searchPlants } from "@/api/plants";
import { searchPhotos } from "@/api/photos";
import NotFound from "@/public/assets/images/404.svg";
import dynamic from "next/dynamic";
import SaveHistory from "@/app/history/history";
const PlantImage = dynamic(() => import("./PlantImage"))
const ReasoningNav = dynamic(() => import('./ReasoningNav'), { loading: () => <p className="pt-5">Loading get medicinal plant data...</p> })

async function Plant({ params, searchParams }) {
  const { id } = params
  const { reasoning } = searchParams
  const plantCheck = await searchPlants(id)
  const plantName = id.replace(/%20/g, " ");
  const photo = await searchPhotos({ query: plantName })
  const cover = photo?.results[0]?.media[0]?.identifier
  const references = photo?.results[0]?.media[0]?.references

  return (
    <div className="flex justify-center py-5 md:py-10 px-2 md:px-0 md:pt-12 pt-20">
      <div className="lg:w-1/2 md:w-2/3 w-full bg-white rounded-xl">
        <div className="px-2 md:px-4 py-3 md:py-6 space-y-3 md:space-y-6">
          {plantCheck?.detail !== "SUCCESS" ? (
            <div className="h-screen flex flex-col justify-center items-center py-3">
              <Image src={NotFound} height={200} width={200} alt="Image not found" priority/>
              <p className="text-sm md:text-base pb-3">
                Medicinal Plant not Available
              </p>
              <Link href="/">
              <button className="bg-yellow-400 py-2 px-8 rounded-full text-sm md:text-base font-medium hover:bg-orange-400 transition-colors duration-300 shadow-md">
                Back to home
              </button>
              </Link>
            </div>
          ) : (
            <>
              <h2 className="font-bold text-xl md:text-2xl text-gray-800">
                {plantName}
              </h2>
              <div className="divide-y">
                <SaveHistory plantName={plantName} img={cover} />
                <PlantImage cover={cover} references={references} />
                <ReasoningNav plantName={plantName} reasoningState={reasoning} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Plant;
