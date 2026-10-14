import { insertPlantName } from '@/api/plantName'
import React, { useRef, useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { mutate } from 'swr'

const FormScientific = ({ isVisible, onClose }) => {
    const formRef = useRef(null)
    const [succesInputData, setSuccesInputData] = useState(false);  // State untuk menampilkan popup
    const handleAction = async (formData) => {
        try {
            const data = {
                // id: formData.get('id'),
                label: formData.get('label'),
                authorship: formData.get('authorship'),
                taxonomicStatus: formData.get('taxonomicStatus'),
                xrefs: formData.get('xrefs'),
            }
            await insertPlantName(data)
            // Menampilkan popup keberhasilan
            setSuccesInputData(true);
            // alert('Data berhasil disimpan!');

            setTimeout(() => {
                formRef.current.reset();
                onClose();
            }, 2000);
        } catch (error) {
            console.log(error);
        }

    }

    if (!isVisible) return null;
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25
    backdrop-blur-sm flex justify-center '>
            <div className='sm:w-[55%] w-[70%] flex flex-col mt-16'>
                <button className='text-white text-xl place-self-end'
                    onClick={() => onClose()}
                >
                    X
                </button>

                <div className='bg-white p-2 rounded px-6 py-6 text-left'>
                    <h3 className='text-xl mb-4 font-semibold text-gray-900'>Create Scientific Names</h3>
                    <form className='space-y-6' action={handleAction} ref={formRef}>
                        {/* <div>
                            <label>Scientific Names (ID)</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input ID (E.g: SNPL-1234567)"
                                    name="id"
                                    className='block w-full mb-2 text-sm text-gray-900
                                focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                                py-1.5 rounded-sm border border-slate-300'
                                />
                            </div>
                        </div> */}
                        <div>
                            <label>Scientific Names Label</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input Label"
                                    name="label"
                                    className='block w-full mb-2 text-sm text-gray-900
                                focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                                py-1.5 rounded-sm border border-slate-300'
                                />
                            </div>
                        </div>
                        <div>
                            <label>Authorship</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input Authorship"
                                    name="authorship"
                                    className='block w-full mb-2 text-sm text-gray-900
                                focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                                py-1.5 rounded-sm border border-slate-300'
                                />
                            </div>
                        </div>
                        <div>
                            <label>Status</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input Status"
                                    name="taxonomicStatus"
                                    className='block w-full mb-2 text-sm text-gray-900
                                focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                                py-1.5 rounded-sm border border-slate-300'
                                />
                            </div>
                        </div>
                        <div>
                            <label>xrefs</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input xrefs"
                                    name="xrefs"
                                    className='block w-full mb-2 text-sm text-gray-900
                            focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                            py-1.5 rounded-sm border border-slate-300'
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
            {succesInputData && (
                <div className="fixed top-0 left-0 w-full h-full flex items-top mt-5 justify-center z-50">
                    <div className="flex flex-col gap-4 w-80 sm:w-[325px] text-[10px] sm:text-xs">
                        <div className="success-alert cursor-default flex items-center justify-between w-full h-[100px] rounded-lg bg-[#F0E1C6] px-[20px]">
                            <div className="text-[#F5F5F5] bg-green-900 p-2 rounded-lg flex justify-center items-center">
                                <IoMdCheckmarkCircleOutline className="text-white text-[42px]" />
                            </div>
                            <div className="-ml-6">
                                <p className="text-[#2C6B3F] font-bold text-[14px] sm:text-[15px] sm:mb-2">Data successfully added!</p>
                                <p className="text-[#4A4A4A] text-[13px] sm:text-[14px] ">Data has been successfully added.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FormScientific