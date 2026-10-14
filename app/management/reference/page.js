"use client"
import React, { Fragment, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoAddSharp } from 'react-icons/io5';
import { FaRegEdit } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { MdOutlineDeleteForever } from "react-icons/md";
import { fetcher } from "@/helpers/common";
import useSWR from "swr";
import { GoCrossReference } from "react-icons/go";
import ViewReference from "./ViewReference";
import UpdateReference from "./UpdateReference";
import FormReference from "./FormReference";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function Reference() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const refLabel = useRef();
  const [search, setSearch] = useState({
    label: ''
  })

  const { data, error, mutate, isLoading } = useSWR(
    search.label
      ? `/reference/search?keyword=${search.label}`
      : `/reference/?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}`,
    fetcher
  );

  const handleChangeSearch = (e) => {
    console.log(e)
    if (e.key === 'Enter' || e.target.value == '') {
      setSearch((current) => ({
        ...current,
        label: refLabel.current.value,
      }))
    }
  }

  const handleSearch = () => {
    setSearch((current) => ({
      ...current,
      label: refLabel.current.value
    }))
    setCurrentPage(1)
  }

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
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  // const handleDelete = (id) => {
  //   if (id) {
  //     console.log("Deleting item with ID:", id);
  //     setDeleteItemId(id);
  //     setShowDeleteConfirmation(true);
  //   } else {
  //     console.log("Item ID is undefined, can't delete");
  //   }
  // }

  const handleDelete = (data) => {
    if (data?.Reference?.properties?.id) {
      console.log("Deleting item with Reference ID:", data.Reference.properties.id);
      setDeleteItemId(data.Reference.properties.id); // Set the ID from the Reference property
      setShowDeleteConfirmation(true);
    } else {
      console.log("Item ID is undefined, can't delete");
    }
  }
  const confirmDelete = async () => {
    try {
      if (deleteItemId) {
        // Use the Reference ID for deletion
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reference/${deleteItemId}`, {
          method: "DELETE",
        });
        setShowDeletePopup(true);
        setTimeout(() => {
          setShowDeletePopup(false);
          window.location.reload();
        }, 3000);

      }
    } catch (error) {
      console.log(error);
    }
    setShowDeleteConfirmation(false);
  }

  // const confirmDelete = async () => {
  //   try {
  //     await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reference/${deleteItemId}`, {
  //       method: "DELETE",
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
      <div className="flex mb-4">
        <GoCrossReference className="w-10 h-10 mr-4" />
        <h1 className="text-3xl font-bold mb-5">Manage Reference</h1>
      </div>

      <div className="bg-white rounded-xl">
        <div className="flex items-center justify-between gap-3 md:mb-5 mb-2 md:mx-5 mx-1 pt-3">
          <div className='relative flex flex-1'>
            <input type='text' name="label" ref={refLabel} onKeyDown={handleChangeSearch} className='w-full border border-gray-200 py-3 pl-5 text-sm outline-2 rounded-xl bg-[#EFEFEF]' placeholder='Search plant by label...' />
            <IoSearch className='absolute right-3 top-3 h-6 w-6 text-[#636363]' onClick={handleSearch} />
          </div>

          <button className='inline-flex items-center space-x-1 text-[#2e2e2e] bg-[#EFEFEF] hover:bg-[#D1D1D1] hover:ring-2 hover:ring-black px-5 py-3 rounded-xl text-sm border border-gray-200'
            onClick={() => setShowForm(true)}>
            <IoAddSharp size={20} className='mr-1' />
            New
          </button>
        </div>

        <div className="md:px-5 overflow-x-auto mx-1 md:mx-0">
          {search.label ? (
            <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-y-2">
              <thead className="h-[50px] bg-[#50744C] text-slate-100 text-[14px]">
                <tr className="">
                  <th className="rounded-l-xl pl-3">Reference (ID)</th>
                  <th className="pl-3">Label</th>
                  <th className="pl-3">url</th>
                  <th className="rounded-r-xl text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-black">
                {data?.nodes?.map((item) => (
                  <tr key={item.id}>
                    <td className="border-t border-b border-l border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-l-xl ">
                      <p>{item.properties.id || "-"}</p>
                    </td>
                    <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                      <p>{item.properties.label || "-"}</p>
                    </td>
                    <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                      <p>{item.properties.url || "-"}</p>
                    </td>
                    <td className="border-t border-b border-r border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-r-xl">
                      <div className="flex gap-2 mr-2 justify-center items-center">
                        <LuEye size={23} className="cursor-pointer ml-0.5" onClick={() => handleViewDetails(item)} />
                        <FaRegEdit size={20} onClick={() => handleSelectUpdate(item)} className="cursor-pointer ml-1" />
                        <MdOutlineDeleteForever size={24} onClick={() => handleDelete(item.id)}
                          className="cursor-pointer mt-1" />
                      </div>
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          )
            :
            (
              <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-y-2">
                <thead className="h-[50px] bg-[#50744C] text-slate-100 text-[14px]">
                  <tr className="">
                    <th className="rounded-l-xl pl-3">Reference (ID)</th>
                    <th className="pl-3">Label</th>
                    <th className="pl-3">url</th>
                    <th className="pl-3">User</th>
                    <th className="rounded-r-xl text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-black">
                  {data?.data?.map((item) => (
                    <tr className="text-[13px] text-left " key={item.id}>
                      <td className="border-t border-b border-l border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-l-xl ">
                        <p>{item.Reference.properties.id || "-"}</p>
                      </td>
                      <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                        <p>{item.Reference.properties.label || "-"}</p>
                      </td>
                      <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                        <p>{item.Reference.properties.url || "-"}</p>
                      </td>
                      <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                        <p>{item.User.properties.id || "-"}</p>
                      </td>
                      <td className="border-t border-b border-r border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-r-xl">
                        <div className="flex gap-2 mr-2 justify-center items-center">
                          <LuEye size={23} className="cursor-pointer ml-0.5" onClick={() => handleViewDetails(item)} />
                          <FaRegEdit size={20} onClick={() => handleSelectUpdate(item)} className="cursor-pointer ml-1" />
                          <MdOutlineDeleteForever size={24} onClick={() => handleDelete(item)}
                            className="cursor-pointer mt-1" />
                        </div>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </table>
            )}
          <div className="mt-4 flex justify-between mb-3">
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
      {
        showView && (
          <ViewReference isVisible={showView} onClose={closeViewDetails} data={viewItem} />
        )
      }
      {
        modalUpdate && modalUpdate.show && (
          <UpdateReference
            isVisible={modalUpdate.show}
            data={modalUpdate.data}
            onClose={() => setModalUpdate({ show: false, data: null })}
          />
        )
      }
      <FormReference isVisible={showForm} onClose={() => setShowForm(false)} />
      {
        showDeleteConfirmation && (
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
        )
      }
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
    </Fragment >

  );
}
