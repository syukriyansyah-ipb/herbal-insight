import { FaHeadSideCough } from "react-icons/fa";
import SymptomInput from "./SymptomInput";
import SymptomTable from "./SymptomTable";
import { CustomButton } from "@/components";

export default function Symptom() {
  return (
    <div>
      <div className="flex items-center text-2xl md:text-3xl font-bold py-5 text-gray-900">
        <FaHeadSideCough className="mr-2" />
        <h1 className="h1">Manage Symptom</h1>
      </div>
      {/* <div className="flex justify-end pb-5">
        <CustomButton text="+ Add" />
      </div> */}
      <div className="bg-white rounded-2xl py-3 md:py-5 px-2 md:px-8">
        <SymptomInput />
        <SymptomTable />
      </div>
    </div>
  );
}
