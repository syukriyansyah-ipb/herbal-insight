import { addLocation } from '@/api/contributor';
import { useSession } from 'next-auth/react';
import React, { useRef, useState } from 'react'
import { mutate } from 'swr'

const FormLocation = ({ isVisible, onClose }) => {
  const { data: session } = useSession();

  const [form, setForm] = useState({
    user_id: session?.user?.username || '' // Mengambil username dari session sebagai default
  });
  const formRef = useRef(null);
  const handleAction = async (formData) => {
    try {
      const data = {
        kel_desa: formData.get('kel_desa'),
        kecamatan: formData.get('kecamatan'),
        kab_kota: formData.get('kab_kota'),
        provinsi: formData.get('provinsi'),
        lat: formData.get('lat'),
        long: formData.get('long'),
        user_id: form.user_id || session?.user?.user_id,
      }
      await addLocation(data)
      formRef.current.reset()
      await mutate(`/location`)
      onClose()

    } catch (error) {
      console.log(error);
    }

  }
  if (!isVisible) return null;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-25
                      backdrop-blur-sm flex justify-center '>
      <div className='sm:w-[55%] w-[85%] flex flex-col mt-5 h-[95%]'>
        <button className='text-white text-xl place-self-end'
          onClick={() => onClose()}
        >
          X
        </button>

        <div className='bg-white p-2 rounded px-6 py-6 text-left overflow-auto'>
          <h3 className='text-xl mb-4 font-semibold text-gray-900'>Create Location</h3>
          <form className='space-y-6' action={handleAction} ref={formRef}>
            <div>
              <label>Kelurahan</label>
              <div>
                <input
                  type="text"
                  placeholder="Input Kelurahan"
                  name="kel_desa"
                  className='block w-full mb-2 text-sm text-gray-900
                        focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                        py-1.5 rounded-sm border border-slate-300'
                />
              </div>
            </div>
            <div>
              <label>Kecamatan</label>
              <div>
                <input
                  type="text"
                  placeholder="Input Kecamatan"
                  name="kecamatan"
                  className='block w-full mb-2 text-sm text-gray-900
                        focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                        py-1.5 rounded-sm border border-slate-300'
                />
              </div>
            </div>
            <div>
              <label>Kabupaten</label>
              <div>
                <input
                  type="text"
                  placeholder="Input Kabupaten"
                  name="kab_kota"
                  className='block w-full mb-2 text-sm text-gray-900
                        focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                        py-1.5 rounded-sm border border-slate-300'
                />
              </div>
            </div>
            <div>
              <label>Provinsi</label>
              <div>
                <input
                  type="text"
                  placeholder="Input Provinsi"
                  name="provinsi"
                  className='block w-full mb-2 text-sm text-gray-900
                        focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                        py-1.5 rounded-sm border border-slate-300'
                />
              </div>
            </div>
            <div>
              <label>Lintang</label>
              <div>
                <input
                  type="text"
                  placeholder="Input Lintang"
                  name="lat"
                  className='block w-full mb-2 text-sm text-gray-900
                        focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                        py-1.5 rounded-sm border border-slate-300'
                />
              </div>
            </div>
            <div>
              <label>Bujur</label>
              <div>
                <input
                  type="text"
                  placeholder="Input Bujur"
                  name="long"
                  className='block w-full mb-2 text-sm text-gray-900
                        focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                        py-1.5 rounded-sm border border-slate-300'
                />
              </div>
            </div>
            <div className='flex'>
              <label>User</label>
              <div className='text-center mt-7 -ml-8'>
                <input
                  disabled
                  className=" w-full text-slate-600 text-sm"
                  type="text"
                  name="user_id"
                  value={form.user_id || session?.user?.user_id}
                  onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                />
              </div>
            </div>
            <button
              type="submit"
              className='w-full text-white bg-green-800 hover:bg-green-900 
                      focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
                      rounded-lg text-sm px-5 py-2.5 text-center'>Save</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FormLocation