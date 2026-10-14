import { addEthnic } from '@/api/contributor';
import React, { useRef } from 'react'
import { mutate } from 'swr'

const FormEthnic = ({ isVisible, onClose }) => {
    const formRef = useRef(null);
    const handleAction = async (formData) => {
        try {
            const data = {
                label: formData.get('label'),
                province : formData.get('province')
            }
            await addEthnic(data)
            formRef.current.reset()
            await mutate(`/contributor`)
            onClose()

        } catch (error) {
            console.log(error);
        }

    }
    if (!isVisible) return null;
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25
                      backdrop-blur-sm flex justify-center '>
            <div className='sm:w-[55%] w-[85%] flex flex-col mt-16'>
                <button className='text-white text-xl place-self-end'
                    onClick={() => onClose()}
                >
                    X
                </button>

                <div className='bg-white p-2 rounded px-6 py-6 text-left'>
                    <h3 className='text-xl mb-4 font-semibold text-gray-900'>Create Ethnic</h3>
                    <form className='space-y-6' action={handleAction} ref={formRef}>
                        <div>
                            <label>Label</label>
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
                            <label>Province</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input Province"
                                    name="province"
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
        </div>
    )
}

export default FormEthnic