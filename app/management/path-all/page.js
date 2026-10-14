"use client"
import React, { Fragment, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { IoAddSharp } from 'react-icons/io5';
import { FaRegEdit } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { MdEditLocationAlt, MdOutlineDeleteForever } from "react-icons/md";
import { fetcher } from "@/helpers/common";
import useSWR from "swr";
import Cookies from 'js-cookie';
import ViewTraditionalUse from "./ViewTraditionalUse";
import UpdateTraditionalUse from "./UpdateTraditionalUse";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import api from "@/app/lib/axios";
import FormPathAll from "./FormPathAll";

export default function PathAll() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const refLabel = useRef();
  const refId = useRef();
  const [search, setSearch] = useState({
    label: '',
    id: ''
  })

  const { data, error, mutate, isLoading } = useSWR(`/traditional-use/relationship/path-all?skip=${(currentPage - 1) * pageSize}&limit=${pageSize}`, fetcher);

  // console.log(data)
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
  const [deleteItem, setDeleteItem] = useState(null);
  const handleDelete = (id) => {
    setDeleteItem(id);
    setShowDeleteConfirmation(true);
  }
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  console.log("data", deleteItem?.Ethnic.properties.id)
  console.log("data", deleteItem)

  const confirmDelete = async () => {
    try {
      // Validasi apakah deleteItem sudah ada dan memiliki data yang valid
      if (!deleteItem || Object.keys(deleteItem).length === 0) {
        throw new Error("No item selected or invalid data");
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/traditional-use/relationship/path-all`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plant_id: deleteItem.Plant.properties.id,
          plant_part_id: deleteItem.PlantPart.properties.id,
          traditional_use_id: deleteItem.TraditionalUse.properties.id,
          method_of_use_id: deleteItem.MethodOfUse.properties.id,
          ethnic_id: deleteItem.Ethnic.properties.id,
          location_id: deleteItem.Location.properties.id,
          reference_id: deleteItem.Reference.properties.id,
          user_id: deleteItem.User.properties.id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();  // Coba untuk mengambil detail error dari response API
        throw new Error(errorData.message || 'Failed to delete item');
      }
      setShowDeletePopup(true);

      setTimeout(() => {
        setShowDeletePopup(false);
      }, 2000);
      window.location.reload();  // Jika menggunakan mutate untuk memperbarui data setelah penghapusan
    } catch (error) {
      console.log('Error deleting item:', error.message);
    }

    // Menutup konfirmasi penghapusan
    setShowDeleteConfirmation(false);
  };

  // const confirmDelete = async () => {
  //   try {
  //     // Validasi apakah deleteItem sudah ada dan memiliki data yang valid
  //     if (!deleteItem || Object.keys(deleteItem).length === 0) {
  //       throw new Error("No item selected or invalid data");
  //     }

  //     const response = await fetch(`${API_URL}/traditional-use/relationship/path-all`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         plant_id: deleteItem.Plant.properties.id,
  //         plant_part_id: deleteItem.PlantPart.properties.id,
  //         traditional_use_id: deleteItem.TraditionalUse.properties.id,
  //         method_of_use_id: deleteItem.MethodOfUse.properties.id,
  //         ethnic_id: deleteItem.Ethnic.properties.id,
  //         location_id: deleteItem.Location.properties.id,
  //         reference_id: deleteItem.Reference.properties.id,
  //         user_id: deleteItem.User.properties.id
  //       })
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();  // Coba untuk mengambil detail error dari response API
  //       throw new Error(errorData.message || 'Failed to delete item');
  //     }
  //     setShowDeletePopup(true);

  //     setTimeout(() => {
  //       setShowDeletePopup(false);
  //     }, 2000);
  //     await mutate();  // Jika menggunakan mutate untuk memperbarui data setelah penghapusan
  //   } catch (error) {
  //     console.log('Error deleting item:', error.message);
  //   }

  //   // Menutup konfirmasi penghapusan
  //   setShowDeleteConfirmation(false);
  // };
  const cancelDelete = () => {
    setDeleteItem(null);
    setShowDeleteConfirmation(false);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }

  return (
    <Fragment>
      <div className="bg-white rounded-xl">
        <div className="sm:flex items-center justify-between md:mb-5 mb-2 md:mx-5  pt-3">
          <div className="flex mb-4">
            <MdEditLocationAlt className="w-10 h-10 mr-4" />
            <h1 className="md:text-3xl text-2xl font-bold "> Manage Traditional Path All</h1>
          </div>
          <button
            href="#"
            className="sm:w-40 w-full sm:-mt-2 mt-3 flex font-bold items-center justify-center text-[#2e2e2e] bg-[#dbdada] hover:bg-[#D1D1D1] hover:ring-2 hover:ring-black px-5 py-3 rounded-xl text-sm border border-gray-200"
            onClick={() => setShowForm(true)}
          >
            <span className="flex items-center">
              <IoAddSharp size={20} className="mr-1" />
              ADD DATA
            </span>
          </button>
        </div>

        <div className="md:px-5 overflow-x-auto mx-1 md:mx-0">
          <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-y-2">
            <thead className="h-[50px] bg-[#50744C] text-slate-100 text-[14px]">
              <tr className="">
                <th className="rounded-l-xl pl-3">Plant</th>
                <th className="pl-3">Plant Part</th>
                <th className="pl-3">Traditional Use</th>
                <th className="pl-3">Method Of Use</th>
                <th className="pl-3">Ethnic</th>
                <th className="pl-3">Location</th>
                <th className="pl-3">Reference</th>
                <th className="pl-3">User</th>
                <th className="pl-3">Status</th>
                <th className="rounded-r-xl pl-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {data?.data?.map((item) => (
                <tr className="text-[13px] text-left " key={item.id}>
                  <td className="border-t border-b border-l border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-l-xl ">
                    <p className="font-semibold">{item.Plant.properties.id || "-"}</p>
                    <p>{item.Plant.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p className="font-semibold">{item.PlantPart.properties.id || "-"}</p>
                    <p>{item.PlantPart.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p className="font-semibold">{item.TraditionalUse.properties.id || "-"}</p>
                    <p>{item.TraditionalUse.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p className="font-semibold">{item.MethodOfUse.properties.id || "-"}</p>
                    <p>{item.MethodOfUse.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p className="font-semibold">{item.Ethnic.properties.id || "-"}</p>
                    <p>{item.Ethnic.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p className="font-semibold">{item.Location.properties.id || "-"}</p>
                    <p>Kelurahan desa {item.Location.properties.kel_desa || "-"} berada di kecamatan {item.Location.properties.kecamatan || "-"}, kabupaten {item.Location.properties.kab_kota || "-"}, provinsi {item.Location.properties.provinsi || "-"}, dengan koordinat lintang {item.Location.properties.lat || "-"} dan bujur {item.Location.properties.long || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p className="font-semibold">{item.Reference.properties.id || "-"}</p>
                    <p>{item.Reference.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p className="font-semibold">{item.User.properties.id || "-"}</p>
                    <p>{item.User.properties.username || "-"}</p>
                  </td>
                  <td className="border-t border-b  border-[#BDBDBD] pl-3 pt-2 pb-2 ">
                    <p className="font-semibold">{item.Status.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b border-r border-[#BDBDBD] gap-2 pl-3 pt-2 pb-2 rounded-r-xl">
                    <div className="flex-row gap-4 mr-2 justify-center items-center">
                      <LuEye size={23} className="cursor-pointer ml-0.5" onClick={() => handleViewDetails(item)} />
                      {item.Status.properties.label !== "VALIDATED" && (
                        <FaRegEdit size={20} onClick={() => handleSelectUpdate(item)} className="cursor-pointer ml-1" />
                      )}
                      {item.Status.properties.label !== "VALIDATED" && (
                        <MdOutlineDeleteForever size={24} className="mt-1 cursor-pointer" onClick={() => handleDelete(item)} />
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
      {showView && (
        <ViewTraditionalUse isVisible={showView} onClose={closeViewDetails} data={viewItem} />
      )}
      <FormPathAll isVisible={showForm} onClose={() => setShowForm(false)} />
      {modalUpdate && modalUpdate.show && (
        <UpdateTraditionalUse
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
            <div className="success-alert cursor-default flex items-center justify-between w-full h-[100px] rounded-lg bg-[#F0E1C6] px-[10px]">
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
