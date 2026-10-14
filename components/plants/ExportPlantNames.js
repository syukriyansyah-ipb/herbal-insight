"use client"
import { IoMdDownload } from "react-icons/io";
import { CSVLink } from "react-csv";

export default function ExportPlantNames({ data, scientific }) {
  const scientificNames = scientific?.data?.scientific_names || [];
  const commonNames = scientific?.data?.common_names || [];
  const localNames = scientific?.data?.local_names || [];

  const csvData = [
    ...scientificNames.map((sc) => ({
      plant: data,
      nameType: "ScientificName",
      name: sc?.ScientificName?.properties?.label,
      authorship: sc?.ScientificName?.properties?.authorship || null,
      country: null,
      language: null,
      ethnic: null,
      province: null,
    })),
    ...commonNames.map((co) => ({
      plant: data,
      nameType: "CommonName",
      name: co?.CommonName?.properties?.label,
      authorship: null,
      country: co?.CommonName?.properties?.country || null,
      language: co?.CommonName?.properties?.language || null,
      ethnic: null,
      province: null,
    })),
    ...localNames.map((lo) => ({
      plant: data,
      nameType: "LocalName",
      name: lo?.LocalName?.properties?.label,
      authorship: null,
      country: null,
      language: null,
      ethnic: lo?.Ethnic?.properties?.label || null,
      province: lo?.Ethnic?.properties?.province || null,
    })),
  ];

  return (
    <div className="pt-8 md:pt-10">
      <h3 className="font-semibold text-base md:text-lg pb-1">Export Data</h3>
      <p className="text-sm md:text-base text-gray-900 pb-5">
        Export medicinal plant names data by click button below
      </p>
      <div className="flex">
        {csvData.length !== 0 && (
          <CSVLink data={csvData} filename={`${data} Plant Names.csv`}>
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
