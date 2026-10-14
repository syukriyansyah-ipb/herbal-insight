import { PiPlantFill } from "react-icons/pi";
export default function LoadingPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <PiPlantFill className="text-green-900 animate-bounce text-5xl md:text-6xl"/>
      <div className="mt-2 text-sm md:text-base">Loading...</div>
    </div>
  )
}
