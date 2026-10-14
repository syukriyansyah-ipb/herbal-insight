"use client";
import clsx from "clsx";
import Modal from "./Modal";
import { useState } from "react";
import EditForm from "./EditForm";
import { LuEye } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import CustomButton from "./CustomButton";
import { MdDeleteForever } from "react-icons/md";
import CustomTooltip from "@/components/CustomTooltip";
import Input from "./Input";

function Action({ handleView, handleEdit, handleDelete }) {
  return (
    <div className="flex space-x-3 items-center text-gray-900">
      <CustomTooltip id="view" text="View">
        <div className="cursor-pointer text-2xl hover:text-green-500 transition-colors duration-300">
          <LuEye onClick={handleView} />
        </div>
      </CustomTooltip>
      <CustomTooltip id="edit" text="Edit">
        <div className="cursor-pointer text-xl hover:text-yellow-500 transition-colors duration-300">
          <FaEdit onClick={handleEdit} />
        </div>
      </CustomTooltip>
      <CustomTooltip id="delete" text="Delete">
        <div className="cursor-pointer text-2xl hover:text-red-600 transition-colors duration-300">
          <MdDeleteForever onClick={handleDelete} />
        </div>
      </CustomTooltip>
    </div>
  );
}

export default function CustomTable({
  attribute,
  data,
  deleteItem,
  deleteValue,
  setDeleteValue,
  deleteMessage
}) {
  const [showModalView, setShowModalView] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalValue, setModalValue] = useState("Not Available");
  const handleView = (value) => {
    setShowModalView(!showModalView);
    setModalValue(value);
  };

  const handleDelete = (value) => {
    setShowModalDelete(!showModalDelete);
    setModalValue(value);
  };

  const handleEdit = (value) => {
    setShowModalEdit(!showModalEdit);
    setModalValue(value);
  };

  // EXAMPLE ATTRIBUTE
  // const attribute = [
  //   { label: "Ethnic ID", type: "list" },
  //   { label: "Ethnic Label", type: "list" },
  //   { label: "Province", type: "list" },
  //   { label: "Action", type: "action" },
  // ];

  // EXAMPLE DATA
  // const data = [
  //   {
  //     ethnicId: "ETHNIC-000087",
  //     ethnicLabel: "Bali Aga",
  //     province: "Bali",
  //     action: true,
  //   },
  //   {
  //     ethnicId: "ETHNIC-000087",
  //     ethnicLabel: "Bali Agas",
  //     province: "Bali",
  //     action: true,
  //   },
  // ];

  return (
    <>
      <div className="overflow-x-auto">
        <table className=" w-full text-sm md:text-base border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-green-900 text-white font-semibold rounded-md h-10 text-left">
              {attribute &&
                attribute.map((item, index) => (
                  <th
                    key={index}
                    className={clsx({
                      "rounded-l-xl": index === 0,
                      "rounded-r-xl": index === attribute.length - 1,
                    })}
                  >
                    <div className="px-4">{item.label}</div>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {data &&
              data.map((item, index) => (
                <tr
                  key={index}
                  className="h-10 even:bg-gray-700 even:bg-opacity-10"
                >
                  {Object.values(item).map((value, subIndex) => (
                    <td
                      key={subIndex}
                      className={clsx("border-y border-green-900", {
                        "rounded-l-xl border-l": subIndex === 0,
                        "rounded-r-xl border-r":
                          subIndex === attribute.length - 1,
                      })}
                    >
                      {value === true ? (
                        <div className="py-2 md:py-4 px-4">
                          <Action
                            handleView={() => handleView(item)}
                            handleDelete={() => handleDelete(item)}
                            handleEdit={() => handleEdit(item)}
                          />
                        </div>
                      ) : (
                        <div className="py-2 md:py-4 px-4 truncate max-w-[200px]">
                          {value}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Modal
        showModal={showModalView}
        closeModal={() => setShowModalView(!showModalView)}
      >
        <h2 className="font-bold h2 text-base md:text-lg text-gray-900 pb-3 md:pb-4 break-words">
          Details <span className="text-green-700">{modalValue?.label}</span>
        </h2>
        <div className="space-y-3 text-sm md:text-base">
          {attribute?.map(
            (item, index) =>
              item?.label !== "Action" && (
                <div key={index} className="flex space-x-2">
                  <div className="font-semibold w-1/3 break-words">
                    {item?.label}
                  </div>
                  <div>:</div>
                  <div className="w-2/3 break-words text-gray-500">
                    {Object.values(modalValue)[index]}
                  </div>
                </div>
              )
          )}
        </div>
      </Modal>

      <Modal
        showModal={showModalDelete}
        closeModal={() => setShowModalDelete(!showModalDelete)}
      >
        <h2 className="font-bold h2 text-base md:text-lg text-gray-900 pb-3 md:pb-4 break-words">
          You want to delete{" "}
          <span className="text-green-700">{modalValue?.label}</span> data
        </h2>
        <div className="space-y-3 text-sm md:text-base">
          {attribute?.map(
            (item, index) =>
              item?.label !== "Action" && (
                <div key={index} className="flex space-x-2">
                  <div className="font-semibold w-1/3 break-words">
                    {item?.label}
                  </div>
                  <div>:</div>
                  <div className="w-2/3 break-words text-gray-500">
                    {Object.values(modalValue)[index]}
                  </div>
                </div>
              )
          )}
        </div>
        <p className="text-base text-center pt-5 md:pt-10 font-semibold">
          Are you sure you want to proceed with the deletion?
        </p>
        <div className="py-2 md:py-3">
          <Input
            placeholder={`Type '${modalValue?.nodeId}' to continue process`}
            value={deleteValue}
            onChange={(e) => setDeleteValue(e.target.value)}
            error={deleteMessage}
          />
        </div>
        <div className="flex justify-center pt-2 space-x-4">
          <button
            onClick={() => deleteItem(modalValue?.nodeId)}
            className="bg-red-400 py-2 px-8 rounded-full text-sm md:text-base font-medium hover:bg-red-500 transition-colors duration-300 shadow-md"
          >
            Yes
          </button>
          <button className="border-gray-200 border py-2 px-8 rounded-full text-sm md:text-base font-medium hover:bg-gray-200 transition-colors duration-300 shadow-md">
            Cancel
          </button>
        </div>
      </Modal>

      <Modal
        showModal={showModalEdit}
        closeModal={() => setShowModalEdit(!showModalEdit)}
      >
        <EditForm attribute={attribute} modalValue={modalValue} />
      </Modal>
    </>
  );
}
