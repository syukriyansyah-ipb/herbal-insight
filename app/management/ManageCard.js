import Link from "next/link";
import { sidebarItem } from "@/constans";

function ManageCard() {
  const colorstyles = [{ bg: "bg-green-500" }, { bg: "bg-blue-500" }, { bg: "bg-purple-500" }, { bg: "bg-pink-500" }, { bg: "bg-lime-500" }];
  return (
    <div className="py-5 md:py-10">
      <p className="text-lg md:text-xl font-medium">Start managing</p>
      <div className="py-3 md:py-5 flex flex-wrap flex-col sm:flex-row">
        {sidebarItem.slice(2).map((item, index) => (
          <Link href={item.url} key={index}>
            <div className="flex flex-row bg-white w-full sm:w-48 shadow-md rounded-lg py-3 sm:py-16 items-center justify-start pl-3 sm:pl-0 sm:justify-center sm:flex-col space-y-3 sm:hover:translate-x-0 hover:translate-x-3 sm:hover:-translate-y-3 transition-all duration-300 mr-5 mb-2 sm:mb-5">
              <div className={`${colorstyles[index % colorstyles.length].bg} rounded-md bg-opacity-10 mr-4 sm:mr-0`}>
                <item.Icon className={`text-3xl md:text-5xl m-2 text-gray-700`} />
              </div>
              <h2 className="h2 text-sm md:text-base font-semibold text-gray-900">
                {item?.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ManageCard;
