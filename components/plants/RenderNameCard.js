import LocalCard from "./LocalCard";
import CommonCard from "./CommonCard";
import ScientificCard from "./ScientificCard";

export default function RenderNameCard({ data }) {
  return (
    <>
      <div className="space-y-2">
        <ScientificCard data={data?.data?.scientific_names} />
        <LocalCard data={data?.data?.local_names} />
        <CommonCard data={data?.data?.common_names} />
      </div>
    </>
  );
}
