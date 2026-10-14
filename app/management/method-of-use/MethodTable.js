"use client";
import Image from "next/image";
import { Suspense, useState, useEffect } from "react";
import { TableSkeleton, CustomTable } from "@/components";
import Empty from "@/public/assets/images/empty.svg";
import { searchMethodOfUse, searchMethodOfUseId } from "@/api/method-of-use";

export default function MethodTable({ methodOfUse, query, nodeId }) {
  const [methodList, setMethodList] = useState(methodOfUse);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (query?.length > 0) {
      searchMethodOfUse(query)
        .then((res) => {
          setMethodList(res);
          if (res?.node === null) setIsError(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (nodeId?.length > 0) {
      searchMethodOfUseId(nodeId).then((res) => {
        const resObject = {
          detail: res.detail,
          nodes: res.node ? [res.node] : [],
        };
        setMethodList(resObject);
        if (resObject?.nodes === null) setIsError(true);
      });
    } else {
      setMethodList(methodOfUse);
    }
  }, [query, nodeId]);

  const attribute = [
    { label: "Node Id", type: "list" },
    { label: "Method of Use Id", type: "list" },
    { label: "Label", type: "list" },
    { label: "Action", type: "action" },
  ];

  const data = methodList?.nodes?.map((item) => {
    const { id, label } = item.properties;
    return {
      nodeId: item?.id || "Not available",
      id: id || "Not available",
      label: label || "Not available",
      action: true || "Not available",
    };
  });

  return (
    <div className="pt-5">
      <Suspense fallback={<TableSkeleton />}>
        {methodOfUse?.detail !== "DATA_FOUND" ? (
          <div className="flex flex-col justify-center items-center py-3 md:py-8">
            <Image src={Empty} alt="not available" height={200} width={200} />
            <p className="text-sm md:text-base">Plants not available</p>
          </div>
        ) : (
          <CustomTable attribute={attribute} data={data} />
        )}
      </Suspense>
    </div>
  );
}
