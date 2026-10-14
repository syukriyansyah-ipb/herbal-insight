'use client'
import React, { Fragment, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoAddSharp } from 'react-icons/io5';
import { FaRegEdit } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { MdMenuBook } from "react-icons/md";
import { fetcher } from "@/helpers/common";
import useSWR from "swr";
import FormScientific from "./FormScientific";
import { MdOutlineDeleteForever } from "react-icons/md";
import UpdateScientific from "./UpdateScientific";
import ViewScientific from "./ViewScientific";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function scientificNames() {

  const refLabel = useRef();
  const refId = useRef();
  const [search, setSearch] = useState({
    label: '',
    id: ''
  })
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, error, isLoading, mutate } = useSWR(`/scientific-name?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}${search.label ? `&label=${search.label}` : ""}${search.id ? `&id=${search.id}` : ''}`, fetcher);
  const [showForm, setShowForm] = useState(false);


  const handleChangeSearch = (e) => {
    console.log(e)
    if (e.key === 'Enter' || e.target.value == '') {
      setSearch((current) => ({
        ...current,
        label: refLabel.current.value,
        id: refId.current.value
      }))
    }

  }
  const handleSearch = () => {
    setSearch((current) => ({
      ...current,
      label: refLabel.current.value,
      id: refId.current.value
    }))
    setCurrentPage(1)
  }

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

  const [showView, setShowView] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const handleViewDetails = (data) => {
    setViewItem(data);
    setShowView(true);
  };
  const closeViewDetails = () => {
    setShowView(false);
  }

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const handleDelete = (data) => {
    console.log(data);
    setDeleteItemId(data.properties.id);
    setShowDeleteConfirmation(true);
  }

  const confirmDelete = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scientific-name/${deleteItemId}`, {
        method: "DELETE"
      });
      setShowDeletePopup(true);
      setTimeout(() => {
        setShowDeletePopup(false);
        window.location.reload();  // Jika menggunakan mutate untuk memperbarui data setelah pen
      }, 2000);
    } catch (error) {
      console.log(error);
    }
    setShowDeleteConfirmation(false);
  }
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
      <div className="flex md:mb-4">
        <MdMenuBook className="w-10 h-10 mr-4" />
        <h1 className="text-3xl font-bold mb-5"> Manage Scientific Names</h1>
      </div>
      <div className="flex justify-end mb-2">
        <button className='inline-flex font-semibold md:hidden items-center  text-black bg-yellow-400 hover:bg-yellow-500  px-5 py-3 rounded-xl text-sm border border-gray-200'
          onClick={() => setShowForm(true)}>
          <IoAddSharp size={20} className='mr-1' />
          New
        </button>
      </div>

      <div className="bg-white rounded-xl pb-4 ">
        <div className="md:flex flex-wrap items-center justify-between gap-3 md:mb-5 mb-2 md:mx-5 mx-1 pt-3">
          <div className='relative flex flex-1 md:pb-0 pb-2'>
            <input type='text' name="label" ref={refLabel} onKeyDown={handleChangeSearch} className='w-full border border-gray-200 py-3 pl-5 text-sm outline-2 rounded-xl bg-[#EFEFEF]' placeholder='Search plant by name...' />
            <IoSearch className='absolute right-3 top-3 h-6 w-6 text-[#636363]' onClick={handleSearch} />
          </div>

          <div className='relative flex flex-1 md:pb-0 pb-2'>
            <input type='text' name="id" ref={refId} onKeyDown={handleChangeSearch} className='w-full border border-gray-200 py-3 pl-5 text-sm outline-2 rounded-xl bg-[#EFEFEF]' placeholder='Search plant by id...' />
            <IoSearch className='absolute right-3 top-3 h-6 w-6 text-[#636363]' onClick={handleSearch} />
          </div>

          <button className='md:inline-flex hidden items-center space-x-1 text-[#2e2e2e] bg-[#EFEFEF] hover:bg-[#D1D1D1] hover:ring-2 hover:ring-black px-5 py-3 rounded-xl text-sm border border-gray-200'
            onClick={() => setShowForm(true)}>
            <IoAddSharp size={20} className='mr-1' />
            New
          </button>
        </div>
        <div className="md:px-5 overflow-x-auto mx-1 md:mx-0">
          <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-y-2">
            <thead className="h-[50px] bg-[#50744C] text-slate-100 text-[14px]">
              <tr className="">
                <th className="rounded-l-xl pl-3">Scientific Names(ID)</th>
                <th className="pl-3">Scientific Names Label</th>
                <th className="pl-3">Authorship</th>
                <th className="pl-3">Status</th>
                <th className="pl-3">Xrefs</th>
                <th className="rounded-r-xl pl-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {data?.nodes?.map((item) => (
                <tr className="text-[13px] " key={item.id}>
                  <td className="border-t border-b border-l border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-l-xl ">{item.properties.id || '-'}</td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 ">{item.properties.label || '-'}</td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3">{item.properties.authorship || '-'}</td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 ">{item.properties.taxonomicStatus || '-'}</td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 ">{item.properties.xrefs || '-'}</td>
                  <td className="border-t border-b border-r border-[#BDBDBD] gap-2 pl-3 pr-3 pt-5 pb-4 rounded-r-xl">
                    <div className="flex gap-2 mr-2">
                      <LuEye size={23} className="cursor-pointer" onClick={() => handleViewDetails(item)} />
                      <FaRegEdit size={20}
                        onClick={() => handleSelectUpdate(item)}
                        className="cursor-pointer" />
                      <MdOutlineDeleteForever size={23}
                        onClick={() => handleDelete(item)}
                        className="cursor-pointer" />
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
        <ViewScientific isVisible={showView} onClose={closeViewDetails} data={viewItem} />
      )}
      <FormScientific isVisible={showForm} onClose={() => setShowForm(false)} />
      {modalUpdate && modalUpdate.show && (
        <UpdateScientific
          isVisible={modalUpdate.show}
          data={modalUpdate.data}
          onClose={() => setModalUpdate({ show: false, data: null })}
        />
      )}
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
