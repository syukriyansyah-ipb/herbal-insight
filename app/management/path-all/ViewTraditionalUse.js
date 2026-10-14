import React from 'react'

const ViewTraditionalUse = ({ isVisible, onClose, data }) => {
    // Jika isVisible false, maka tidak perlu menampilkan komponen
    if (!isVisible) return null;

    // Jika data tidak ada, tampilkan pesan bahwa data tidak ditemukan
    if (!data) return <div>Data not found</div>;

    // Tampilkan detail item berdasarkan data yang diterima



    return (
        <div className='fixed inset-0 bg-black bg-opacity-25
    backdrop-blur-sm flex justify-center '>
            <div className='sm:w-[55%] w-[70%] flex flex-col mt-4 h-[92%]'>
                <button className='text-white text-xl place-self-end'
                    onClick={() => onClose()}
                >
                    X
                </button>

                <div className='bg-white p-2 rounded-xl px-10 py-10 text-left overflow-auto'>
                    <h3 className='text-xl mb-4 font-semibold text-gray-900'>Traditional Use Details</h3>
                    <div className="mb-4 flex-row mt-7 ">
                        <div>
                            <h1 className='font-semibold text-gray-900 '>Plant : </h1>
                            <div className=' text-gray-600 font-medium pl-7'>
                                <p>ID : {data.Plant.properties.id || "-"}</p>
                                <p>Rank : {data.Plant.properties.rank || "-"}</p>
                                <p>Label : {data.Plant.properties.label || "-"}</p>
                                <p>Taxonomic Status : {data.Plant.properties.taxonomicStatus || "-"}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h1 className='font-semibold text-gray-900 '>PlantPart : </h1>
                            <div className=' text-gray-600 font-medium pl-7'>
                                <p>ID : {data.PlantPart.properties.id || "-"}</p>
                                <p>Label : {data.PlantPart.properties.label || "-"}</p>
                                <p>Label (IDN) : {data.PlantPart.properties['label@id'] || "-"}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h1 className='font-semibold text-gray-900 '>Traditional Use : </h1>
                            <div className=' text-gray-600 font-medium pl-7'>
                                <p>ID : {data.TraditionalUse.properties.id || "-"}</p>
                                <p>Label : {data.TraditionalUse.properties.label || "-"}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h1 className='font-semibold text-gray-900 '>Method of Use : </h1>
                            <div className=' text-gray-600 font-medium pl-7'>
                                <p>ID : {data.MethodOfUse.properties.id || "-"}</p>
                                <p>Label : {data.MethodOfUse.properties.label || "-"}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h1 className='font-semibold text-gray-900 '>Ethnic : </h1>
                            <div className=' text-gray-600 font-medium pl-7'>
                                <p>ID : {data.Ethnic.properties.id || "-"}</p>
                                <p>Label : {data.Ethnic.properties.label || "-"}</p>
                                <p>Province : {data.Ethnic.properties.province || "-"}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h1 className='font-semibold text-gray-900 '>Location : </h1>
                            <div className=' text-gray-600 font-medium pl-7'>
                                <p>ID : {data.Location.properties.id || "-"}</p>
                                <p>Kelurahan : {data.Location.properties.kel_desa || "-"}</p>
                                <p>kecamatan : {data.Location.properties.kecamatan || "-"}</p>
                                <p>kabupaten/Kota : {data.Location.properties.kab_kota || "-"}</p>
                                <p>Provinsi : {data.Location.properties.provinsi || "-"}</p>
                                <p>Lintang : {data.Location.properties.lat || "-"}</p>
                                <p>Bujur : {data.Location.properties.long || "-"}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h1 className='font-semibold text-gray-900 '>Reference : </h1>
                            <div className=' text-gray-600 font-medium pl-7'>
                                <p>ID : {data.Reference.properties.id || "-"}</p>
                                <p>Label : {data.Reference.properties.label || "-"}</p>
                                <p>URL : {data.Reference.properties.url || "-"}</p>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <h1 className='font-semibold text-gray-900 '>User : </h1>
                            <div className=' text-gray-600 font-medium pl-7'>
                                <p>ID : {data.User.properties.id || "-"}</p>
                                <p>Username : {data.User.properties.fullname || "-"}</p>
                                <p>Email : {data.User.properties.username || "-"}</p>
                                <p>Role : {data.User.properties.role || "-"}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default ViewTraditionalUse