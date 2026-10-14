import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='md:h-[370px] md:pl-5 lg:pl-10 xl:pl-0 w-full xl:h-[250px] lg:h-[375px] h-[700px] sm:h-[580px] bg-gradient-to-b from-[#5C8359] to-[#274931]'>
      <div className='md:flex pt-7 pl-6 text-white'>
        <div>
          <Image src="/assets/images/logoIlmuKomputer.png" width={280} height={280} alt='logo-Ilmu-Komputer' className='-ml-1 xl:ml-3' />
          <div className='flex md:inline-block xl:flex mt-4 xl:ml-4'>
            <div>
              <h1 className='font-bold pt-3 sm:pt-0 mb-2'>Address</h1>
              <h1 className='md:w-[330px] lg:w-[300px] sm:w-[280px] w-[170px] text-[12px] sm:text-[14px] leading-6'>Wing 20, Jl. Meranti Kampus IPB Level 5,
                Babakan, Kec. Dramaga, Kabupaten Bogor, Jawa Barat 16680
              </h1>
            </div>
            <div className='sm:ml-10 md:ml-0 md:mt-4 xl:mt-0 xl:ml-5'>
              <h1 className='font-bold pt-3 sm:pt-0 pl-4 sm:pl-0 mb-2 '>Contact</h1>
              <h1 className='text-[12px] sm:text-[14px] mb-1 pl-4 sm:pl-0'>ilkom@apps.ipb.ac.id</h1>
              <h1 className='text-[12px] sm:text-[14px] pl-4 sm:pl-0'>(0251) 8625584</h1>
            </div>
          </div>
        </div>
        <div className='lg:ml-28 md:ml-20 mt-10  md:mt-0'>
          <Image src="/assets/images/logoBiofarmaka.png" width={145} height={145} alt='logo-Ilmu-Komputer' className='-ml-1' />
          <div className='xl:flex'>
            <div className='flex mt-4'>
              <div>
                <h1 className='font-bold pt-3 sm:pt-0 mb-2'>Address</h1>
                <h1 className='md:w-[330px]  lg:w-[300px] sm:w-[280px] w-[170px] text-[12px] sm:text-[14px] leading-6'>CRC Building, 2nd Floor, STP Area
                  IPB Taman Kencana Campus, Taman Kencana St. No. 3, Bogor, 16128
                </h1>
              </div>
              <div className='w-[200px] xl:ml-0 lg:ml-10  ml-4 sm:ml-10 mt-3 md:ml-0 md:mt-0'>
                <h1 className='font-bold mb-2 '>Contact</h1>
                <h1 className='text-[12px] sm:text-[14px] mb-1'>Phone: +62 251 8373561</h1>
                <h1 className='text-[12px] sm:text-[14px] mb-1'>Fax: +62 251 8347525</h1>
                <h1 className='text-[12px] sm:text-[14px] mb-1'>Mobile: +62 812-8868-1757</h1>
              </div>
            </div>
            <div className='xl:ml-0 lg:ml-0 sm:mt-5 xl:mt-3 xl:pl-4'>
              <h1 className='font-bold pt-7 sm:pt-0 sm:pl-0 mb-2 '>Email dan Website</h1>
              <h1 className='text-[12px] sm:text-[14px] mb-1 sm:pl-0'>bfarmaka[a]gmail.com</h1>
              <h1 className='text-[12px] sm:text-[14px] mb-1 sm:pl-0'>tropbrc[a]apps.ipb.ac.id</h1>
              <Link href='http://biofarmaka.ipb.ac.id'><h1 className='text-[13px] sm:text-[14px] sm:pl-0'>http://biofarmaka.ipb.ac.id</h1></Link>
            </div>
          </div>
        </div>
      </div>
      <hr className='mt-5' />
      <h1 className=' sm:pl-0 mt-7 sm:mt-1 text-[13px] sm:text-[14px] text-slate-100 text-center mb-2 sm:mb-0'>© 2024. Tropical Biopharmaca Research Center & Computer Science Department IPB </h1>
    </div>
  )
}
