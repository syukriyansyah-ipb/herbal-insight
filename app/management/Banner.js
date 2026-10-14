"use client"
import Image from "next/image";
import { CustomButton } from "@/components";
import { useSession } from "next-auth/react";
import Welcome from "@/public/assets/images/welcome.svg";
// // session : {
//   "user" : {
//     "username" : ,
//     "role" : ,
//     "fullname" : ,
//   },
      // token :{

      // }
// }
function Banner() {
  const { data: session, status } = useSession();
  return (
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
            Welcome to the Admin's. This is your space to
            cultivate and share your knowledge of medicinal plants.
          </p>
        </div>
        <div className="hidden sm:flex">
          <Image src={Welcome} alt="Welcome" size='200' width={200} height={200} className="w-44" />
        </div>
      </div>
  );
}

export default Banner;