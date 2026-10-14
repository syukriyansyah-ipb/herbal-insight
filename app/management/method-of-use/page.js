import { RiHandCoinFill } from "react-icons/ri";
import { getMethodOfUse } from "@/api/method-of-use";
import MethodManagement from "./MethodManagement";

export default async function MethodOfUse() {
  const methodOfUse = await getMethodOfUse();

  return (
    <div>
      <div className="flex items-center text-2xl md:text-3xl font-bold py-5 text-gray-900">
        <RiHandCoinFill className="mr-2" />
        <h1 className="h1">Manage Method of Use</h1>
      </div>
      <MethodManagement methodOfUse={methodOfUse}/>
    </div>
  );
}
