import React from 'react';
import { getTradisionalUse } from '@/api/reasonings';
import BarChartTopPlant from './BarChartPlant';
import BarChartTopTraditionalUse from './BarChartTraditionalUse';
import Maps from './Maps';

async function page({plantName}) {
  const data = await getTradisionalUse(plantName)
  const traditionalUse = data ? Object.values(data.data) : null;
  return (
    <div className='bg-gray-100 w-full h-full pt-14'>
      <div className='bg-white md:w-[60%] lg:w-[50%] w-[95%] rounded-xl justify-center mx-auto '>
        <h1 className='text-gray-800 font-bold text-2xl pt-9 pl-4'>Traditional Use</h1>
        <div className='mt-7'>
          <div className='flex justify-between'>
            <div className='w-[45%] ml-4'>
              <h1 className='font-semibold text-lg'>Top Plant</h1>
              <BarChartTopPlant />
              {/* <div className='bg-gray-900 text-white h-[250px]'>
                grafik 1
              </div> */}
            </div>
            <div className=' w-[45%] mr-4'>
              <h1 className='font-semibold text-lg'>Top Traditional Use</h1>
              <BarChartTopTraditionalUse />
              {/* <div className='bg-green-900 text-white h-[250px]'>
                grafik 2
              </div> */}
            </div>
          </div>
          {/* <div className='mt-7 px-4'>
            <span className='font-bold text-slate-900'>Description :</span> <span className='text-slate-700'>Top Plants and Top Traditional Uses refer to the most frequently used plants and traditional medicinal methods.</span>
          </div> */}
          <div className='mt-14'>
            <h1 className='text-center font-bold text-xl text-[#335230] mb-5'>Mapping the Locations of Traditional Medicine Use</h1>
            <Maps/>
          </div>
          <div className='mt-14 text-center font-bold text-xl text-[#335230]'>
            Details of Traditional Use
          </div>
          <div className='mt-5 overflow-x-scroll mx-2'>
            {traditionalUse?.length > 0 ? (
            <table className='text-sm text-left text-gray-500  border-spacing-y-4 border-spacing-x-4 min-w-max '>
              <thead className='bg-[#50744C] text-white text-center '>
                <tr>
                  <th className='sticky top-0 border w-10 h-10 '>No</th>
                  <th className='sticky top-0 border w-28'>Plant</th>
                  <th className='sticky top-0 border w-28'>Plant Part</th>
                  <th className='sticky top-0 border w-28'>Traditional Use</th>
                  <th className='sticky top-0 border w-28'>Method of Use</th>
                  <th className='sticky top-0 border w-28'>Ethnic</th>
                  <th className='sticky top-0 border w-36'>Location</th>
                  <th className='sticky top-0 border w-40'>Reference</th>
                  <th className='sticky top-0 border w-28'>User</th>
                </tr>
              </thead>
              <tbody>
              {traditionalUse.map((item, index) =>(
                <tr key={index}>
                  <td className='items-center justify-center px-3 border border-y-[#50744C]  '>{index+1}</td>
                  <td className='border text-center border-y-[#50744C]'>{item?.plant?.properties?.label || '-'}</td>
                  <td className='border text-center border-y-[#50744C]'>{item?.plant_part?.properties?.label || '-'}</td>
                  <td className='border text-center border-y-[#50744C]'>{item?.traditional_use?.properties?.label || '-'}</td>
                  <td className='border text-center border-y-[#50744C]'>{item?.method_of_use?.properties?.label || '-'}</td>
                  <td className='border text-center border-y-[#50744C]'>{item?.ethnic?.properties?.label || '-'}</td>
                  <td className='border text-center border-y-[#50744C]'>
                    <p>Kelurahan desa {item.location.properties.kel_desa || "-"} berada di kecamatan {item.location.properties.kecamatan || "-"},
                       kabupaten {item.location.properties.kab_kota || "-"}, provinsi {item.location.properties.provinsi || "-"}, 
                       dengan koordinat lintang {item.location.properties.lat || "-"} dan bujur {item.location.properties.long || "-"}</p></td>
                  <td className='border text-center border-y-[#50744C]'>{item?.reference?.properties?.label || '-'}</td>
                  <td className='border text-center border-y-[#50744C]'>{item?.user?.properties?.fullname|| '-'}</td>
                </tr>
              ) 
              )}
              </tbody>
            </table>
            ): (<h1>Data kosong!</h1>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page