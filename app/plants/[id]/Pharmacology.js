"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getPharmacology } from "@/api/reasonings";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPharmacology,
  messagePharmacology,
} from "@/store/actions/pharmacology";
import empty from "@/public/assets/images/empty.svg";
import {
  GraphPharmacology,
  RelationshipGraph,
  ExportPharmacology,
} from "@/components/plants";

function Pharmacology({ data }) {
  const PHARMACOLOGY = useSelector((state) => state.pharmacology);
  const [isLoading, setIsLoading] = useState();
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setIsLoading(true);
    getPharmacology(data)
      .then((res) => {
        dispatch(fetchPharmacology(res));
      })
      .catch((err) => {
        dispatch(messagePharmacology(err));
        setIsError(true);
      });
    setIsLoading(false);
  }, [data, dispatch]);

  useEffect(() => {
    if (PHARMACOLOGY?.data === undefined) {
      setIsError(true);
    }
  }, [PHARMACOLOGY]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div className="flex flex-col justify-center items-center py-3">
          <Image src={empty} height={200} width={200} alt="Not found"/>
          <p className="text-sm md:text-base">Pharmacology not available</p>
        </div>
      ) : (
        <>
          <div className="h-[700px]">
            <GraphPharmacology data={data} className="h-[full]" />
          </div>
          <div>
            <RelationshipGraph />
          </div>
          <div>
            <ExportPharmacology data={data}/>
          </div>
        </>
      )}
    </div>
  );
}

export default Pharmacology;
