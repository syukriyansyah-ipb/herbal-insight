import React, { useEffect, useRef, useState } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import { getEthnic, getLocation, getMethodOfUse, getPlant, getPlantPart, getReference, getTradisionalUse, getUser, insertTraditionalUsePathAll } from "@/api/traditionalUse";
import { useSession } from "next-auth/react";
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';

const FormTraditional = ({ isVisible, onClose }) => {
    const [plants, setPlants] = useState([]);
    const [plantPart, setPlantPart] = useState([]);
    const [traditionalUse, setTraditionalUse] = useState([]);
    const [methodOfUse, setMethodOfUse] = useState([]);
    const [ethnic, setEthnic] = useState([]);
    const [location, setLocation] = useState([]);
    const [reference, setReference] = useState([]);
    const [user, setUser] = useState([]);

    const { data: session, status } = useSession();

    const [form, setForm] = useState({
        plant_id: '',
        plant_part_id: '',
        traditional_use_id: '',
        method_of_use_id: '',
        ethnic_id: '',
        location_id: '',
        reference_id: '',
        user_id: session?.user?.username || '' // Mengambil username dari session sebagai default
    });

    const formRef = useRef(null);

    const handleGetPlants = async () => {
        try {
            const data = await getPlant();
            setPlants(data.nodes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetPlants();
    }, []);

    const handleGetPlantPart = async () => {
        try {
            const data = await getPlantPart();
            setPlantPart(data.nodes || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetPlantPart();
    }, []);

    const handleGetTraditionalUse = async () => {
        try {
            const data = await getTradisionalUse();
            setTraditionalUse(data.nodes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetTraditionalUse();
    }, []);

    const handleGetMethodOfUse = async () => {
        try {
            const data = await getMethodOfUse();
            setMethodOfUse(data.nodes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetMethodOfUse();
    }, []);

    const handleGetEthnic = async () => {
        try {
            const data = await getEthnic();
            setEthnic(data.nodes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetEthnic();
    }, []);

    const handleGetLocation = async () => {
        try {
            const data = await getLocation();
            setLocation(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetLocation();
    }, []);

    const handleGetReference = async () => {
        try {
            const data = await getReference();
            setReference(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetReference();
    }, []);

    const handleGetUser = async () => {
        try {
            const data = await getUser();
            setUser(data.nodes);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetUser();
    }, []);

    const [succesInputData, setSuccesInputData] = useState(false);  // State untuk menampilkan popup
    const [errorMessage, setErrorMessage] = useState(''); // State untuk menyimpan pesan error jika ada
    const [error, setError] = useState(''); // State untuk menyimpan pesan error jika ada
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAction = async () => {
        if (isSubmitting) return; // Mencegah pengiriman ganda
        setIsSubmitting(true);
        try {
            const data = {
                plant_id: form.plant_id,
                plant_part_id: form.plant_part_id,
                traditional_use_id: form.traditional_use_id,
                method_of_use_id: form.method_of_use_id,
                ethnic_id: form.ethnic_id,
                location_id: form.location_id,
                reference_id: form.reference_id,
                user_id: form.user_id || session?.user?.user_id,
            };
            console.log(data);

            // Menambahkan pengecekan jika ada yang belum dipilih
            if (!data.plant_id || !data.plant_part_id || !data.traditional_use_id || !data.method_of_use_id || !data.ethnic_id || !data.location_id || !data.reference_id) {
                setError(true);
                setErrorMessage('Your data is incomplete, please complete it!');
                return;
            }

            // Memasukkan data
            await insertTraditionalUsePathAll(data);

            // Menampilkan popup keberhasilan
            setSuccesInputData(true);
            // alert('Data berhasil disimpan!');
            // Reset form dan tutup modal
            setTimeout(() => {
                formRef.current.reset();
                onClose();
                // window.location.reload();
            }, 3000);
        } catch (error) {
            setError(true)
            console.log(error);
            setErrorMessage('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false); // Setel isSubmitting ke false setelah selesai
        }
    };

    const [isOpen, setIsOpen] = useState({
        plant: false,
        plantPart: false,
        traditionalUse: false,
        methodOfUse: false,
        ethnic: false,
        location: false,
        reference: false,
    });

    // Mengatur ketika item dipilih

    const handleSelectPlant = (value) => {
        console.log("Selected Plant:", value);  // Debug log
        setForm({ ...form, plant_id: value });
        setIsOpen(prevState => ({ ...prevState, plant: false }));
    };
    const handleSelectPlantPart = (value) => {
        setForm(prevForm => ({
            ...prevForm,
            plant_part_id: value
        }));
        setIsOpen(prevState => ({ ...prevState, plantPart: false }));
    };
    const handleSelectTraditionalUse = (value) => {
        setForm(prevForm => ({
            ...prevForm,
            traditional_use_id: value
        }));
        setIsOpen(prevState => ({ ...prevState, traditionalUse: false }));
    };
    const handleSelectMethodOfUse = (value) => {
        setForm({ ...form, method_of_use_id: value });
        setIsOpen(prevState => ({ ...prevState, methodOfUse: false }));
    };

    const handleSelectEthnic = (value) => {
        setForm({ ...form, ethnic_id: value });
        setIsOpen(prevState => ({ ...prevState, ethnic: false }));
    };
    const handleSelectLocation = (value) => {
        setForm({ ...form, location_id: value });
        setIsOpen(prevState => ({ ...prevState, location: false }));
    };
    const handleSelectReference = (value) => {
        setForm({ ...form, reference_id: value });
        setIsOpen(prevState => ({ ...prevState, reference: false }));
    };
    const [searchPlant, setSearchPlant] = useState('');
    const [searchPlantPart, setSearchPlantPart] = useState('');
    const [searchTraditionalUse, setSearchTraditionalUse] = useState('');
    const [searchMethodOfUse, setSearchMethodOfUse] = useState('');
    const [searchEthnic, setSearchEthnic] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchReference, setSearchReference] = useState('');
    if (!isVisible) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center'>
            <div className='sm:w-[55%] w-[85%] h-[95%] flex flex-col mt-5'>
                <button className='text-white text-xl place-self-end' onClick={() => onClose()}>
                    X
                </button>

                <div className='bg-white p-2 rounded px-6 py-6 text-left overflow-auto'>
                    <h3 className='text-xl mb-4 font-semibold text-gray-900'>Create Traditional Use</h3>
                    <form className="space-y-6" action={handleAction} ref={formRef}>
                        {/* Dropdown untuk Plant */}
                        <div>
                            <label>Plant</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full text-slate-600 text-sm -ml-1 bg-white border p-2 rounded"
                                    onClick={() => setIsOpen({ ...isOpen, plant: !isOpen.plant })}
                                >
                                    {form.plant_id
                                        ? plants.find((item) => item.properties.id === form.plant_id)?.properties.label
                                        : 'Pilih Plant'}
                                </button>

                                {isOpen.plant && (
                                    <div className="absolute w-full max-h-60 overflow-y-auto bg-white border rounded mt-1 text-sm z-10">
                                        <input
                                            type="text"
                                            placeholder="Search Plant..."
                                            className="w-full p-2 text-sm border-b border-gray-300"
                                            value={searchPlant}
                                            onChange={(e) => setSearchPlant(e.target.value)} // Handle input change for search
                                        />
                                        <ul>
                                            {plants
                                                .filter((item) =>
                                                    item.properties.label.toLowerCase().includes(searchPlant.toLowerCase())
                                                )
                                                .map((item) => (
                                                    <li
                                                        key={item.id}
                                                        onClick={() => handleSelectPlant(item.properties.id, 'plant_id')}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {item.properties.label}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dropdown untuk Plant Part */}
                        <div>
                            <label>Plant Part</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full text-slate-600 text-sm -ml-1 bg-white border p-2 rounded"
                                    onClick={() => setIsOpen({ ...isOpen, plantPart: !isOpen.plantPart })}
                                >
                                    {form.plant_part_id
                                        ? plantPart.find((item) => item.properties.id === form.plant_part_id)?.properties.label
                                        : 'Pilih Plant Part'}
                                </button>

                                {isOpen.plantPart && (
                                    <div className="absolute w-full max-h-60 overflow-y-auto bg-white border rounded mt-1 text-sm z-10">
                                        <input
                                            type="text"
                                            placeholder="Search Plant Part..."
                                            className="w-full p-2 text-sm border-b border-gray-300"
                                            value={searchPlantPart}
                                            onChange={(e) => setSearchPlantPart(e.target.value)} // Handle input change for search
                                        />
                                        <ul>
                                            {plantPart
                                                .filter((item) =>
                                                    item.properties.label.toLowerCase().includes(searchPlantPart.toLowerCase())
                                                )
                                                .map((item) => (
                                                    <li
                                                        key={item.id}
                                                        onClick={() => handleSelectPlantPart(item.properties.id, 'plant_part_id')}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {item.properties.label}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dropdown untuk Traditional Use */}
                        <div>
                            <label>Traditional Use</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full text-slate-600 text-sm -ml-1 bg-white border p-2 rounded"
                                    onClick={() => setIsOpen({ ...isOpen, traditionalUse: !isOpen.traditionalUse })}
                                >
                                    {form.traditional_use_id
                                        ? traditionalUse.find((item) => item.properties.id === form.traditional_use_id)?.properties.label
                                        : 'Pilih Traditional Use'}
                                </button>

                                {isOpen.traditionalUse && (
                                    <div className="absolute w-full max-h-60 overflow-y-auto bg-white border rounded mt-1 text-sm z-10">
                                        <input
                                            type="text"
                                            placeholder="Search Traditional Use..."
                                            className="w-full p-2 text-sm border-b border-gray-300"
                                            value={searchTraditionalUse}
                                            onChange={(e) => setSearchTraditionalUse(e.target.value)} // Handle input change for search
                                        />
                                        <ul>
                                            {traditionalUse
                                                .filter((item) =>
                                                    item.properties.label.toLowerCase().includes(searchTraditionalUse.toLowerCase())
                                                )
                                                .map((item) => (
                                                    <li
                                                        key={item.id}
                                                        onClick={() => handleSelectTraditionalUse(item.properties.id, 'traditional_use_id')}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {item.properties.label}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dropdown untuk Method Of Use */}
                        <div>
                            <label>Method Of Use</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full text-slate-600 text-sm -ml-1 bg-white border p-2 rounded"
                                    onClick={() => setIsOpen({ ...isOpen, methodOfUse: !isOpen.methodOfUse })}
                                >
                                    {form.method_of_use_id
                                        ? methodOfUse.find((item) => item.properties.id === form.method_of_use_id)?.properties.label
                                        : 'Pilih Method Of Use'}
                                </button>

                                {isOpen.methodOfUse && (
                                    <div className="absolute w-full max-h-60 overflow-y-auto bg-white border rounded mt-1 text-sm z-10">
                                        <input
                                            type="text"
                                            placeholder="Search Method Of Use..."
                                            className="w-full p-2 text-sm border-b border-gray-300"
                                            value={searchMethodOfUse}
                                            onChange={(e) => setSearchMethodOfUse(e.target.value)} // Handle input change for search
                                        />
                                        <ul>
                                            {methodOfUse
                                                .filter((item) =>
                                                    item.properties.label.toLowerCase().includes(searchMethodOfUse.toLowerCase())
                                                )
                                                .map((item) => (
                                                    <li
                                                        key={item.id}
                                                        onClick={() => handleSelectMethodOfUse(item.properties.id)}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {item.properties.label}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dropdown untuk Ethnic */}
                        <div>
                            <label>Ethnic</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full text-slate-600 text-sm -ml-1 bg-white border p-2 rounded"
                                    onClick={() => setIsOpen({ ...isOpen, ethnic: !isOpen.ethnic })}
                                >
                                    {form.ethnic_id
                                        ? ethnic.find((item) => item.properties.id === form.ethnic_id)?.properties.label
                                        : 'Pilih Ethnic'}
                                </button>

                                {isOpen.ethnic && (
                                    <div className="absolute w-full max-h-60 overflow-y-auto bg-white border rounded mt-1 text-sm z-10">
                                        <input
                                            type="text"
                                            placeholder="Search Ethnic..."
                                            className="w-full p-2 text-sm border-b border-gray-300"
                                            value={searchEthnic}
                                            onChange={(e) => setSearchEthnic(e.target.value)} // Handle input change for search
                                        />
                                        <ul>
                                            {ethnic
                                                .filter((item) =>
                                                    item.properties.label.toLowerCase().includes(searchEthnic.toLowerCase())
                                                )
                                                .map((item) => (
                                                    <li
                                                        key={item.id}
                                                        onClick={() => handleSelectEthnic(item.properties.id)}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {item.properties.label}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dropdown untuk Location */}
                        <div>
                            <label>Location</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full text-slate-600 text-sm -ml-1 bg-white border p-2 rounded"
                                    onClick={() => setIsOpen({ ...isOpen, location: !isOpen.location })}
                                >
                                    {form.location_id
                                        ? location.find((item) => item.Location?.properties.id === form.location_id)?.Location?.properties?.kecamatan
                                        : 'Pilih Location'}
                                </button>

                                {isOpen.location && (
                                    <div className="absolute w-full max-h-60 overflow-y-auto bg-white border rounded mt-1 text-sm z-10">
                                        <input
                                            type="text"
                                            placeholder="Search Location..."
                                            className="w-full p-2 text-sm border-b border-gray-300"
                                            value={searchLocation}
                                            onChange={(e) => setSearchLocation(e.target.value)} // Handle input change for search
                                        />
                                        <ul>
                                            {location
                                                .filter((item) =>
                                                    item.Location?.properties?.kecamatan.toLowerCase().includes(searchLocation.toLowerCase())
                                                )
                                                .map((item) => (
                                                    <li
                                                        key={item.id}
                                                        onClick={() => handleSelectLocation(item.Location?.properties.id)}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {item.Location?.properties?.kecamatan}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dropdown untuk Reference */}
                        <div>
                            <label>Reference</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    className="w-full text-slate-600 text-sm -ml-1 bg-white border p-2 rounded"
                                    onClick={() => setIsOpen({ ...isOpen, reference: !isOpen.reference })}
                                >
                                    {form.reference_id
                                        ? reference.find((item) => item.Reference?.properties.id === form.reference_id)?.Reference?.properties.label
                                        : 'Pilih Reference'}
                                </button>

                                {isOpen.reference && (
                                    <div className="absolute w-full max-h-60 overflow-y-auto bg-white border rounded mt-1 text-sm z-10">
                                        <input
                                            type="text"
                                            placeholder="Search Reference..."
                                            className="w-full p-2 text-sm border-b border-gray-300"
                                            value={searchReference}
                                            onChange={(e) => setSearchReference(e.target.value)} // Handle input change for search
                                        />
                                        <ul>
                                            {reference
                                                .filter((item) =>
                                                    item.Reference?.properties?.label.toLowerCase().includes(searchReference.toLowerCase())
                                                )
                                                .map((item) => (
                                                    <li
                                                        key={item.id}
                                                        onClick={() => handleSelectReference(item.Reference?.properties.id)}
                                                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        {item.Reference?.properties?.label}
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Menampilkan username yang sudah login */}
                        <div className='flex'>
                            <label>User</label>
                            <div className='text-center mt-5 mx-auto'>
                                <input
                                    disabled
                                    className="ml-7 w-full text-slate-600 text-sm"
                                    type="text"
                                    value={form.user_id || session?.user?.user_id}
                                    onChange={(e) => setForm({ ...form, user_id: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Tombol Save */}
                        <button
                            type="submit"
                            className='w-full text-white bg-green-800 hover:bg-green-900 
                                focus:ring-4 focus:outline-none focus:ring-green-300 font-medium 
                                rounded-lg text-sm px-5
                                py-2.5 text-center'
                            disabled={isSubmitting}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
            {/* Popup Berhasil */}
            {/* {isSuccesAddData && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
                    <div className="bg-green-500 text-white p-8 rounded-lg shadow-lg">
                        <IoMdCheckmarkCircleOutline className='text-5xl md:text-6xl z-20 mx-auto mt-4' />
                        <p className="text-lg font-semibold mt-3">Data berhasil ditambahkan!</p>
                    </div>
                </div>
            )} */}
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

            {error && (
                <div className="fixed top-0 left-0 w-full h-full flex items-top mt-5 justify-center z-50">
                    <div className="flex flex-col gap-4 w-80 sm:w-[325px] text-[10px] sm:text-xs">
                        <div className="error-alert cursor-default flex items-center justify-between w-full h-[100px] rounded-lg bg-[#D1B29D] px-[10px]">
                            <div className="text-[#F5F5F5] bg-red-500/75 p-2 rounded-lg flex justify-center items-center">
                                <MdErrorOutline className="text-white text-[42px]" />
                            </div>
                            <div className="ml-4">
                                <p className="text-[#5C3D28] font-bold text-[14px] sm:text-[15px] sm:mb-1">Error</p>
                                <p className="text-[#4A4A4A] text-[13px] sm:text-[14px]">{errorMessage}</p>
                            </div>
                            <button
                                className="text-[#5C3D28] bg-white/10 backdrop-blur-xl text-sm hover:text-black hover:bg-[#ffffff5d] p-[6px] rounded-md transition-colors ease-linear"
                                onClick={() => setError(false)} // Menutup popup ketika tombol ini diklik
                            >
                                <RxCross2 />
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default FormTraditional;
