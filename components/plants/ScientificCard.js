import NameCard from "./NameCard";
import IcScientific from "@/public/assets/icons/scientific.svg";

export default function ScientificCard({ data }) {
  return (
    <NameCard
      title="Scientific Names"
      id="scientific-names"
      data={data}
      tooltip="naming plants based on their scientific names"
      img={IcScientific}
    >
      {data?.map((item, index) => (
        <div key={index}>{item?.ScientificName?.properties?.label}</div>
      ))}
    </NameCard>
  );
}
