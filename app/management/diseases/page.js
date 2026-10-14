"use client"
import React, { Fragment, useRef, useState } from "react";
import logoD from "@/public/assets/icons/iconDisease.svg"
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import Link from 'next/link';
import { IoAddSharp } from 'react-icons/io5';
import { FaRegEdit } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import useSWR from "swr";
import { fetcher } from "@/helpers/common";
import ViewDisease from "./ViewDisease";
import UpdateDisease from "./UpdateDisease";


export default function diseases() {
  const [currentPage, setCurrentPage] = useState(1);
    const refLabel = useRef();
    const reflabel_idn = useRef();
    const [search, setSearch] = useState({
      label: '',
      label_idn: ''
    })
  const pageSize = 10;
  const { data, error, isLoading, mutate } = useSWR(`/disease/?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}${search.label ? `&label=${search.label}` : ""}${search.label_idn ? `&id=${search.label_idn}` : ''}`, fetcher);

    const handleChangeSearch = (e) => {
    console.log(e)
    if (e.key === 'Enter' || e.target.value == '') {
      setSearch((current) => ({
        ...current,
        label: refLabel.current.value,
        label_idn: reflabel_idn.current.value
      }))
    }
  }
    const handleSearch = () => {
    setSearch((current) => ({
      ...current,
      label: refLabel.current.value,
      label_idn: reflabel_idn.current.value
    }))
    setCurrentPage(1)
  }
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
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
  return (
    <Fragment>
      <div className="flex md:mb-4">
        <Image src={logoD} alt="logoPN" className="w-10 h-10 mr-4" />
        <h1 className="text-3xl font-bold mb-5"> Manage Disease</h1>
      </div>

      <div className="bg-white rounded-xl pb-4">
        <div className="md:flex flex-wrap items-center justify-between gap-3 md:mb-5 mb-2 md:mx-5 mx-1 pt-3">
          <div className='relative flex flex-1 md:pb-0 pb-2'>
            <input type='text' name="label" ref={refLabel} onKeyDown={handleChangeSearch} className='w-full border border-gray-200 py-3 pl-5 text-sm outline-2 rounded-xl bg-[#EFEFEF]' placeholder='Search disease by label...' />
            <IoSearch className='absolute right-3 top-3 h-6 w-6 text-[#636363]' onClick={handleSearch} />
          </div>

          <div className='relative flex flex-1 md:pb-0 pb-2'>
            <input type='text' name="label_idn" ref={reflabel_idn} onKeyDown={handleChangeSearch} className='w-full border border-gray-200 py-3 pl-5 text-sm outline-2 rounded-xl bg-[#EFEFEF]' placeholder='Search disease by label IDN...' />
            <IoSearch className='absolute right-3 top-3 h-6 w-6 text-[#636363]' onClick={handleSearch} />
          </div>
        </div>

        <div className="md:px-5 overflow-x-auto mx-1 md:mx-0">
          <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-y-2">
            <thead className="h-[50px] bg-[#50744C] text-slate-100 text-[14px]">
              <tr className="">
                <th className="rounded-l-xl pl-3">Disease (ID)</th>
                <th className="pl-3">Disease Label</th>
                <th className="pl-3">Disease Label (IDN)</th>
                <th className="pl-3">Refs</th>
                <th className="pl-3">Synonyms</th>
                <th className="rounded-r-xl pl-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {data?.nodes?.map((item) => (
                <tr className="text-[13px]" key={item.id}>
                  <td className="border-t border-b border-l border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-l-xl ">{item.properties.id || '-'}</td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 ">{item.properties.label || '-'}</td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 ">{item.properties.label_id || '-'}</td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3">{item.properties.refs || '-'}</td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 ">{item.properties.synonyms || '-'}</td>
                  <td className="border-t border-b border-r border-[#BDBDBD] gap-2 pl-3 pt-2 pb-2 pr-2 rounded-r-xl">
                    <div className="flex gap-2 mr-2">
                      <LuEye
                        size={23}
                        className="cursor-pointer"
                        onClick={() => handleViewDetails(item)} />
                      <FaRegEdit
                        size={20}
                        onClick={() => handleSelectUpdate(item)}
                        className="cursor-pointer"
                      />
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
        <ViewDisease isVisible={showView} onClose={closeViewDetails} data={viewItem} />
      )}
      {modalUpdate && modalUpdate.show && (
        <UpdateDisease
          isVisible={modalUpdate.show}
          data={modalUpdate.data}
          onClose={() => setModalUpdate({ show: false, data: null })}
        />
      )}
    </Fragment>

  );
}
