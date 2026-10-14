import { PiPlant } from "react-icons/pi";
import { getPlants } from "@/api/plants";
import PlantManagement from "./PlantManagement";

export default async function Plant() {
  const plants = await getPlants()

  return (
    <div>
      <div className="flex items-center text-2xl md:text-3xl font-bold py-5 text-gray-900">
        <PiPlant className="mr-2" />
        <h1 className="h1">Manage Plant</h1>
      </div>
      <PlantManagement plants={plants}/>
    </div>
  );
}
