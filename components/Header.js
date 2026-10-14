import React from 'react'
import Image from 'next/image'

export default function Header() {
  return (
    <nav className="flex items-center absolute justify-between w-full ">
      <div className="px-3 sm:px-10">
        {/* <img src="public/logo.png" alt="logo" className="w-28 cursor-pointer "/>                */}
        <a href="/"><Image src="/assets/images/logo.png" alt="logo" className="xl:w-28 sm:w-[90px] md:w-[100px] w-[85px] cursor-pointer" width={100} height={95}/></a>
      </div>
        <ul className="flex px-5">
          <li className="inline-block text-center py-[4px] w-20 h-9 bg-green-700 text-white rounded-3xl font-semibold outline-none"><a href="../authenticate/login" class="">Manage</a></li>
        </ul>
    </nav>
  )
}
