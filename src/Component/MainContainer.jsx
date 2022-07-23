import React, { useEffect, useState } from 'react'
import {HomeCotainer} from './'
import {motion} from 'framer-motion';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { RowContainer } from './';
import { useDispatch, useSelector } from 'react-redux';
import {MenuContainer} from './'

const MainContainer = () => {
  const dataFood=useSelector((state)=> state.food.data);
  const dispatch=useDispatch();
  const [page,setPage]=useState(4);
  const NextPage=()=>{
   setPage((pages)=> {
    if(pages==dataFood.length-1){
      return pages;
    }
    else{
      return pages + 1;
    }
    
   })
  }
  const PrevPage=()=>{
    setPage((pages)=> {
      if(pages==4){
        return pages;
      }
      else{
        return pages - 1;
      }
      
     })
  }
  return (
   <div className=''>
    <HomeCotainer />
    <section className="w-full">
      <div className='w-full h-auto flex items-center justify-between'>
        <p className='font-semibold text-headingColor  text-2xl uppercase before:absolute before:content relative before:w-28 before:left-0 before:bottom-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 before:h-1 '>
          Our fresh & healthy fruits 
        </p>
        <div className="md:flex gap-3 items-center">
          <motion.div whileTap={{scale:0.75}} onClick={()=> PrevPage()} className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg'>
            <MdChevronLeft className='text-white text-bold text-xl'/>
          </motion.div>
          <motion.div whileTap={{scale:0.75}} onClick={()=> NextPage()} className='w-8 h-8 rounded-lg bg-orange-300 flex items-center justify-center hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg'>
            <MdChevronRight  className='text-white text-bold text-xl'/>
          </motion.div>
          
        </div>
      </div>
      <RowContainer flag={true} data={dataFood ?.filter((n)=> n.category==="fruits")} page={page}/>
      <MenuContainer />
    </section>
   </div>
  )
}

export default MainContainer