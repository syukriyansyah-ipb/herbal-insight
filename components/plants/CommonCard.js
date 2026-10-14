import NameCard from "./NameCard";
import ReactCountryFlag from "react-country-flag";
import IcCommon from "@/public/assets/icons/common.svg";

export default function CommonCard({ data }) {
  return (
    <NameCard
      title="Common Names"
      id="common-names"
      data={data}
      tooltip="naming plants used by a country based on that country's national language"
      img={IcCommon}
      styles="bg-opacity-60"
    >
      {data?.map((item, index) => (
        <div key={index}>
          {item?.CommonName?.properties?.label}{" "}
          <span className="ml-2">
            ({item?.CommonName?.properties?.language})
            <ReactCountryFlag
              countryCode={item?.CommonName?.properties?.country}
              svg
              className="ml-2"
              alt={item?.CommonName?.properties?.country}
            />
          </span>
        </div>
      ))}
    </NameCard>
  );
}
