"use client";
import Image from "next/image";
import { searchPlants, deletePlant, searchPlantsId } from "@/api/plants";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLimitPlants } from "@/store/actions/plants";
import { CustomTable, TableSkeleton } from "@/components";
import Empty from "@/public/assets/images/empty.svg";
import { useRouter } from 'next/navigation';

export default function PlantTable({ query, plants, attribute, nodeId }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [plantList, setPlantList] = useState(plants);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteValue, setDeleteValue] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("")

  useEffect(() => {
    setIsLoading(true);
    if (query?.length > 0) {
      searchPlants(query)
        .then((res) => {
          dispatch(fetchLimitPlants(res));
          setPlantList(res);
          if (res?.node === null) setIsError(true);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    } if (nodeId?.length > 0) {
      searchPlantsId(nodeId)
        .then((res) => {
          const resObject = {
            detail: res.detail,
            nodes: res.node ? [res.node] : [],
          };
          dispatch(fetchLimitPlants(resObject));
          setPlantList((resObject));
          if ((resObject)?.nodes === null) setIsError(true);
        })
        .catch((err) => {
          console.log(err);
        });
      setIsLoading(false);
    } else {
      dispatch(fetchLimitPlants(plants));
      setPlantList(plants);
      if (plants?.node === null) {
        setIsError(true);
        setIsLoading(false);
      }
      setIsLoading(false);
    }
  }, [query, nodeId, dispatch]);

  const data = plantList?.nodes?.map((item) => {
    const { id, label, rank, taxonomicStatus, refs, xrefs } = item.properties;
    return {
      nodeId: item?.id || "Not available",
      id: id || "Not available",
      label: label || "Not available",
      rank: rank || "Not available",
      taxonomicStatus: taxonomicStatus || "Not available",
      refs: refs || "Not available",
      xrefs: xrefs || "Not available",
      action: true || "Not available",
    };
  });

  function removePlant(id) {
    if (deleteValue == id){
      deletePlant(id).then((res) => {
        setDeleteValue("")
        setDeleteMessage("")
        window.location.reload()
      });
    }
    else if (deleteValue < 1) {
      setDeleteMessage("Please input required node id number")
    }
    else if (deleteValue > 1 && deleteValue != id) {
      setDeleteMessage("Input must be the same as required")
    }
  }


  return (
    <div className="pt-5">
      {isLoading ? (
        <TableSkeleton />
      ) : isError ? (
        <div className="flex flex-col justify-center items-center py-3 md:py-8">
          <Image src={Empty} alt="not available" height={200} width={200} />
          <p className="text-sm md:text-base">Plants not available</p>
        </div>
      ) : (
        <CustomTable
          attribute={attribute}
          data={data}
          deleteItem={removePlant}
          deleteValue={deleteValue}
          setDeleteValue={setDeleteValue}
          deleteMessage={deleteMessage}
        />
      )}
    </div>
  );
}
