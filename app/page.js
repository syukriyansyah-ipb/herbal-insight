"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation'; // Impor useRouter
import Link from "next/link";
import { Input } from "@/components";
import { CiSearch } from "react-icons/ci";
import { CgRename } from "react-icons/cg";
import Footer from "@/components/Footer";
import { SiLevelsdotfyi } from "react-icons/si";
import { GiPlantSeed } from "react-icons/gi";
import { PiGraphFill } from "react-icons/pi";
import { PiPlant } from "react-icons/pi";
// import Popup from "@/components/Popup";
import { HiArrowNarrowRight } from "react-icons/hi";
import { RiInformationFill } from "react-icons/ri";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { IoReload } from "react-icons/io5";


export default function Home({ params }) {
  useEffect(() => {
    AOS.init();
  }, [])

  const [query, setQuery] = useState("");
  const [plantList, setPlantList] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const router = useRouter();
  function handleQuery(e) {
    setQuery(e);
    setShowSuggestion(true);
  }

  useEffect(() => {
    const getPlants = async () => {
      const plants = await searchPlants(query);
      setPlantList(plants?.nodes);
    };
    if (query) {
      getPlants();
    }
  }, [query]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query) {
      router.push(`/plants/PlantList?q=${query}`);
    }
    setShowSuggestion(false);
  };

  // const [language, setLanguage] = useState(true);

  // const toggleLanguage = () => {
  //   setLanguage(!language);
  // };
  const [language, setLanguage] = useState(true); // true = Indonesia, false = English
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(!language);
    setDropdownOpen(false);
  };

  const selectLanguage = (langBool) => {
    setLanguage(langBool);
    setDropdownOpen(false);
  };

  const [section, setSection] = useState("about");
  const content = {
    about: {
      title: language ? "About" : "Tentang Kami",
      icon: <RiInformationFill className="md:w-[30px] md:h-[30px] w-[25px] h-[25px] md:mt-5 mt-4 text-[#26532C] ml-3" />,
      text: language
        ? "Herbal Insight is a Knowledge Management System (KMS) specifically designed to store, manage, and represent knowledge about the use of traditional Indonesian medicinal plants, including practices derived from the local wisdom of various ethnic groups."
        : "Herbal Insight adalah Sistem Manajemen Pengetahuan (Knowledge Management System/KMS) yang dirancang khusus untuk menyimpan, mengelola, dan merepresentasikan pengetahuan mengenai pemanfaatan tumbuhan obat tradisional Indonesia, termasuk praktik-praktik yang berasal dari kearifan lokal berbagai kelompok etnis."
    },
    plantnames: {
      title: language ? "Plant Names" : "Nama Tumbuhan",
      icon: <PiPlant className="md:w-[30px] md:h-[30px] w-[25px] h-[25px] md:mt-5 mt-4 text-[#26532C] ml-3" />,
      text: language
        ? "Find complete information about the scientific name, common names used in various countries, as well as local names used by different ethnic groups in Indonesia. This knowledge helps in identifying the plant both globally and locally."
        : "Temukan informasi lengkap tentang nama ilmiah, nama umum yang digunakan di berbagai negara, serta nama lokal yang digunakan oleh berbagai kelompok etnis di Indonesia. Pengetahuan ini membantu dalam mengidentifikasi tumbuhan secara global maupun lokal."
    },
    taxonomy: {
      title: language ? "Taxonomy" : "Taksonomi ",
      icon: <SiLevelsdotfyi className="md:w-[30px] md:h-[30px] w-[23px] h-[23px] md:mt-5 mt-4 text-[#26532C] ml-3" />,
      text: language
        ? "Scientific classification information of plants from Kingdom to Species is presented systematically to facilitate identification and understanding of relationships among species. This taxonomic data is essential for botanical research and the development of plant-based medicines."
        : "Informasi klasifikasi ilmiah tumbuhan dari Kingdom hingga Species, disajikan secara sistematis untuk memudahkan identifikasi dan pemahaman relasi antar spesies. Data taksonomi ini penting bagi penelitian botani dan pengembangan obat berbasis tanaman."
    },
    traditionalUse: {
      title: language ? "Traditional Use" : "Penggunaan tradisional",
      icon: <GiPlantSeed className="md:w-[30px] md:h-[30px] w-[25px] h-[25px] md:mt-5 mt-4 text-[#26532C] ml-3" />,
      text: language
        ?
        (
          <>Learn how medicinal plants are traditionally utilized by various ethnic groups in Indonesia. This information illustrates the wealth of local wisdom passed down through generations, with  <Link href="/plants/traditional-use" className="hover:text-[#26532C] sm:text-[#6C9167] text-[#26532C] underline">further explanation and complete data regarding the distribution of medicinal plants in Indonesia</Link> on the following pages.</>
        ) :
        (
          <>Pelajari bagaimana tanaman obat dimanfaatkan secara tradisional oleh berbagai kelompok etnis di Indonesia. Informasi ini menggambarkan kekayaan kearifan lokal yang diwariskan secara turun-temurun, dengan <Link href="/plants/traditional-use" className="hover:text-[#26532C] sm:text-[#6C9167] text-[#26532C]  underline">penjelasan lebih lanjut dan data lengkap terkait sebaran tumbuhan obat Indonesia</Link> di halaman berikut.</>
        )
    },
    pharmacology: {
      title: language ? "Pharmacology" : "Farmakologi",
      icon: <PiGraphFill className="md:w-[30px] md:h-[30px] w-[25px] h-[25px] md:mt-5 mt-4 text-[#26532C] ml-3" />,
      text: language
        ? "Explore the chemical constituents of plants, their interactions with proteins, potential pharmacological effects, and possible side effects. This information supports health research and the development of plant-based medicines."
        : "Jelajahi kandungan kimia dalam tumbuhan, interaksinya dengan protein, potensi efek farmakologis, serta efek sampingnya. Informasi ini mendukung riset kesehatan dan pengembangan obat berbasis tanaman."
    }
  };

  const aboutRef = useRef(null);

  const handleSectionClick = (sectionName) => {
    setSection(sectionName);
    setTimeout(() => {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  return (
    <section className="h-full w-full">
      <div className="h-[710px]">
      <div className="flex flex-col w-full h-[810px] bg-wallpaper-search bg-cover bg-center overflow-hidden">
        <nav className="flex items-center justify-between px-2 py-1" data-aos="fade-down" data-aos-duration='800' >
          <div className="flex gap-1 lg:gap-4 lg:pl-4 xl:gap-2 xl:pl-5">
            <Image src="/assets/images/logoIpb.png" alt="logo-IPB" width={100} height={100} className="-mt-3 sm:w-[82px] md:w-[100px] xl:w-[110px] xl:h-[90px] md:h-20 md:-mt-2 w-[52px] h-[56px] cursor-pointer" />
            <Image src="/assets/images/logo.png" alt="logo" width={100} height={100} className="sm:w-[90px] md:w-[100px] md:h-16 xl:w-[110px] xl:h-[72px] w-[52px] mb-20 h-[48px] -mt-2 md:mt-0 cursor-pointer" />
          </div>
          <div className="flex relative mx-auto w-1/2 items-center justify-center mt-7 lg:mt-5">
            <div className="relative w-full min-h-40 mt-3 ">
              <Input
                placeholder="Search..."
                value={query}
                onChange={(e) => handleQuery(e.target.value)}
                handleButton={() => router.push(`/plants/PlantList?q=${query}`)}
                onKeyDown={handleKeyPress}
                Icon={CiSearch}
                style={`${showSuggestion && "rounded-t-[20px] rounded-b border-green-700"
                  }`}
              />
            </div>
            {showSuggestion && query && (
              <div className="absolute bg-white w-full -translate-y-2 rounded-b-[20px] border-x border-b border-green-700">
                <ul className="pt-2 pb-5 text-sm md:text-base">
                  {query.length >= 3 ? (
                    plantList?.length > 0 ? (
                      <>
                        {plantList?.slice(0, 4).map((item) => (
                          <li key={item?.id}>
                            <Link href={`/plants/${item?.properties?.label}`}>
                              <div className="px-5 hover:bg-gray-200 py-2">
                                {item?.properties?.label}
                              </div>
                            </Link>
                          </li>
                        ))}
                        <li className="text-yellow-500 underline text-[11px] md:text-sm">
                          <Link href={`/plants?q=${query}`}>
                            {console.log(query)}
                            <div className="px-5">View more</div>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li className="text-gray-600 py-2">
                        <div className="px-5">Medical plant not found</div>
                      </li>
                    )
                  ) : (
                    <li className="text-gray-600 py-2">
                      <div className="px-5">Ketikan 3 huruf...</div>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <ul className="flex md:space-x-4 space-x-2 lg:mb-[70px] mb-[80px] pb-4 md:mt-3">
            <li className="inline-block text-center lg:-mt-1 md:py-[10px] sm:py-[2px] sm:pt-1 py-[7px] md:px-3 sm:px-0 sm:w-16 md:w-20 px-3  sm:bg-white bg-[#426948] sm:text-[#426948] text-white border sm:rounded-l-3xl sm:rounded-none rounded-3xl font-extrabold sm:-mr-4 mt-3">
              <button onClick={() => router.push('/authenticate/login')}>Login</button>
            </li>
            <li className="sm:inline-block hidden text-center lg:-mt-1 md:py-[10px] sm:pt-1 sm:py-[2px] sm:h-[40px] md:h-[46px] first-letter: sm:w-20 md:w-24 sm:mt-3 sm:ml-2 md:ml-1 md:px-3 sm:px-1 px-2 bg-[#426948] text-white border rounded-r-3xl font-semibold">
              <button onClick={() => router.push('/authenticate/register')}>Signup</button>
            </li>
          </ul>
        </nav>

        <div className="text-center" data-aos="fade-up" data-aos-duration='800'>
          <h1 className="font-bold text-[#1A3626]  text-lg tracking-widest">WELCOME TO HERBAL INSIGHT</h1>
          <h1 className="xl:text-[90px] lg:text-[80px] md:text-[70px] sm:text-[60px] text-[45px] mt-[50px] sm:mt-6 md:mt-2 lg:mt-0 font-bold mb-2 lg:mb-0 tracking-wider text-[#426948]">Knowledge of</h1>
          <h1 className="lg:text-[80px] md:text-[70px] sm:text-[60px] text-[45px] font-bold mb-4 sm:mb-1 text-[#426948] tracking-wider">Medicinal Plants</h1>
        </div>

        <div className="mx-auto mt-2" data-aos="fade-up" data-aos-duration='800'>
          <button onClick={() => router.push('/plants')} className="bg-[#426948] text-white px-2 py-2 rounded-lg mt-8 tracking-wider font-bold">Open Search</button>
        </div>
      </div>
    </div>
      {/* <div className="-mt-[102px] ">
        {
          language ?
            (<Image src="/assets/images/indonesia.png" alt="indonesia" width={50} height={50} onClick={toggleLanguage} className="cursor-pointer border" />)
            :
            (<Image src="/assets/images/inggris.jpg" alt="indonesia" width={50} height={50} onClick={toggleLanguage} className="cursor-pointer border" />
            )
        }
      </div> */}
      <div className="relative inline-block text-left ">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="inline-flex justify-between items-center w-48 rounded-md border px-2 py-1 bg-white shadow-sm cursor-pointer"
        >
          <Image
            src={
              language
                ? "/assets/images/inggris.jpg"
                : "/assets/images/indonesia.png"
            }
            alt="language"
            width={30}
            height={30}
            className="mr-2"
          />
          <span className="text-sm">
            {language ? "English" : "Bahasa Indonesia"}
          </span>
          <svg
            className="ml-2 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 011.08 1.04l-4.24 4.25a.75.75 0 01-1.08 0l-4.24-4.25a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {dropdownOpen && (
          <div className="origin-top-left absolute left-0 mt-0 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">
              <button
                onClick={() => selectLanguage(false)}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                <Image
                  src="/assets/images/indonesia.png"
                  alt="indonesia"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Bahasa Indonesia
              </button>
              <button
                onClick={() => selectLanguage(true)}
                className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100"
              >
                <Image
                  src="/assets/images/inggris.jpg"
                  alt="english"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                English
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-3" >
        <div ref={aboutRef} className="lg:flex gap-12 flex-wrap">
          <h1 className="text-[64px] sm:text-[50px] md:text-[60px] lg:text-[64px] xl:text-[76px] xl:w-[430px] xl:ml-14 lg:ml-36 font-bold text-[#26532C] md:w-full w-full md:ml-0 md:text-center lg:w-[370px] md:pt-10 pt-3 text-center lg:text-left sm:mb-3" data-aos="fade-up" data-aos-duration='800'>Learn More About Us</h1>
          <div className={`xl:w-[800px] mt-5 sm:mt-7 xl:-ml-3 lg:w-[360px] lg:ml-36 md:w-[900px]  md:mx-auto md:item-center sm:w-[350px] w-[340px] h-[275px] lg:h-[240px] md:h-[230px] bg-[#FDFDFD] rounded-lg shadow-xl md:px-10 px-6 relative mx-auto pt-1 md:pt-0 mb-5 md:mb-0 
            ${section === 'taxonomy' && 'h-[301px] md:h-[211px]'} ${section === 'pharmacology' && 'h-[257px] md:h-[181px]'}  ${section === 'traditionalUse' && 'h-[315px] md:h-[212px]'} ${section === 'plantnames' && 'md:h-[191px]'}
            ${!language && section === 'about' && 'h-[335px]'} ${!language && section === 'plantnames' && 'h-[295px] md:h-[213px]'} ${!language && section === 'taxonomy' && 'h-[278px] md:h-[181px]'}  ${!language && section === 'pharmacology' && 'h-[251px]'}  ${!language && section === 'traditionalUse' && 'h-[322px]'} `} >
            <div className="flex mt-3">
              <h1 className={`md:text-3xl  xl:text-4xl text-2xl text-[#26532C] font-semibold my-3 ${!language && section === 'traditionalUse' && 'text-[23px] '}`}>{content[section].title}</h1>
              {content[section].icon}
            </div>
            <p className='text-[#6C9167] font-semibold md:text-xl text-base mt-2'>
              {content[section].text}
            </p>
            <div className="flex absolute bottom-0 right-0">
              <IoReload
                onClick={() => setSection("about")}
                className="text-[#5D8C63] md:w-[27px] md:h-[27px] w-[23px] h-[23px] mr-2 mb-2 cursor-pointer hover:rotate-180 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        <div className="md:flex flex-wrap gap-2 lg:gap-10 md:gap-5 lg:mt-16 md:mt-10 mt-5 sm:mr-4 mr-1" >
          <div className={`lg:w-[275px] xl:ml-10  lg:ml-36 md:w-[210px] md:ml-10 sm:w-[350px] w-[340px] mr-4 sm:mr-0 lg:h-[140px] md:h-[130px] h-[120px] bg-[#FDFDFD] rounded-lg shadow-xl px-5 relative mx-auto pt-1 md:pt-0 mt-5 md:mt-0 ${!language && 'md:h-[140px]'}`} data-aos="zoom-in" data-aos-duration='800'>
            <div className="flex">
              <h1 className={`lg:text-[28px] md:text-[21px] text-2xl text-[#26532C] font-semibold my-3 w-[150px] lg:w-[205px] md:w-[170px] md:-ml-2 lg:ml-0 ${!language && 'md:text-[21px] w-[202px]'}`}>{language ? "Plant Names" : "Nama Tumbuhan"}</h1>
              <PiPlant className="w-[30px] h-[30px] mt-4 text-[#26532C]  " />
            </div>
            <div className="flex absolute bottom-0 right-0">
              <p className={`text-[#6c9167d8] font-semibold text-sm md:mr-8 mr-24 mt-2 lg:h-full md:h-[30px] lg:mt-2 md:mt-0 lg:ml-0 md:ml-3  ${!language && '-mr-1 w-44 md:w-full'} `}>
                {language ?
                  "Refer to the explanation!"
                  :
                  "Silakan lihat penjelasannya!"
                }
              </p>
              <div onClick={() => handleSectionClick("plantnames")} className={`cursor-pointer ${!language && '-ml-4'}`}>
                <HiArrowNarrowRight className={`bg-[#5D8C63] hover:bg-[#2f4733] text-white w-[60px] h-[45px]  rounded-br-lg ml-1 ${!language && '-ml-2'}`} />
              </div>
            </div>
          </div>
          <div className={`lg:w-[275px] xl:ml-5  lg:ml-36 md:w-[210px] md:ml-0 sm:w-[350px] w-[340px] mr-4 sm:mr-0 lg:h-[140px] md:h-[130px] h-[120px] bg-[#FDFDFD] rounded-lg shadow-xl px-5 relative mx-auto pt-1 md:pt-0 mt-5 md:mt-0 ${!language && 'md:h-[140px]'}`} data-aos="zoom-in" data-aos-duration='800'>
            <div className="flex">
              <h1 className={`lg:text-[28px] md:text-[21px] text-2xl text-[#26532C] font-semibold my-3 w-[110px] lg:w-[205px] md:w-[170px] md:-ml-2 lg:ml-0 ${!language && 'md:text-[21px] '}`}>{language ? "Taxonomy" : "Taksonomi "}</h1>
              <SiLevelsdotfyi className={`w-[24px] h-[24px] mt-[20px] text-[#26532C] ml-3 ${!language && 'ml-5'}`} />
            </div>
            <div className="flex absolute bottom-0 right-0">
              <p className={`text-[#6c9167d8] font-semibold text-sm md:mr-8 mr-24 mt-2 lg:h-full md:h-[30px] lg:mt-2 md:mt-0 lg:ml-0 md:ml-3 ${!language && ' md:-mr-1 w-44 md:w-full'} `}>
                {language ?
                  "Refer to the explanation!"
                  :
                  "Silakan lihat penjelasannya!"
                }
              </p>
              <div onClick={() => handleSectionClick("taxonomy")} className={` cursor-pointer ${!language && '-ml-4'}`}>
                <HiArrowNarrowRight className={`bg-[#5D8C63] hover:bg-[#2f4733] text-white w-[60px] h-[45px]  rounded-br-lg ml-1 ${!language && '-ml-2'}`} />
              </div>
            </div>
          </div>
          <div className={`lg:w-[275px] xl:ml-5  lg:ml-36 md:w-[210px] md:ml-0 sm:w-[350px] w-[340px] mr-4 sm:mr-0 lg:h-[140px] md:h-[130px] h-[120px] bg-[#FDFDFD] rounded-lg shadow-xl px-5 relative mx-auto pt-1 md:pt-0 mt-5 md:mt-0 ${!language && 'md:h-[140px]'}`} data-aos="zoom-in" data-aos-duration='800'>
            <div className="flex">
              <h1 className={`lg:text-[28px] md:text-[21px] text-2xl text-[#26532C] font-semibold my-3 w-[165px] lg:w-[205px] md:w-[170px] md:-ml-2 lg:ml-0 ${!language && 'md:text-[21px] w-[267px]'}`}>{language ? "Traditional Use" : "Penggunaan tradisional"}</h1>
              <GiPlantSeed className="w-[29px] h-[29px] mt-4 text-[#26532C] ml-3 " />
            </div>
            <div className="flex absolute bottom-0 right-0">
              <p className={`text-[#6c9167d8] font-semibold text-sm md:mr-8 mr-24 mt-2 lg:h-full md:h-[30px] lg:mt-2 md:mt-0 lg:ml-0 md:ml-3 ${!language && '-mr-1 w-44 md:w-full'} `}>
                {language ?
                  "Refer to the explanation!"
                  :
                  "Silakan lihat penjelasannya!"
                }
              </p>
              <div onClick={() => handleSectionClick("traditionalUse")} className={`cursor-pointer ${!language && '-ml-4'}`}>
                <HiArrowNarrowRight className={`bg-[#5D8C63] hover:bg-[#2f4733] text-white w-[60px] h-[45px]  rounded-br-lg ml-1 ${!language && '-ml-2'}`} />
              </div>
            </div>
          </div>
          <div className={`lg:w-[275px] xl:ml-5  lg:ml-36 md:w-[210px] md:ml-0 sm:w-[350px] w-[340px] mr-4 sm:mr-0 lg:h-[140px] md:h-[130px] h-[120px] bg-[#FDFDFD] rounded-lg shadow-xl px-5 relative mx-auto pt-1 md:pt-0 mt-5 md:mt-0 ${!language && 'md:h-[140px]'}`} data-aos="zoom-in" data-aos-duration='800'>
            <div className="flex">
              <h1 className={`lg:text-[28px] md:text-[21px] text-2xl text-[#26532C] font-semibold my-3 w-[165px] lg:w-[210px] md:w-[170px] md:-ml-2 lg:ml-0 ${!language && 'md:text-[21px] sm:w-[225px]'}`}>{language ? "Pharmacology" : "Farmakologi"}</h1>
              <PiGraphFill className={`w-[30px] h-[30px] mt-[18px] text-[#26532C]  ${!language && '-ml-5'}`} />
            </div>
            <div className="flex absolute bottom-0 right-0">
              <p className={`text-[#6c9167d8] font-semibold text-sm md:mr-8 mr-24 mt-2 lg:h-full md:h-[30px] lg:mt-2 md:mt-0 lg:ml-0 md:ml-3 ${!language && '-mr-1 w-44 md:w-full'} `}>
                {language ?
                  "Refer to the explanation!"
                  :
                  "Silakan lihat penjelasannya!"
                }
              </p>
              <div onClick={() => handleSectionClick("pharmacology")} className={`cursor-pointer  ${!language && '-ml-4'}`}>
                <HiArrowNarrowRight className={`bg-[#5D8C63] hover:bg-[#2f4733] text-white w-[60px] h-[45px]  rounded-br-lg ml-1 ${!language && '-ml-2'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`md:mt-28 mt-28  bg-[#6C9167] sm:h-[540px] h-[600px] relative `}>
        <div className="absolute bottom-0 left-0">
          <Image src="/assets/images/contributor.png" alt="logo" width={450} height={450} data-aos="fade-right" className="hidden md:inline-block " />
        </div>
        <div className="text-center md:pl-[290px] pt-20 ">
          <div className={`text-white ${!language && 'md:-mt-10 -mt-7 lg:mr-10'}`}>
            <h1 className="lg:ml-28 font-semibold md:text-xl sm:text-lg text-base mt-7 " data-aos="fade-down" data-aos-duration='800'>
              {language ? "MANAGING ACTORS" : "AKTOR PENGELOLA"}</h1>
            <h1 className="lg:ml-28 md:text-[40px] sm:text-[35px] text-[30px] font-bold " data-aos="fade-down" data-aos-duration='800'>
              {language ? "Become a Herbal Insight Contributor!" : "Jadilah Kontributor Herbal Insight!"}</h1>
            <p data-aos="fade-up" data-aos-duration='800' className={`lg:ml-52 xl:w-[700px] xl:ml-56 lg:w-[600px] w-full mt-8 md:text-[19px] sm:text-[16px] sm:pl-7 text-[14px] font-bold leading-8 px-4 ${!language && 'ml-0 lg:w-[700px] lg:ml-[130px] '}`}>
              {language ? "Do you have research or information about the use of traditional medicinal plants in Indonesia? Herbal Insight invites you to join as a contributor. As a contributor, you can submit and manage data related to traditional practices, methods, ethnic affiliations, and other references helping to enrich a shared body of knowledge accessible to the public."
                :
                "Apakah Anda memiliki penelitian atau informasi mengenai pemanfaatan tanaman obat tradisional Indonesia? Herbal Insight mengundang Anda untuk bergabung sebagai kontributor. Sebagai kontributor, Anda dapat menyumbangkan dan mengelola data terkait penggunaan tradisional, metode, afiliasi etnis, dan referensi lainnya untuk memperkaya pengetahuan bersama yang dapat diakses oleh publik."}
            </p>
            <div className="flex mt-12 lg:ml-28 xl:ml-28">
              <button onClick={() => router.push('/authenticate/login')} data-aos="zoom-in" data-aos-duration='800' className={`bg-[#EDBE44] hover:bg-[#e0b13a] py-2 px-2 rounded-lg border font-bold mx-auto text-white md:text-base text-sm ${!language && 'md:-mt-3 xl:mt-0 -mt-4 '}`}>
                {language ? "Sign up now and start contributing!" : "DAFTAR SEKARANG DAN MULAI BERKONTRIBUSI!"}</button>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </section>
  );
}
