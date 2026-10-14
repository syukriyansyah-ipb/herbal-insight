import { updateLocation } from '@/api/location';
import React, { useRef, useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';

const UpdateLocation = ({ isVisible, onClose, data }) => {
    const formRef = useRef(null);
    const [succesUpdateData, setSuccesUpdateData] = useState(false);
    const handleAction = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);

        try {
            const updateData = {
                id: data.Location.properties.id,
                kel_desa: formData.get('kel_desa'),
                kecamatan: formData.get('kecamatan'),
                kab_kota: formData.get('kab_kota'),
                provinsi: formData.get('provinsi'),
                lat: formData.get('lat'),
                long: formData.get('long'),
                user_id: formData.get('user_id'),
                // status: formData.get('status'),
            }
            await updateLocation(updateData)
            setSuccesUpdateData(true);
            setTimeout(() => {
                formRef.current.reset();
                onClose();
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
    if (!isVisible) return null;
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25
                        backdrop-blur-sm flex justify-center '>
            <div className='sm:w-[55%] w-[70%] flex flex-col mt-5 h-[90%] overflow-auto'>
                <button className='text-white text-xl place-self-end'
                    onClick={() => onClose()}
                >
                    X
                </button>

                <div className='bg-white p-2 rounded px-6 py-6 text-left'>
                    <h3 className='text-xl mb-4 font-semibold text-gray-900'>Edit Location({data.Location.properties.id})</h3>
                    <form className='space-y-6' onSubmit={handleAction} ref={formRef}>
                        <div>
                            <label>Location (ID)</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input ID"
                                    name="id"
                                    defaultValue={data.Location.properties.id}
                                    readOnly
                                    className='block w-full mb-2 text-sm text-gray-900
                          focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                          py-1.5 rounded-sm border border-slate-300'
                                />
                            </div>
                        </div>
                        <div>
                            <label>Kelurahan</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input Kelurahan"
                                    name="kel_desa"
                                    defaultValue={data.Location.properties.kel_desa}
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
                                    defaultValue={data.Location.properties.kecamatan}
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
                                    defaultValue={data.Location.properties.kab_kota}
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
                                    defaultValue={data.Location.properties.provinsi}
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
                                    defaultValue={data.Location.properties.lat}
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
                                    defaultValue={data.Location.properties.long}
                                    className='block w-full mb-2 text-sm text-gray-900
                          focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                          py-1.5 rounded-sm border border-slate-300'
                                />
                            </div>
                        </div>
                        <div>
                            <label>User ID</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input User ID"
                                    name="user_id"
                                    defaultValue={data.User.properties.id}
                                    className='block w-full mb-2 text-sm text-gray-900
                          focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                          py-1.5 rounded-sm border border-slate-300'
                                />
                            </div>
                        </div>
                        {/* <div>
                            <label>Status</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input User ID"
                                    name="status"
                                    defaultValue={data.CREATED_BY.properties.status}
                                    className='block w-full mb-2 text-sm text-gray-900
                          focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                          py-1.5 rounded-sm border border-slate-300'
                                />
                            </div>
                        </div> */}
                        <button
                            type="submit"
                            className='w-full text-white bg-green-800 hover:bg-green-900 
                        focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
                        rounded-lg text-sm px-5 py-2.5 text-center'>Save</button>
                    </form>
                </div>
            </div>
            {succesUpdateData && (
                <div className="fixed top-0 left-0 w-full h-full flex items-top mt-5 justify-center z-50">
                    <div className="flex flex-col gap-4 w-80 sm:w-[325px] text-[10px] sm:text-xs">
                        <div className="success-alert cursor-default flex items-center justify-between w-full h-[100px] rounded-lg bg-[#F0E1C6] px-[20px]">
                            <div className="text-[#F5F5F5] bg-green-900 p-2 rounded-lg flex justify-center items-center">
                                <IoMdCheckmarkCircleOutline className="text-white text-[42px]" />
                            </div>
                            <div className="-ml-6">
                                <p className="text-[#2C6B3F] font-bold text-[14px] sm:text-[15px] sm:mb-2">Success!</p>
                                <p className="text-[#4A4A4A] text-[13px] sm:text-[14px] ">Data has been successfully updated.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UpdateLocation