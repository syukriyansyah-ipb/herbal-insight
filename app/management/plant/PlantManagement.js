"use client";
import PlantInput from "./PlantInput";
import PlantTable from "./PlantTable";
import FormPlant from "./FormPlant";
import { CustomButton, Modal } from "@/components";
import { useState } from "react";

export default function PlantManagement({ plants }) {
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [nodeId, setNodeId] = useState("");
  function handleQuery(e) {
    setNodeId("")
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

  const attribute = [
    { label: "Node Id", type: "list"},
    { label: "Plant Id", type: "list" },
    { label: "Label", type: "list" },
    { label: "Rank", type: "list" },
    { label: "Taxonomic Status", type: "list" },
    { label: "Refs", type: "list" },
    { label: "Xrefs", type: "list" },
    { label: "Action", type: "action" },
  ];

  return (
    <div>
      <div className="flex justify-end pb-5">
        <CustomButton text="+ Add" onClick={() => setShowModal(!showModal)} />
      </div>
      <div className="bg-white rounded-2xl py-3 md:py-5 px-2 md:px-8">
        <PlantInput
          query={query}
          handleQuery={(e) => handleQuery(e.target.value)}
          nodeId={nodeId}
          handleNodeId={(e) => handleNodeId(e.target.value)}
          handleSearchId={(e) => handleSearchId(e.target.value)}
        />
        <PlantTable query={query} plants={plants} attribute={attribute} nodeId={nodeId} />
      </div>
      <Modal closeModal={() => setShowModal(!showModal)} showModal={showModal}>
        <FormPlant title="Add new plant" closeForm={() => setShowModal(!showModal)}/>
      </Modal>
    </div>
  );
}
