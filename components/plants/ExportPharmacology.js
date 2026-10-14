import { IoMdDownload } from "react-icons/io";
import { CSVLink } from "react-csv";
import { useSelector } from "react-redux";

export default function ExportPharmacology({ data }) {
  const PHARMACOLOGY = useSelector((state) => state.pharmacology);
  const csvData = PHARMACOLOGY?.data?.plant_compounds?.map((item) => {
    const sideEffects = PHARMACOLOGY?.data?.side_effects?.filter(
      (se) => se?.has_side_effect?.source === item?.compound?.id
    );
    return {
      plant: data,
      hasPlantPart: item?.plant_part?.properties?.label,
      hasCompound: item?.compound?.properties?.label,
      compoundFormula: item?.compound?.properties?.molecular_formula,
      sideEffects:
        sideEffects
          ?.map((se) => se?.side_effect?.properties?.label)
          .join(", ") || "None",
    };
  });

  return (
    <div className="pt-8 md:pt-10">
      <h3 className="font-semibold text-base md:text-lg pb-1">Export Data</h3>
      <p className="text-sm md:text-base text-gray-900 pb-5">
        Export medicinal plant pharmacology data by
        click button below
      </p>
      <div className="flex">
        {csvData !== undefined && (
          <CSVLink data={csvData} filename={`${data} Pharmacology.csv`}>
            <button
              id="exportCsv"
              className="flex items-center border-green-600 bg-white text-gray-900 hover:bg-green-600 hover:text-white focus:bg-green-700 focus:text-white transition-colors border py-2 px-5 md:px-10 text-sm md:text-base rounded-md"
            >
              <IoMdDownload className="text-lg mr-2" />
              Export as CSV
            </button>
          </CSVLink>
        )}
      </div>
    </div>
  );
}
