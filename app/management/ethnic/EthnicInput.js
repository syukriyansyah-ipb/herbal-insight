import { CiSearch } from "react-icons/ci";
import { Input } from "@/components";

export default function EthnicInput({ query, handleQuery, nodeId, handleNodeId }) {
  return (
    <div className="flex flex-col md:flex-row space-x-0 md:space-x-5 space-y-3 md:space-y-0">
      <div className="w-full md:w-2/3">
        <Input
          placeholder="Search ethnic by name..."
          value={query}
          onChange={handleQuery}
          Icon={CiSearch}
          style="bg-gray-200 bg-opacity-50"
        />
      </div>
      <div className="w-full md:w-1/3">
        <Input
          placeholder="Search ethnic by id..."
          value={nodeId}
          onChange={handleNodeId}
          Icon={CiSearch}
          style="bg-gray-200 bg-opacity-50"
        />
      </div>
    </div>
  );
}
