import React, { useEffect,useRef } from 'react'
import {motion} from 'framer-motion';
import { MdShoppingBasket } from 'react-icons/md';
import { useSelector,useDispatch } from 'react-redux';
import {Loader} from './'
import { useState } from 'react';
import { CartAction } from '../store/cart-auth';
const RowCotainer = ({flag,data,page}) => {
   const [loading,setLoading]=useState(true);
   const cart=useSelector((state)=>state.cart.itemList);
  const dispatch=useDispatch();
 const addCart=(item)=>{
  const {title,imgURL,id,categories,price}=item;
  console.log(item);
  dispatch(CartAction.addCart({
    title,
    imgURL,
    categories,
    id,
    price
  }));
  
 }
 useEffect(()=>{
   setTimeout(()=>{
    setLoading(false);
   },3000)
 },[])
 
  return (
    <div className={`w-[90%] m-auto flex justify-center  my-12`} >

       {loading ? <Loader /> :  <div className='grid lg:grid-cols-4 w-[100%] md:grid-cols-3 grid-cols-2 gap-4  '>

        {data && data.slice(page-4,page).map((item,index)=>{
            return(
            <motion.div initial={{x:"100%"}} animate={{x :"0%"}} exit={{x:"100%"}} key={item.id}  className='w-100% my-12 shadow-md bg-rowBg backdrop-blur-lg bg-gray-100 rounded-lg py-2 px-3 hover:drop-shadow-lg'> 
             <div className='w-full flex items-center justify-between'>
                <motion.img whileHover={{scale:1.2}} 
                src={item.imgURL} alt={item.imgURL} 
                className='w-32 h-32 md:w-44 md:h-44 object-fill'
                />
                <motion.div whileTap={{scale:0.7}} onClick={()=>addCart(item)} className='w-8 h-8 cursor-pointer mt-2 rounded-full bg-red-600 flex items-center justify-center text-white'>
                    <MdShoppingBasket />
                </motion.div>
            </div>
            <div className='flex flex-col justify-center items-end'>
                <p className='text-textColor font-semibold text-lg mt-2'>{item.title}</p>
                <p className='text-gray-600 mt-1 text-sm'>{item.categories}</p>
                <p className='font-semibold text-sm'><span className='text-red-600 text-xs'>$</span>{item.price}</p>
            </div>
        </motion.div> 
        )
        })}

       </div> 
}   
    </div>
  )
}

export default RowCotainer