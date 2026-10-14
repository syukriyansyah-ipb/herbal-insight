import React from 'react'

const ViewLocal = ({ isVisible, onClose, data }) => {
    // Jika isVisible false, maka tidak perlu menampilkan komponen
    if (!isVisible) return null;

    // Jika data tidak ada, tampilkan pesan bahwa data tidak ditemukan
    if (!data) return <div>Data not found</div>;

    // Tampilkan detail item berdasarkan data yang diterima
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25
    backdrop-blur-sm flex justify-center '>
            <div className='sm:w-[55%] w-[70%] flex flex-col sm:mt-5 mt-3'>
                <button className='text-white text-xl place-self-end'
                    onClick={() => onClose()}
                >
                    X
                </button>

                <div className='bg-white p-2 rounded-xl px-10 py-10 text-left'>
                    <h3 className='text-xl mb-4 font-semibold text-gray-900'>Local Name Details ({data.properties.id})</h3>
                    <div className="mb-4 sm:flex mt-7">
                        <h1 className='font-semibold text-gray-900'>Local Names(ID)</h1>
                        <div className=' text-gray-600 sm:pl-10'>: {data.properties.id}</div>
                    </div>
                    <div className="mb-4 sm:flex">
                        <h1 className='font-semibold text-gray-900'>Local Names Label</h1>
                        <div className=' text-gray-600 sm:pl-6'>: {data.properties.label}</div>
                    </div>
                    <div className="mb-4 sm:flex">
                        <h1 className='font-semibold text-gray-900'>Refs</h1>
                        <div className=' text-gray-600 sm:pl-[130px]'>: {data.properties.refs}</div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ViewLocal
