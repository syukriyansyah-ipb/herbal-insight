import { TfiShield } from "react-icons/tfi";
import EthnicManagement from "./EthnicManagement";
import { getEthnics } from "@/api/ethnic";

export default async function Ethnic() {
  const ethnics = await getEthnics();

  return (
    <div>
      <div className="flex items-center text-2xl md:text-3xl font-bold py-5 text-gray-900">
        <TfiShield className="mr-2" />
        <h1 className="h1">Manage Ethnic</h1>
      </div>
      <EthnicManagement ethnics={ethnics}/>
    </div>
  );
}
