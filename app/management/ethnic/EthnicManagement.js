"use client";
import { useState } from "react";
import { CustomButton } from "@/components";
import EthnicInput from "./EthnicInput";
import EthnicTable from "./EthnicTable";

export default function EthnicManagement({ ethnics }) {
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
        <EthnicInput
          query={query}
          handleQuery={(e) => handleQuery(e.target.value)}
          nodeId={nodeId}
          handleNodeId={(e) => handleNodeId(e.target.value)}
          handleSearchId={(e) => handleSearchId(e.target.value)}
        />
        <EthnicTable ethnics={ethnics} query={query} nodeId={nodeId}/>
      </div>
    </div>
  );
}
