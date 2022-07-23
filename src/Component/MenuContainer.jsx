import React, { useState } from 'react'
import {IoFastFood} from 'react-icons/io5';
import { categories } from '../utils/data';
import { motion } from 'framer-motion';
import { RowContainer } from '.';
import { useSelector } from 'react-redux';
const MenuContainer = () => {
    const data=useSelector((state)=> state.food.data);
    const [filter,setFilter]=useState('chicken');
  return (
    <section className='w-full mt-4 '>
        <div className='font-semibold text-headingColor relative text-2xl before:content before:absolute before:bottom-0 before:left-0 before:w-14  before:h-1 before:bg-orange-600'>
            Our Hot Dishes
        </div>
            <div className='flex items-center justify-center overflow-x-scroll scrollbar-none gap-3 '>
                {categories && categories.map((item)=>{
                    return(
                <motion.div whileTap={{scale:0.6}} key={item.id} onClick={()=> setFilter(item.url)} className={`group ${filter === item.url ? 'bg-red-600':'bg-cartOverplay'} hover:bg-red-600 ease-in-out duration-100  cursor-pointer drop-shadow-xl flex flex-col items-center py-5 rounded-lg min-w-[100px] minh-[130px] `}>
                    <div className={`text-lg text-center ${filter === item.url ? 'bg-cartOverplay text-white' : "bg-red-600" } group-hover:text-white  group-hover:bg-cartOverplay rounded-full w-10 h-10  flex items-center justify-center mb-4`} ><IoFastFood /></div>     
                    <div className={`group-hover:text-cartOverplay ${filter ===item.url ? 'text-cartOverplay' : 'text-textColor'}`}>{item.name}</div>      
                </motion.div>
                )
            })}
            </div>
            <div>
                <RowContainer data={data ?.filter((food)=>food.category==filter)} />
            </div>
    </section>
  )
}

export default MenuContainer