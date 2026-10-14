import { updatePlantPart } from '@/api/plantPart';
import React, { useRef } from 'react'

const UpdatePlantPart = ({ isVisible, onClose, data }) => {
    const formRef = useRef(null);
    const handleAction = async (e) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);

        try {
            const updateData = {
                id: data.properties.id,
                label: formData.get('label'),
                'label@id': formData.get('label@id'),
            }
            await updatePlantPart(updateData)
            onClose();
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
                    <h3 className='text-xl mb-4 font-semibold text-gray-900'>Edit Plant Part({data.properties.id})</h3>
                    <form className='space-y-6' onSubmit={handleAction} ref={formRef}>
                        <div>
                            <label>Plant Part (ID)</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input ID"
                                    name="id"
                                    defaultValue={data.properties.id}
                                    readOnly
                                    className='block w-full mb-2 text-sm text-gray-900
                          focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                          py-1.5 rounded-sm border border-slate-300'
                                />
                            </div>
                        </div>
                        <div>
                            <label>Plant Part Label</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input Label"
                                    name="label"
                                    defaultValue={data.properties.label}
                                    className='block w-full mb-2 text-sm text-gray-900
                          focus:ring-2 focus:outline-none focus:ring-green-900 px-1.5 
                          py-1.5 rounded-sm border border-slate-300'
                                />
                            </div>
                        </div>
                        <div>
                            <label>Plant Part Label(IDN)</label>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Input Label"
                                    name="label@id"
                                    defaultValue={data.properties['label@id']}
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

export default UpdatePlantPart