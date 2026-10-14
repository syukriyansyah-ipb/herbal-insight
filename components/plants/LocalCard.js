import NameCard from "./NameCard";
import IcLocal from "@/public/assets/icons/local.svg";

export default function LocalCard({ data }) {
  return (
    <NameCard
      title="Local Names"
      id="local-names"
      data={data}
      tooltip="naming plants used by certain tribes in certain areas in Indonesia (usually strongly influenced by the tribe's regional language)"
      img={IcLocal}
      styles="bg-opacity-80"
    >
      {data?.map((item, index) => (
        <div key={index}>
          {item?.LocalName?.properties?.label}
          <span className="ml-2">({item?.Ethnic?.properties?.label} Ethnic | {item?.Ethnic?.properties?.province})</span>
        </div>
      ))}
    </NameCard>
  );
}
