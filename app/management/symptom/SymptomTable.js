"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getSymptoms } from "@/api/symptom";
import Empty from "@/public/assets/images/empty.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchSymptoms } from "@/store/actions/symptoms";
import { TableSkeleton, CustomTable } from "@/components";

export default function SymptomTable() {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const SYMPTOMS = useSelector((state) => state.symptoms);

  // useEffect(() => {
  //   setIsLoading(true);
  //   getSymptoms()
  //     .then((res) => {
  //       dispatch(fetchSymptoms(res));
  //       if (res?.node === null) setIsError(true);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //     });
  // }, [dispatch]);

  // const data = SYMPTOMS?.data?.nodes?.map((item) => {
  //   const { id, label, synonyms, refs, xrefs } = item.properties;
  //   return {
  //     id: id,
  //     label: label,
  //     synonyms: synonyms,
  //     refs: refs,
  //     xrefs: xrefs,
  //     action: true,
  //   };
  // });

  const attribute = [
    { label: "Symptom Id", type: "list" },
    { label: "Label", type: "list" },
    { label: "Label ID", type: "list"},
    { label: "Synonyms", type: "list" },
    { label: "Refs", type: "list" },
    { label: "Xefs", type: "list" },
    { label: "Action", type: "action" },
  ];

  const data = [
    {
      id: "SYMP_0000566",
      label: "sleep disturbance",
      labelId: "Not available",
      synonyms: "Not available",
      refs: "Symptom Ontology (SYMP)",
      xrefs: "ICD9CM_2005:780.5 | UMLS_ICD9CM_2005_AUI:A0246756 | UMLS_CUI:C0037317",
      action: true,
    },
    {
      id: "SYMP_0000492",
      label: "urinary incontinence",
      labelId: "Not available",
      synonyms: "incontinence",
      refs: "Symptom Ontology (SYMP)",
      xrefs: "ICD9CM_2005:788.3 | ICD9CM_2005:788.30 | UMLS_ICD9CM_2005_AUI:A6994675 | UMLS_ICD9CM_2005_AUI:A0814766 | UMLS_CUI:C0042024",
      action: true,
    },
    {
      id: "SYMP_0000523",
      label: "anorexia",
      labelId: "Not available",
      synonyms: "Not available",
      refs: "Symptom Ontology (SYMP)",
      xrefs: "UMLS_CUI:C0003123 | ICD9CM_2005:783.0 | UMLS_ICD9CM_2005_AUI:A0024378",
      action: true,
    },
    {
      id: "SYMP_0000504",
      label: "headache",
      labelId: "Not available",
      synonyms: "cephalalgia",
      refs: "Symptom Ontology (SYMP)",
      xrefs: "UMLS_CUI:C0018681 | ICD9CM_2005:784.0 | UMLS_ICD9CM_2005_AUI:A0065994",
      action: true,
    },
    {
      id: "SYMP_0000566",
      label: "sleep disturbance",
      labelId: "Not available",
      synonyms: "Not available",
      refs: "Symptom Ontology (SYMP)",
      xrefs: "ICD9CM_2005:780.5 | UMLS_ICD9CM_2005_AUI:A0246756 | UMLS_CUI:C0037317",
      action: true,
    },
    {
      id: "SYMP_0000570",
      label: "diarrhea",
      labelId: "Not available",
      synonyms: "loose bowels | loose bowel | bacterial gastroenteritis | the runs | fecal incontinence | diarrhoea | incontinence of feces",
      refs: "Symptom Ontology (SYMP)",
      xrefs: "UMLS_ICD9CM_2005_AUI:A0048148 | UMLS_CUI:C0011991 | ICD9CM_2005:787.91",
      action: true,
    },
  ]

  return (
    <div className="pt-5">
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <div className="flex flex-col justify-center items-center py-3 md:py-8">
          <Image src={Empty} alt="not available" height={200} width={200} />
          <p className="text-sm md:text-base">Symptoms not available</p>
        </div>
      ) : (
        <CustomTable attribute={attribute} data={data} />
      )}
    </div>
  );
}
