'use client'
import React, { Fragment, useRef, useEffect } from "react";
import logoTU from "@/public/assets/icons/iconTradisionalUses.svg"
import Image from "next/image";
import { IoSearch } from "react-icons/io5";
import { IoAddSharp } from 'react-icons/io5';
import { FaRegEdit } from "react-icons/fa";
import { LuEye } from "react-icons/lu";
import { MdEditLocationAlt, MdOutlineDeleteForever } from "react-icons/md";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/helpers/common";
import ViewTraditionalUse from "./ViewTraditionalUse";
// import UpdateTraditionalUse from "./UpdateTraditionalUse";
import FormTraditional from "./FormTraditional";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { PiPlant, PiPottedPlant } from "react-icons/pi";
import { GiPlantSeed } from "react-icons/gi";
import { RiHandCoinFill } from "react-icons/ri";
import { TfiShield } from "react-icons/tfi";
import { GoCrossReference } from "react-icons/go";
// import FormPlant from "./FormPlant";
// import FormPlantPart from "./FormPlantPart";
import FormTraditionalUse from "./FormTraditionalUse";
import FormMethodOfUse from "./FormMethodOfUse";
import FormEthnic from "./FormEthnic";
import FormLocation from "./FormLocation";
import FormReference from "./FormReference";
import Welcome from "@/public/assets/images/welcome.svg";
import { useSession } from "next-auth/react";
import Cookies from 'js-cookie';
import { signOut } from 'next-auth/react';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
// import api from '../app/lib/axios';
const Contributor = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: session, status } = useSession();
  const userId = session?.user?.user_id;

  // Refs untuk input pencarian
  // const { data, error, mutate, isLoading } = useSWR(
  //   userId 
  //     ? `/traditional-use/relationship/path-all?user_id=${userId}&skip=${(currentPage - 1) * pageSize}&limit=${pageSize}` 
  //     : null, 
  //   fetcher
  // );
  const { data, error, mutate, isLoading } = useSWR(
    userId ? `/traditional-use/relationship/path-all?user_id=${userId}&skip=${(currentPage - 1) * pageSize}&limit=${pageSize}` : null,
    fetcher
  );

  const [showView, setShowView] = useState(false);
  const [viewItem, setViewItem] = useState(null);
  const handleViewDetails = (data) => {
    setViewItem(data);
    setShowView(true);
  };
  const closeViewDetails = () => {
    setShowView(false);
  }


  // const [modalUpdate, setModalUpdate] = useState({
  //   show: false,
  //   data: null
  // });
  // const handleSelectUpdate = (data) => {
  //   setModalUpdate({
  //     show: true,
  //     data: data
  //   })
  // }


  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  }

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  }



  const [showEdit, setShowEdit] = useState(false);
  // const [showEditPlant, setShowEditPlant] = useState(false);
  // const [showEditPlantPart, setShowEditPlantPart] = useState(false);
  const [showEditTraditionalUse, setShowEditTraditionalUse] = useState(false);
  const [showEditMethodOfUse, setShowEditMethodOfUse] = useState(false);
  const [showEditEthnic, setShowEditEthnic] = useState(false);
  const [showEditLocation, setShowEditLocation] = useState(false);
  const [showEditReference, setShowEditReference] = useState(false);


  const [iconSize, setIconSize] = useState(40);

  const toggleEdit = () => {
    setShowEdit(!showEdit); // Mengubah nilai showEdit menjadi kebalikannya
    if (!showEdit) {
      setIconSize(45);
    } else {
      setIconSize(40);
    }
  };

  // const toggleEditPlant = () => {
  //   setShowEditPlant(!showEditPlant);
  // };
  // const [showFormPlant, setShowFormPlant] = useState(false);

  // const toggleEditPlantPart = () => {
  //   setShowEditPlantPart(!showEditPlantPart);
  // };
  // const [showFormPlantPart, setShowFormPlantPart] = useState(false);

  const toggleEditTraditionalUse = () => {
    setShowEditTraditionalUse(!showEditTraditionalUse);
  };
  const [showFormTraditionalUse, setShowFormTraditionalUse] = useState(false);

  const toggleEditMethodOfUse = () => {
    setShowEditMethodOfUse(!showEditMethodOfUse);
  };
  const [showFormMethodOfUse, setShowFormMethodOfUse] = useState(false);

  const toggleEditEthnic = () => {
    setShowEditEthnic(!showEditEthnic);
  };
  const [showFormEthnic, setShowFormEthnic] = useState(false);

  const toggleEditLocation = () => {
    setShowEditLocation(!showEditLocation);
  };
  const [showFormLocation, setShowFormLocation] = useState(false);

  const toggleEditReference = () => {
    setShowEditReference(!showEditReference);
  };
  const [showFormReference, setShowFormReference] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const handleDelete = (id) => {
    setDeleteItem(id);
    setShowDeleteConfirmation(true);
  };

  console.log("data", deleteItem?.Ethnic.properties.id)
  console.log("data", deleteItem)
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // const confirmDelete = async () => {
  //   try {
  //     // Validasi apakah deleteItem sudah ada dan memiliki data yang valid
  //     if (!deleteItem || Object.keys(deleteItem).length === 0) {
  //       throw new Error("No item selected or invalid data");
  //     }
  
  //     const { Plant, PlantPart, TraditionalUse, MethodOfUse, Ethnic, Location, Reference, User } = deleteItem;
  
  //     const response = await api.delete("/traditional-use/relationship/path-all", {
  //       data: {
  //         plant_id: Plant.properties.id,
  //         plant_part_id: PlantPart.properties.id,
  //         traditional_use_id: TraditionalUse.properties.id,
  //         method_of_use_id: MethodOfUse.properties.id,
  //         ethnic_id: Ethnic.properties.id,
  //         location_id: Location.properties.id,
  //         reference_id: Reference.properties.id,
  //         user_id: User.properties.id
  //       }
  //     });
  
  //     // Jika berhasil, tampilkan popup dan lakukan mutate untuk memperbarui data
  //     setShowDeletePopup(true);
  //     setTimeout(() => {
  //       setShowDeletePopup(false);
  //     }, 2000);
  
  //     await mutate();  // Memperbarui data setelah penghapusan
  //   } catch (error) {
  //     console.error('Error deleting item:', error.message);
  //   }
  
  //   // Menutup konfirmasi penghapusan
  //   setShowDeleteConfirmation(false);
  // };

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

  const cancelDelete = () => {
    setDeleteItem(null);
    setShowDeleteConfirmation(false);
  };

  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    // Tampilkan popup konfirmasi logout
    setShowPopup(true);
  };

  const handlePopupConfirm = () => {
    // // Hancurkan cookies yang relevan
    // Cookies.remove('token');
    // Cookies.remove('session-token');
    // Cookies.remove('next-auth.callback-url');
    // Cookies.remove('next-auth.csrf-token');
    // Cookies.remove('next-auth.session-token');

    // // Log cookies setelah dihapus untuk debugging
    // console.log('After cookies removed:', Cookies.get());

    // Gunakan next-auth signOut untuk menghapus session
    signOut({ callbackUrl: 'https://herbalinsight.tod.my.id/authenticate/login' });

    // Redirect ke halaman login setelah logout
    // window.location.href = "/authenticate/login";
  };

  const handlePopupCancel = () => {
    // Jika pengguna memilih untuk membatalkan, tutup popup
    setShowPopup(false);
  };


  return (
    <Fragment className=" bg-gray-100">
      <div className="flex mb-4 pt-6 ml-5 justify-between">
        <div className="flex sm:pl-5">
          <Image src={logoTU} alt="logoPN" className="w-10 h-10 mr-4" />
          <h1 className="text-3xl font-bold"> Manage Traditional Uses</h1>
        </div>
        <div className="ml-auto sm:mr-10 mr-6 mt-2 h-12 sm:h-12 cursor-pointer bg-green-700 p-2 rounded-xl text-white" onClick={handleLogout} >
          Logout
        </div>

      </div>
      {/* <div className="relati"> */}
      <div className={`fixed bottom-0 left-0 rounded-full ml-8 mb-5 pb-2 pl-2 z-10 ${!showEdit ? 'bg-slate-300' : 'bg-slate-400'}`}>
        <HiOutlineFolderAdd className="mr-2 mt-2 cursor-pointer" size={iconSize} onClick={toggleEdit} title="Start Managing" />
        {showEdit && (
          <div>
            {/* <div className=" w-10 h-10 bg-slate-300 rounded-full absolute bottom-[340px] left-[10px] shadow-lg hover:bg-slate-400">
              <PiPlant size={27} className={`mx-auto mt-[7px] ${showEditPlant ? 'animate-bounce' : 'animate-none'} cursor-pointer`} onClick={toggleEditPlant} />
              {
                showEditPlant && (
                  <button className="fixed bottom-[344px] left-[70px] bg-slate-300  hover:bg-[#e87e04] hover:text-white shadow-md px-2 py-1 ml-5 mb-6 rounded-sm" onClick={() => setShowFormPlant(true)}>
                    <h1 className="text-sm font-semibold">Manage Plant</h1>
                  </button>
                )
              }
            </div>
            <div className=" w-10 h-10 bg-slate-300 rounded-full absolute bottom-[295px] left-[10px] shadow-lg  hover:bg-slate-400">
              <PiPottedPlant size={27} className={`mx-auto mt-[7px] ${showEditPlantPart ? 'animate-bounce' : 'animate-none'} cursor-pointer`} onClick={toggleEditPlantPart} />
              {
                showEditPlantPart && (
                  <button className="fixed bottom-[299px] left-[70px] bg-slate-300  hover:bg-[#e87e04] shadow-md px-2 py-1 ml-5 mb-6 rounded-sm" onClick={() => setShowFormPlantPart(true)}>
                    <h1 className="text-sm font-semibold">Manage Plant Part</h1>
                  </button>
                )
              }
            </div> */}
            <div className=" w-10 h-10 bg-slate-300 rounded-full absolute bottom-[250px] left-[10px] shadow-lg hover:bg-slate-400">
              <GiPlantSeed size={27} className={`mx-auto mt-[7px] ${showEditTraditionalUse ? 'animate-bounce' : 'animate-none'} cursor-pointer`} onClick={toggleEditTraditionalUse} />
              {
                showEditTraditionalUse && (
                  <button className="fixed bottom-[253px] left-[70px] bg-slate-300  hover:bg-[#e87e04] shadow-md px-2 py-1 ml-5 mb-6 rounded-sm" onClick={() => setShowFormTraditionalUse(true)}>
                    <h1 className="text-sm font-semibold">Manage Traditional Use</h1>
                  </button>
                )
              }
            </div>
            <div className=" w-10 h-10 bg-slate-300 rounded-full absolute bottom-[205px] left-[10px] shadow-lg hover:bg-slate-400">
              <RiHandCoinFill size={27} className={`mx-auto mt-[7px] ${showEditMethodOfUse ? 'animate-bounce' : 'animate-none'} cursor-pointer`} onClick={toggleEditMethodOfUse} />
              {
                showEditMethodOfUse && (
                  <button className="fixed bottom-[207px] left-[70px] bg-slate-300  hover:bg-[#e87e04] shadow-md px-2 py-1 ml-5 mb-6 rounded-sm" onClick={() => setShowFormMethodOfUse(true)}>
                    <h1 className="text-sm font-semibold">Manage Method Of Use</h1>
                  </button>
                )
              }
            </div>
            <div className=" w-10 h-10 bg-slate-300 rounded-full absolute bottom-[160px] left-[10px] shadow-lg hover:bg-slate-400">
              <TfiShield size={27} className={`mx-auto mt-[7px] ${showEditEthnic ? 'animate-bounce' : 'animate-none'} cursor-pointer`} onClick={toggleEditEthnic} />
              {
                showEditEthnic && (
                  <button className="fixed bottom-[161px] left-[70px] bg-slate-300  hover:bg-[#e87e04] shadow-md px-2 py-1 ml-5 mb-6 rounded-sm" onClick={() => setShowFormEthnic(true)}>
                    <h1 className="text-sm font-semibold">Manage Ethnic</h1>
                  </button>
                )
              }
            </div>
            <div className=" w-10 h-10 bg-slate-300 rounded-full absolute bottom-[115px] left-[10px] shadow-lg hover:bg-slate-400">
              <MdEditLocationAlt size={27} className={`mx-auto mt-[7px] ${showEditLocation ? 'animate-bounce' : 'animate-none'} cursor-pointer`} onClick={toggleEditLocation} />
              {
                showEditLocation && (
                  <button className="fixed bottom-[115px] left-[70px] bg-slate-300  hover:bg-[#e87e04] shadow-md px-2 py-1 ml-5 mb-6 rounded-sm" onClick={() => setShowFormLocation(true)}>
                    <h1 className="text-sm font-semibold">Manage Location</h1>
                  </button>
                )
              }
            </div>
            <div className=" w-10 h-10 bg-slate-300 rounded-full absolute bottom-[70px] left-[10px] shadow-lg hover:bg-slate-400">
              <GoCrossReference size={27} className={`mx-auto mt-[7px] ${showEditReference ? 'animate-bounce' : 'animate-none'} cursor-pointer`} onClick={toggleEditReference} />
              {
                showEditReference && (
                  <button className="fixed bottom-[69px] left-[70px] bg-slate-300  hover:bg-[#e87e04] shadow-md px-2 py-1 ml-5 mb-6 rounded-sm" onClick={() => setShowFormReference(true)}>
                    <h1 className="text-sm font-semibold">Manage Reference</h1>
                  </button>
                )
              }</div>

          </div>
        )}
        {/* {showEdit && (
          <div className="absolute bottom-[7px] left-[65px] h-10 cursor-pointer hover:bg-gray-300  bg-gray-200 p-3 rounded-r-full shadow-lg w-32">
            <h1 className="text-sm font-semibold">Edit Profiles</h1>
          </div>
        )} */}
      </div>
      {/* </div> */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative">
            <p className="text-lg font-semibold mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end">
              <button
                onClick={handlePopupCancel}
                className="bg-gray-300 px-4 py-2 rounded mr-2"
              >
                NO
              </button>
              <button
                onClick={handlePopupConfirm}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                YES
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-green-900 py-10 px-3 md:px-32 rounded-2xl flex items-center justify-between w-[94%] mx-auto mb-4">
        <div className="pr-0 md:pr-20">
          <p className="text-xl md:text-2xl font-bold text-white pb-5">
            Hi,
            <span className="text-yellow-400">
              {status === "loading"
                ? "Loading..."  // Ditampilkan saat session masih loading
                : session?.user?.username || "Guest"} {/* Tampilkan username atau fallback */}
            </span>
          </p>
          <p className="text-white pb-10 text-sm md:text-base">
            Welcome to the Contributor's. This is your space to
            cultivate and share your knowledge of medicinal plants.
          </p>
        </div>
        <div className="hidden sm:flex">
          <Image src={Welcome} alt="Welcome" size='200' width={200} height={200} className="w-44" />
        </div>
      </div>
      <div className="bg-white rounded-xl sm:mx-5 mx-3 pb-7">
        <div className="flex items-center mb-5 md:mx-5 pt-3">
          <button
            href="#"
            className="w-full flex font-bold items-center justify-center text-[#2e2e2e] bg-[#dbdada] hover:bg-[#D1D1D1] hover:ring-2 hover:ring-black px-5 py-3 rounded-xl text-sm border border-gray-200"
            onClick={() => setShowForm(true)}
          >
            <span className="flex items-center">
              <IoAddSharp size={20} className="mr-1" />
              ADD DATA
            </span>
          </button>
        </div>
        <div className="md:px-5 overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 border-separate border-spacing-y-2 table-a ">
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
                <th className="rounded-r-xl pr-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-black">
              {data?.data?.map((item) => (
                <tr className="text-[13px] text-left" key={item.id}>
                  <td className="border-t border-b border-l border-[#BDBDBD] pl-3 pt-2 pb-2 rounded-l-xl align-top">
                    <p className="font-semibold">{item.Plant.properties.id || "-"}</p>
                    <p>{item.Plant.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 pt-2 pb-2 align-top">
                    <p className="font-semibold">{item.PlantPart.properties.id || "-"}</p>
                    <p>{item.PlantPart.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 pt-2 pb-2 align-top">
                    <p className="font-semibold">{item.TraditionalUse.properties.id || "-"}</p>
                    <p>{item.TraditionalUse.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 pt-2 pb-2 align-top">
                    <p className="font-semibold">{item.MethodOfUse.properties.id || "-"}</p>
                    <p>{item.MethodOfUse.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 pt-2 pb-2 align-top">
                    <p className="font-semibold">{item.Ethnic.properties.id || "-"}</p>
                    <p>{item.Ethnic.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 pt-2 pb-2 align-top">
                    <p className="font-semibold">{item.Location.properties.id || "-"}</p>
                    <p>Kelurahan desa {item.Location.properties.kel_desa || "-"} berada di kecamatan {item.Location.properties.kecamatan || "-"}, kabupaten {item.Location.properties.kab_kota || "-"}, provinsi {item.Location.properties.provinsi || "-"}, dengan koordinat lintang {item.Location.properties.lat || "-"} dan bujur {item.Location.properties.long || "-"}</p>
                  </td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 pt-2 pb-2 align-top">
                    <p className="font-semibold">{item.Reference.properties.id || "-"}</p>
                    <p>{item.Reference.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 pt-2 pb-2 align-top">
                    <p className="font-semibold">{item.User.properties.id || "-"}</p>
                    <p>{item.User.properties.username || "-"}</p>
                  </td>
                  <td className="border-t border-b border-[#BDBDBD] pl-3 pt-2 pb-2 align-top">
                    <p className="font-semibold">{item.Status.properties.label || "-"}</p>
                  </td>
                  <td className="border-t border-b border-r border-[#BDBDBD] gap-2 pl-3 pt-2 pb-2 rounded-r-xl align-top">
                    <div className="flex-row gap-4 mr-2 justify-center items-center">
                      <LuEye size={23} className="cursor-pointer mr-0.5" onClick={() => handleViewDetails(item)} />
                      <MdOutlineDeleteForever size={24} className="mt-1" onClick={() => handleDelete(item)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
          <div className="mt-4 mb-5 flex justify-center ">
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
      <FormTraditional isVisible={showForm} onClose={() => setShowForm(false)} />
      {/* {modalUpdate && modalUpdate.show && (
        <UpdateTraditionalUse
          isVisible={modalUpdate.show}
          data={modalUpdate.data}
          onClose={() => setModalUpdate({ show: false, data: null })}
        />
      )} */}
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
            <div className="success-alert cursor-default flex items-center justify-between w-full h-[100px] rounded-lg bg-[#F0E1C6] px-[20px]">
              <div className="text-[#F5F5F5] bg-green-900 p-2 rounded-lg flex justify-center items-center">
                <IoMdCheckmarkCircleOutline className="text-white text-[42px]" />
              </div>
              <div>
                <p className="text-[#2C6B3F] font-bold text-[14px] sm:text-[15px] sm:mb-2">Data successfully deleted!</p>
                <p className="text-[#4A4A4A] text-[13px] sm:text-[14px]">Data has been successfully deleted.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <FormPlant isVisible={showFormPlant} onClose={() => setShowFormPlant(false)} />
      <FormPlantPart isVisible={showFormPlantPart} onClose={() => setShowFormPlantPart(false)} /> */}
      <FormTraditionalUse isVisible={showFormTraditionalUse} onClose={() => setShowFormTraditionalUse(false)} />
      <FormMethodOfUse isVisible={showFormMethodOfUse} onClose={() => setShowFormMethodOfUse(false)} />
      <FormEthnic isVisible={showFormEthnic} onClose={() => setShowFormEthnic(false)} />
      <FormLocation isVisible={showFormLocation} onClose={() => setShowFormLocation(false)} />
      <FormReference isVisible={showFormReference} onClose={() => setShowFormReference(false)} />
    </Fragment>
  )
}

export default Contributor