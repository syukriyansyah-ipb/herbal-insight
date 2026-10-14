"use client";
import Image from "next/image";
import { Card } from "@/components";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FaHistory } from "react-icons/fa";
import { CustomButton } from "@/components";
import { dateFormat } from "@/helpers/currentTime";
import empty from "@/public/assets/images/empty.svg";

function History() {
  const router = useRouter();
  const HISTORY = useSelector((state) => state.history);
  const sortedHistory = HISTORY.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
  return (
    <div className="min-h-screen flex items-center flex-col px-3 py-10 md:pt-28 pt-28">
      <div className="md:w-1/2 w-full">
        <div className="flex items-center space-x-3">
          <FaHistory className="text-xl md:text-2xl text-gray-800" />
          <h2 className="h2 font-bold text-xl md:text-2xl text-gray-800">
            Recently Viewed
          </h2>
        </div>
        <div className="space-y-10 py-10">
          {HISTORY.length < 1 ? (
            <div className="w-full flex flex-col justify-center items-center">
              <Image
                src={empty}
                alt="Not Found"
                priority={false}
                className="h-full w-96 object-cover"
              />
              <h2 className="text-base md:text-lg font-medium text-gray-900 pb-4 md:pb-6 text-center">
                Looks like you haven't explored
                <br />
                our collection of medicinal plants
              </h2>
              <CustomButton
                text="Start Explore"
                onClick={() => router.push("/plants")}
              />
            </div>
          ) : (
            sortedHistory.map((item) => (
              <div key={item.date}>
                <h3 className="h3 font-semibold text-lg md:text-xl text-gray-800">
                  {item.date === dateFormat() ? "Today" : item.date}
                </h3>
                <div className="flex justify-start space-x-5 overflow-x-auto py-5">
                  {item.items.map((plant) => (
                    <div className="md:min-w-96 min-w-64" key={plant.plant}>
                      <Card button="Explore Again" title={plant.plant} img={plant?.url}/>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default History;
