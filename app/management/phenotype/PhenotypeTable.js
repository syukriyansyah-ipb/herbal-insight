"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPhenotype } from "@/api/phenotype";
import Empty from "@/public/assets/images/empty.svg";
import { useDispatch, useSelector } from "react-redux";
import { TableSkeleton, CustomTable } from "@/components";
import { fetchPhenotypes } from "@/store/actions/phenotypes";

export default function PhenotypeTable() {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const PHENOTYPES = useSelector((state) => state.phenotypes);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getPhenotype()
  //     .then((res) => {
  //       dispatch(fetchPhenotypes(res));
  //       if (res?.node === null) setIsError(true);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // }, [dispatch]);

  // const data = PHENOTYPES?.data?.nodes?.map((item) => {
  //   const { id, label, refs } = item.properties;
  //   return {
  //     id: id,
  //     label: label,
  //     refs: refs,
  //     action: true,
  //   };
  // });

  const attribute = [
    { label: "Phenotype Id", type: "list" },
    { label: "Label", type: "list" },
    { label: "Refs", type: "list" },
  ];

  const data = [
    {
      id: "HP_0000951",
      label: "Abnormality of the skin",
      refs: "Human Phenotype Ontology (HPO)",
    },
    {
      id: "HP_0011024",
      label: "Abnormality of the gastrointestinal tract",
      refs: "Human Phenotype Ontology (HPO)",
    },
  ];

  return (
    <div className="pt-5">
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <div className="flex flex-col justify-center items-center py-3 md:py-8">
          <Image src={Empty} alt="not available" height={200} width={200} />
          <p className="text-sm md:text-base">Phenotypes not available</p>
        </div>
      ) : (
        <CustomTable attribute={attribute} data={data} />
      )}
    </div>
  );
}
