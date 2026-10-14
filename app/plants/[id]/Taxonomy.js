import React, { Fragment } from 'react';
import { getTaxonomy } from "@/api/reasonings";
import Image from 'next/image';
const type = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species']

async function Taxonomy({ plantName }) {

  const data = await getTaxonomy(plantName)
  const taxonomy = Object.values(data.data);

  // useEffect(() => {
  //   const fetchTaxonomy = async () => {
  //     try{
  //       const data = await getTaxonomy('Ageratina riparia');
  //       const result = Object.values(data.data);
  //       setTaxonomy(result);
  //     }catch(error){
  //       console.error('Error fetching taxonomy:', error.message);
  //     }
  //   };
  //   fetchTaxonomy();
  // },[]);

  const findNameTax = (val) => {
    if (!taxonomy) return '';


    const result = taxonomy.find((item) => item[val]);
    return result ? result[val].properties.label : '';
  }

  // useEffect(() => {
  //   const reqTaxonomy = async () => {
  //     const data = await getTaxonomy('');  
  //     const result = Object.values(data.data)    
  //     setTaxonomy(result)
  //   }
  //   reqTaxonomy()
  // },[])
  // const findNameTax =(val)=>{
  //   const result = taxonomy.find((item)=>{
  //     if(item[val]){
  //       return item
  //     }
  //   })
  //   console.log(result);
  //   return result[val].properties.label
  // }
  return (
    <Fragment>
      <div className="flex w-[100%] h-[80%] bg-[#ffffff8e]  my-1 shadow-2xl rounded-lg relative">
        <div>
          {type.map((item, i) => (
            <h1 className="mb-10 mt-12 sm:mb-10 sm:mt-12 sm:ml-7 text-[14px] sm:text-[16px] font-bold ml-2 text-green-800" key={i}>{item}</h1>
          ))}

        </div>
        <div className=" flex-col w-[78%] h-[100%] bg-[#ffffff8e] px-3 shadow-2xl rounded-xl absolute inset-y-0 right-0 text-slate-200">

          {taxonomy && type.map((item, i) => (
            <div className={`w-[${94 - ((i + 1) * 7)}%] h-[5%] bg-[#5C8359] items-center mx-auto mb-10 mt-11 text-center text-slate-100 font-medium cursor-pointer hover:scale-105`} key={i}>
              <p className={`text-[14px] sm:text-[16px] ${item === 'Genus' || item === 'Species' ? 'italic' : ''}`}>{findNameTax(item)}</p></div>
          ))}
          {/* <div class="w-[80%] h-[5%] bg-[#5C8359] items-center mx-auto mb-10 mt-10 text-center text-slate-100 font-medium cursor-pointer hover:scale-105"><p className='text-[14px] sm:text-[16px]'>Tracheophyta</p></div>
            <div class="w-[73%] h-[5%] bg-[#5C8359] items-center mx-auto mb-10 mt-10 text-center text-slate-100 font-medium cursor-pointer hover:scale-105"><p className='text-[14px] sm:text-[16px]'>Magnoliopsida</p></div>
            <div class="w-[66%] h-[5%] bg-[#5C8359] items-center mx-auto mb-10 mt-10 text-center text-slate-100 font-medium cursor-pointer hover:scale-105"><p className='text-[14px] sm:text-[16px]'>Caryaphyllales</p></div>
            <div class="w-[59%] h-[5%] bg-[#5C8359] items-center mx-auto mb-10 mt-10 text-center text-slate-100 font-medium cursor-pointer hover:scale-105"><p className='text-[14px] sm:text-[16px]'>Amaranthaceae</p></div>
            <div class="w-[52%] h-[5%] bg-[#5C8359] items-center mx-auto mb-10 mt-10 text-center text-slate-100 font-medium cursor-pointer hover:scale-105"><p className='text-[14px] sm:text-[16px]'>Amaranthus</p></div>
            <div class="w-[45%] h-[5%] bg-[#5C8359] items-center mx-auto mb-10 mt-10 text-center text-slate-100 font-medium cursor-pointer hover:scale-105"><p className='text-[14px] sm:text-[16px]'>Amaranthus hybridus</p></div> */}
        </div>
      </div>
      <div className='mt-7 text-green-800'>
        <h1 className='font-bold mb-1'>Note:</h1>
        <Image src="/assets/images/triangle_taksonomy.png" alt='note' width={700} height={100} />
        {/* <p className='font-medium'>The higher the taxonomic rank of a group, the greater the number of its members, 
          but also the greater the variation in characteristics that distinguish one member from another. 
          Conversely, the lower the taxonomic rank, the fewer the members, and the more similarities there 
          are in characteristics among them.</p> */}
          {/* Semakin tinggi tingkat taksonomi suatu kelompok, semakin besar jumlah anggotanya, namun semakin besar pula variasi ciri-ciri yang membedakan satu anggota dengan yang lain. Sebaliknya, semakin rendah tingkat taksonomi, jumlah anggotanya lebih sedikit dan persamaan ciri-ciri di antara anggotanya lebih banyak. */}
      </div>
    </Fragment>
  )
}

export default Taxonomy;
