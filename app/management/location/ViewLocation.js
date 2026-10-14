import React from 'react'

const ViewLocation = ({ isVisible, onClose, data }) => {
    // Jika isVisible false, maka tidak perlu menampilkan komponen
    if (!isVisible) return null;

    // Jika data tidak ada, tampilkan pesan bahwa data tidak ditemukan
    if (!data) return <div>Data not found</div>;

    // Tampilkan detail item berdasarkan data yang diterima



    return (
        <div className='fixed inset-0 bg-black bg-opacity-25
        backdrop-blur-sm flex justify-center '>
                <div className='sm:w-[55%] w-[70%] flex flex-col mt-3 sm:mt-5'>
                    <button className='text-white text-xl place-self-end'
                        onClick={() => onClose()}
                    >
                        X
                    </button>
    
                    <div className='bg-white p-2 rounded-xl px-10 py-10 text-left'>
                        <h3 className='text-xl mb-4 font-semibold text-gray-900'>Location Details ({data.Location.properties.id})</h3>
                        <div className="mb-4 sm:flex mt-7">
                            <h1 className='font-semibold text-gray-900'>Location (ID)</h1>
                            <div className=' text-gray-600 sm:pl-10'>: {data.Location.properties.id}</div>
                        </div>
                        <div className="mb-4 sm:flex">
                            <h1 className='font-semibold text-gray-900'>Kelurahan</h1>
                            <div className=' text-gray-600 sm:pl-[60px]'>: {data.Location.properties.kel_desa}</div>
                        </div>
                        <div className="mb-4 sm:flex">
                            <h1 className='font-semibold text-gray-900'>Kecamatan</h1>
                            <div className=' text-gray-600 sm:pl-[52px]'>: {data.Location.properties.kecamatan}</div>
                        </div>
                        <div className="mb-4 sm:flex">
                            <h1 className='font-semibold text-gray-900'>Kabupaten</h1>
                            <div className=' text-gray-600 sm:pl-[54px]'>: {data.Location.properties.kab_kota}</div>
                        </div>
                        <div className="mb-4 sm:flex">
                            <h1 className='font-semibold text-gray-900'>Provinsi</h1>
                            <div className=' text-gray-600 sm:pl-[75px]'>: {data.Location.properties.provinsi}</div>
                        </div>
                        <div className="mb-4 sm:flex">
                            <h1 className='font-semibold text-gray-900'>Lintang</h1>
                            <div className=' text-gray-600 sm:pl-[78px]'>: {data.Location.properties.lat}</div>
                        </div>
                        <div className="mb-4 sm:flex">
                            <h1 className='font-semibold text-gray-900'>Bujur</h1>
                            <div className=' text-gray-600 sm:pl-[94px]'>: {data.Location.properties.long}</div>
                        </div>
                        <div className="mb-4 sm:flex">
                            <h1 className='font-semibold text-gray-900'>User</h1>
                            <div className=' text-gray-600 sm:pl-[99px]'>: {data.User.properties.id}</div>
                        </div>
                    </div>
                </div>
            </div>

    )
}

export default ViewLocation