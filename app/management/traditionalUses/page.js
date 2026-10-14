"use client"
import React, { Fragment, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoAddSharp } from 'react-icons/io5';
import { FaRegEdit } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { MdOutlineDeleteForever } from "react-icons/md";
import { fetcher } from "@/helpers/common";
import useSWR from "swr";
import { PiPottedPlant } from "react-icons/pi";
import UpdateTraditionalUse from "./UpdateTraditionalUse";
import ViewTraditionalUse from "./ViewTraditionalUse";
import FormTraditional from "./FormTraditional";
import { useSession } from "next-auth/react";
import axios from "axios";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function traditionalUses() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const refLabel = useRef();
  const refId = useRef();
  const [search, setSearch] = useState({
    label: '',
    id: ''
  })
  const { data: session, status } = useSession();
  const userId = session?.user?.user_id;
  console.log(userId)

  const { data, error, mutate, isLoading } = useSWR(
    userId ? `/traditional-use/?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}` : null,
    fetcher
  );
  // const { data, error, mutate, isLoading } = useSWR(`/traditional-use/?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}`, fetcher);
  // const handleChangeSearch = (e) => {
  //   console.log(e)
  //   if (e.key === 'Enter' || e.target.value == '') {
  //     setSearch((current) => ({
  //       ...current,
  //       label: refLabel.current.value,
  //       id: refId.current.value
  //     }))
  //   }
  // }

  // const handleSearch = () => {
  //   setSearch((current) => ({
  //     ...current,
  //     label: refLabel.current.value,
  //     id: refId.current.value
  //   }))
  //   setCurrentPage(1)
  // }

  const [showView, setShowView] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const handleViewDetails = (data) => {
    setViewItem(data);
    setShowView(true);
  };
  const closeViewDetails = () => {
    setShowView(false);
  }

  const [showForm, setShowForm] = useState(false);

  const [modalUpdate, setModalUpdate] = useState({
    show: false,
    data: null
  });
  const handleSelectUpdate = (data) => {
    setModalUpdate({
      show: true,
      data: data
    })
  }

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const handleDelete = (data) => {
    console.log("Deleting item with ID:", data.properties.id);
    setDeleteItemId(data.properties.id);
    setShowDeleteConfirmation(true);
  }

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const confirmDelete = async () => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/traditional-use/${deleteItemId}`, {
        headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
        }
      });
      setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
      }, 2000);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
    setShowDeleteConfirmation(false);
  };

  // const confirmDelete = async () => {
  //   try {
  //     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traditional-use/${deleteItemId}`, {
  //       method: "DELETE",
  //       headers: {
  //         'Authorization': 'Bearer YOUR_ACCESS_TOKEN'
  //       }
  //     });
  //     await mutate()
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setShowDeleteConfirmation(false);
  // }
  const cancelDelete = () => {
    setDeleteItemId(null);
    setShowDeleteConfirmation(false);
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <Fragment>
      <div className="bg-white rounded-xl">
        <div className="flex items-center justify-between gap-3 md:mb-2 mb-2 md:mx-5 mx-1 pt-3">
          <div className="flex mt-3">
            <PiPottedPlant className="w-10 h-10 mr-4" />
            <h1 className="text-3xl font-bold mb-5"> Manage Traditional Use</h1>
          </div>
          <button className='inline-flex items-center space-x-1 text-[#2e2e2e] bg-yellow-400 hover:bg-yellow-500 sm:bg-[#EFEFEF] sm:hover:bg-[#D1D1D1] hover:ring-2 hover:ring-black px-5 py-3 rounded-xl text-sm border border-gray-200'
            onClick={() => setShowForm(true)}>
            <IoAddSharp size={20} className='mr-1' />
            New
          </button>
        </div>

        <div className="md:px-5 overflow-x-auto mx-1 md:mx-0">
          <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-y-2">
            <thead className="h-[50px] bg-[#50744C] text-slate-100 text-[14px]">
              <tr className="">
                <th className="rounded-l-xl pl-3">Traditional (ID)</th>
                <th className="pl-3">Traditional Label</th>
                <th className="rounded-r-xl text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {data?.nodes?.map((item) => (
                <tr className="text-[13px] text-left " key={item.id}>
                  <td className="border-t border-b border-l border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-l-xl ">
                    <p>{item.properties.id || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p>{item.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b border-r border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-r-xl">
                    <div className="flex gap-2 mr-2 justify-center items-center">
                      <LuEye size={23} className="cursor-pointer ml-0.5" onClick={() => handleViewDetails(item)} />
                      <FaRegEdit size={20} onClick={() => handleSelectUpdate(item)} className="cursor-pointer ml-1" />
                      <MdOutlineDeleteForever size={24} className="mt-1 cursor-pointer" onClick={() => handleDelete(item)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 flex justify-between ">
            {currentPage > 1 && (
              <button
                className="bg-[#EFEFEF] hover:bg-[#D1D1D1] hover:ring-2 hover:ring-black px-5 py-3 rounded-xl text-sm border font-semibold border-gray-200"
                onClick={handlePreviousPage}
              >
                Previous
              </button>
            )}
            {data && (
              <button
                className="bg-[#EFEFEF] hover:bg-[#D1D1D1] hover:ring-2 hover:ring-black px-5 py-3 rounded-xl text-sm border font-semibold border-gray-200"
                onClick={handleNextPage}
              >
                Next
              </button>
            )}
          </div>
        </div>

      </div>
      {showView && (
        <ViewTraditionalUse isVisible={showView} onClose={closeViewDetails} data={viewItem} />
      )}
      {modalUpdate && modalUpdate.show && (
        <UpdateTraditionalUse
          isVisible={modalUpdate.show}
          data={modalUpdate.data}
          onClose={() => setModalUpdate({ show: false, data: null })}
        />
      )}
      <FormTraditional isVisible={showForm} onClose={() => setShowForm(false)} />
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg">
            <p className="text-lg font-semibold mb-4">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeletePopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-top mt-5 justify-center z-50">
          <div className="flex flex-col gap-4 w-80 sm:w-[325px] text-[10px] sm:text-xs">
            <div className="success-alert cursor-default flex items-center  w-full h-[100px] rounded-lg bg-[#F0E1C6] px-[10px]">
              <div className="text-[#F5F5F5] bg-green-900 p-2 rounded-lg flex justify-center items-center">
                <IoMdCheckmarkCircleOutline className="text-white text-[42px]" />
              </div>
              <div className="ml-4">
                <p className="text-[#2C6B3F] font-bold text-[14px] sm:text-[15px] sm:mb-2">Data successfully deleted!</p>
                <p className="text-[#4A4A4A] text-[13px] sm:text-[14px]">Data has been successfully deleted.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>

  );
}
