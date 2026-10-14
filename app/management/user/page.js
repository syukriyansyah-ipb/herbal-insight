'use client'
import React, { Fragment, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { FaHouseUser, FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import useSWR from "swr";
import { fetcher } from "@/helpers/common";
import { MdOutlineDeleteForever } from "react-icons/md";
import axios from 'axios';
import api from "@/app/lib/axios";

const User = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const refLabel = useRef();
  const [search, setSearch] = useState({
    label: '',
  })

  const { data, error, mutate, isLoading } = useSWR(`/user/?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}`, fetcher);
  // const handleChangeSearch = (e) => {
  //   console.log(e)
  //   if (e.key === 'Enter' || e.target.value == '') {
  //     setSearch((current) => ({
  //       ...current,
  //       label: refLabel.current.value,
  //     }))
  //   }
  // }

  // const handleSearch = () => {
  //   setSearch((current) => ({
  //     ...current,
  //     label: refLabel.current.value,
  //   }))
  //   setCurrentPage(1)
  // }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const handleDelete = (id) => {
    setDeleteItemId(id);
    setShowDeleteConfirmation(true);
  }
  console.log('asdf', deleteItemId?.id)

  const confirmDelete = async () => {
    try {
      const response = await api.delete(`/user/${deleteItemId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Delete success:', response); // Debug log untuk respons sukses
      await mutate(); // Memperbarui data setelah penghapusan
    } catch (error) {
      console.log("Error deleting item:", error.response || error); // Log error lebih detail
    }
    setShowDeleteConfirmation(false);
  };
  const cancelDelete = () => {
    setDeleteItemId(null);
    setShowDeleteConfirmation(false);
  }

  return (
    <Fragment className=" bg-gray-100">
      <div className="flex mb-4 ml-9">
        <FaHouseUser className="w-10 h-10 mr-4" />
        <h1 className="text-3xl font-bold mb-5">Users</h1>
      </div>
      <div className="bg-white rounded-xl mx-5 pb-96">
        {/* <div className="flex items-center justify-between gap-3 mb-5 ml-5 mr-5 pt-3">
          <div className='relative flex flex-1'>
            <input type='text' ref={refLabel} onKeyDown={handleChangeSearch} className='w-full border border-gray-200 py-3 pl-5 text-sm outline-2 rounded-xl bg-[#EFEFEF]' placeholder='Search by name...' />
            <IoSearch className='absolute right-3 top-3 h-6 w-6 text-[#636363]' onClick={handleSearch} />
          </div>
        </div> */}

        <div className="px-5">
          <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-y-2 table-a overflow-scroll">
            <thead className="h-[50px] bg-[#50744C] text-slate-100 text-[14px]">
              <tr className="">
                <th className="rounded-l-xl pl-3">Users (ID)</th>
                <th className="pl-3">username</th>
                <th className="pl-3">Verify</th>
                <th className="pl-3">Role</th>
                <th className="pl-3">FullName</th>
                <th className="pl-3 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="text-black ">
              {data?.nodes?.map((item) => (
                <tr className="text-[13px] text-left " key={item.id}>
                  <td className="border-t border-b border-l border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-l-xl ">
                    <p>{item.properties.id || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p>{item.properties.username || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p>{item.properties.verify || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p>{item.properties.role || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p>{item.properties.fullname || "-"}</p>
                  </td>
                  <td className="border-t border-b border-r border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-r-xl">
                    <div className="flex-row gap-4 mr-2 justify-center items-center">
                      {item.properties.role !== "superadmin" && item.properties.role !== "admin" && item.properties.verify !== "VALIDATED" && (
                        <MdOutlineDeleteForever size={24} className="mt-1" onClick={() => handleDelete(item.id)} />
                      )}
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
    </Fragment>
  )
}

export default User