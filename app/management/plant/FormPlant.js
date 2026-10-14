"use client";
import useForm from "@/helpers/useForm";
import { addPlant } from "@/api/plants";
import { useState } from "react";
import { Input, Modal, CustomButton } from "@/components";
import Image from "next/image";
import Failed from "@/public/assets/images/failed.webp";
import Success from "@/public/assets/images/success.webp";

export default function FormPlant({ title, closeForm }) {
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [{ id, label, rank, taxonomicStatus, refs, xrefs }, setState] = useForm(
    {
      id: "",
      label: "",
      rank: "",
      taxonomicStatus: "",
      refs: "",
      xrefs: "",
    }
  );

  function submit(e) {
    e.preventDefault();

    addPlant({ id, label, rank, taxonomicStatus, refs, xrefs })
      .then((res) => {
        if (res?.detail === "CREATED_SUCCESFULLY") {
          setIsSuccess(true);
        }
        if (res.ok) {
          setIsSuccess(true);
        }
      })
      .catch((err) => {
        setIsError(true);
      });
  }

  return (
    <div>
      <h2 className="font-bold h2 text-base md:text-xl text-gray-900 pb-3 md:pb-4 break-words">
        {title}
      </h2>
      <form onSubmit={submit}>
        <div className="space-y-2 md:space-y-4 text-sm md:text-base">
          <Input
            name="id"
            placeholder="id"
            style="border-gray-300 rounded-md"
            label="Id"
            onChange={setState}
            value={id}
          />

          <Input
            name="label"
            placeholder="label"
            style="border-gray-300 rounded-md"
            label="Label"
            onChange={setState}
            value={label}
          />

          <Input
            name="rank"
            placeholder="rank"
            style="border-gray-300 rounded-md"
            label="Rank"
            onChange={setState}
            value={rank}
          />

          <Input
            name="taxonomicStatus"
            placeholder="taxonomicStatus"
            style="border-gray-300 rounded-md"
            label="Taxonomic Status"
            onChange={setState}
            value={taxonomicStatus}
          />

          <Input
            name="refs"
            placeholder="refs"
            style="border-gray-300 rounded-md"
            label="Refs"
            onChange={setState}
            value={refs}
          />

          <Input
            name="xrefs"
            placeholder="xrefs"
            style="border-gray-300 rounded-md"
            label="Xrefs"
            onChange={setState}
            value={xrefs}
          />
        </div>
        <p className="text-sm md:text-base text-center pt-5 md:pt-10 font-semibold">
          Are you sure want to {title}?
        </p>
        <div className="flex justify-center pt-2 space-x-4">
          <button
            type="submit"
            className="bg-yellow-400 py-2 px-8 rounded-full text-sm md:text-base font-medium hover:bg-orange-400 transition-colors duration-300 shadow-md"
          >
            Yes
          </button>
          <button
            onClick={closeForm}
            className="border-gray-200 border py-2 px-8 rounded-full text-sm md:text-base font-medium hover:bg-gray-200 transition-colors duration-300 shadow-md"
          >
            Cancel
          </button>
        </div>
      </form>

      <Modal showModal={isError} closeModal={() => setIsError(!isError)}>
        <div>
          <div className="flex flex-col justify-center items-center">
            <div>
              <Image
                src={Failed}
                alt="failed"
                width={200}
                height={200}
                priority
              />
            </div>
            <p className="text-base md:text-lg text-center">
              Failed to add new medicinal plants <br /> Please try again later
            </p>
          </div>
          <div className="pt-5 flex justify-center">
            <CustomButton text="Got it" onClick={() => setIsError(!isError)} />
          </div>
        </div>
      </Modal>
      <Modal showModal={isSuccess} closeModal={closeForm}>
        <div>
          <div className="flex flex-col justify-center items-center">
            <div>
              <Image
                src={Success}
                alt="failed"
                width={200}
                height={200}
                priority
              />
            </div>
            <p className="text-sm md:text-lg text-center pt-5">
              Successfully added a new medicinal plant <br />
              Thanks for your contribution!
            </p>
          </div>
          <div className="flex flex-col text-left items-center space-y-3 pt-5 md:text-base text-sm">
            <div className="flex w-full max-w-full md:max-w-[350px]">
              <div className="w-1/3 font-semibold">Id</div>
              <div className="w-2/3 text-gray-500">
                : {id || "Information was not provided"}
              </div>
            </div>
            <div className="flex w-full max-w-full md:max-w-[350px]">
              <div className="w-1/3 font-semibold">Label</div>
              <div className="w-2/3 text-gray-500">
                : {label || "Information was not provided"}
              </div>
            </div>
            <div className="flex w-full max-w-full md:max-w-[350px]">
              <div className="w-1/3 font-semibold">Rank</div>
              <div className="w-2/3 text-gray-500">
                : {rank || "Information was not provided"}
              </div>
            </div>
            <div className="flex w-full max-w-full md:max-w-[350px]">
              <div className="w-1/3 font-semibold">Taxonomic Status</div>
              <div className="w-2/3 text-gray-500">
                : {taxonomicStatus || "Information was not provided"}
              </div>
            </div>
            <div className="flex w-full max-w-full md:max-w-[350px]">
              <div className="w-1/3 font-semibold">Refs</div>
              <div className="w-2/3 text-gray-500">
                : {refs || "Information was not provided"}
              </div>
            </div>
            <div className="flex w-full max-w-full md:max-w-[350px]">
              <div className="w-1/3 font-semibold">Xrefs</div>
              <div className="w-2/3 text-gray-500">
                : {xrefs || "Information was not provided"}
              </div>
            </div>
          </div>
          <div className="pt-5 flex flex-col justify-center items-center">
            <CustomButton text="Back to Management" onClick={closeForm} />
          </div>
        </div>
      </Modal>
    </div>
  );
}
