"use client";
import { useState } from "react";
import MethodTable from "./MethodTable";
import MethodInput from "./MethodInput";
import { CustomButton } from "@/components";

export default function MethodManagement({ methodOfUse }) {
  const [query, setQuery] = useState("");
  const [nodeId, setNodeId] = useState("");

  function handleQuery(e) {
    setNodeId("");
    setQuery(e);
  }
  function handleNodeId(e) {
    if (e.match("^[0-9]*$")) {
      setQuery("");
      setNodeId(e);
    }
  }
  function handleSearchId(e) {
    setNodeId(e);
  }

  return (
    <div>
      <div className="flex justify-end pb-5">
        <CustomButton text="+ Add" />
      </div>
      <div className="bg-white rounded-2xl py-3 md:py-5 px-2 md:px-8">
        <MethodInput
          query={query}
          handleQuery={(e) => handleQuery(e.target.value)}
          nodeId={nodeId}
          handleNodeId={(e) => handleNodeId(e.target.value)}
          handleSearchId={(e) => handleSearchId(e.target.value)}
        />
        <MethodTable methodOfUse={methodOfUse} query={query} nodeId={nodeId} />
      </div>
    </div>
  );
}
