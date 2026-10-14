import Image from "next/image";
import CustomButton from "./CustomButton";
import { AiOutlineLoading } from "react-icons/ai";
import NoImage from "@/public/assets/images/error-plant.webp";

export default function Card({
  img,
  title,
  description,
  button,
  isLoading,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white h-full rounded-lg shadow-md p-5 space-y-3 md:space-y-5 hover:scale-105"
    >
      {isLoading !== true ? (
        <Image
          src={img ? img : NoImage}
          onError={NoImage}
          height={192}
          width={250}
          objectFit="cover"
          className="h-48 w-full object-cover rounded-lg"
          alt={title}
        />
      ) : (
        <div className="h-48 w-full object-cover rounded-lg flex justify-center items-center border">
          <AiOutlineLoading className="text-4xl text-green-700 animate-spin" />
        </div>
      )}
      <div className="space-y-1 md:space-y-2">
        <h3 className="text-sm md:text-base font-semibold text-gray-900">
          {title}
        </h3>
        <div className="text-[11px] md:text-sm text-gray-600">
          {description}
        </div>
      </div>
      <div className="w-full flex justify-end">
        <CustomButton text={button} onClick={onClick} />
      </div>
    </div>
  );
}
