"use client";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import Empty from "@/public/assets/images/empty.svg";
import { TableSkeleton, CustomTable } from "@/components";
import { searchEthnic, searchEthnicId } from "@/api/ethnic";

export default function EthnicTable({ ethnics, query, nodeId }) {
  const [ethnicsList, setEthnicsList] = useState(ethnics);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (query?.length > 0) {
      searchEthnic(query)
        .then((res) => {
          setEthnicsList(res);
          if (res?.node === null) setIsError(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (nodeId?.length > 0) {
      searchEthnicId(nodeId).then((res) => {
        const resObject = {
          detail: res.detail,
          nodes: res.node ? [res.node] : [],
        };
        setEthnicsList(resObject);
        if (resObject?.nodes === null) setIsError(true);
      });
    } else {
      setEthnicsList(ethnics);
    }
  }, [query, nodeId]);

  const attribute = [
    { label: "Node Id", type: "list" },
    { label: "Ethnic Id", type: "list" },
    { label: "Label", type: "list" },
    { label: "Province", type: "list" },
    { label: "Action", type: "action" },
  ];

  const data = ethnicsList?.nodes?.map((item) => {
    const { id, label, province } = item.properties;
    return {
      nodeId: item?.id || "Not available",
      id: id || "Not available",
      label: label || "Not available",
      province: province || "Not available",
      action: true || "Not available",
    };
  });

  return (
    <div className="pt-5">
      <Suspense fallback={<TableSkeleton />}>
        {!ethnics ? (
          <div className="flex flex-col justify-center items-center py-3 md:py-8">
            <Image src={Empty} alt="not available" height={200} width={200} />
            <p className="text-sm md:text-base">Ethnics not available</p>
          </div>
        ) : (
          <CustomTable attribute={attribute} data={data} />
        )}
      </Suspense>
    </div>
  );
}
