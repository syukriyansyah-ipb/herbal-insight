import { IoBody } from "react-icons/io5";
import { CustomButton } from "@/components";
import PhenotypeInput from "./PhenotypeInput";
import PhenotypeTable from "./PhenotypeTable";

export default function Symptom() {
  return (
    <div>
      <div className="flex items-center text-2xl md:text-3xl font-bold py-5 text-gray-900">
        <IoBody  className="mr-2" />
        <h1 className="h1">Manage Phenotype</h1>
      </div>
      {/* <div className="flex justify-end pb-5">
        <CustomButton text="+ Add" />
      </div> */}
      <div className="bg-white rounded-2xl py-3 md:py-5 px-2 md:px-8">
        <PhenotypeInput />
        <PhenotypeTable />
      </div>
    </div>
  );
}
