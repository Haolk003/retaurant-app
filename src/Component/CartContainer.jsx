import React from 'react'
import {IoArrowBackSharp} from 'react-icons/io5';
import {RiRefreshFill} from 'react-icons/ri';
import { motion } from 'framer-motion';
import {AiOutlineMinus,AiOutlinePlus} from 'react-icons/ai';
import { useSelector,useDispatch } from 'react-redux';
import { CartAction } from '../store/cart-auth';
const CartContainer = () => {
  const cartItem=useSelector((state)=> state.cart.itemList);
  const total=useSelector((state)=> state.cart.total);
 const dispatch=useDispatch();
 const clearCart =()=>{
  dispatch(CartAction.CloseCart());
 }
 const increment=(id)=>{
dispatch(CartAction.increment(id));
 }
 const descrement=(id)=>{
  dispatch(CartAction.decrement(id));
 }
  return (
    <motion.div initial={{opacity:0,x:200}} animate={{opacity:1,x:0}} exit={{opacity:0,x:200}} transition={{duration:1}} className='fixed h-screen bg-white w-[350px] right-0 top-0 z-[101]  drop-shadow-md flex flex-col'>
 <div className='w-full flex items-center justify-between text-textColor px-4 py-2 mb-3'>
  <motion.div whileTap={{scale:0.7}}>
  <IoArrowBackSharp className='text-lg cursor-pointer'/>
   </motion.div>
  <p className='text-headingColor font-semibold text-xl'>Cart</p>
 <motion.p whileTap={{scale:0.7}} onClick={()=> clearCart()} className='flex items-center bg-gray-300 px-2 py-1 gap-1 rounded-sm drop-shadow-md cursor-pointer'>Clear <RiRefreshFill/> </motion.p>
 </div>
<div className='bg-cartBg w-full h-full rounded-2xl flex flex-col'>
<div className='w-full h-340 md:h-370 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
{/* cartItem */}
{cartItem && cartItem.map((item)=>{
  return(
<div key={item.id} className='w-full py-1 px-2 rounded-lg bg-cartItem flex items-center justify-between gap-2 text-white'>
<img className='w-[80px] h-[80px] object-contain' src={item.imgURL} alt={item.imgURL}/>
<div className=''>
  <p className='text-sm'>{item.title}</p>
  <p className='text-xs'>$ {item.price}</p>
</div>
  <div className='flex items-center gap-2'>
    <motion.div whileTap={{scale:0.7}} className="cursor-pointer" onClick={()=> increment(item.id)}>
      <AiOutlineMinus />
    </motion.div>
    <p className='bg-cartBg px-2 rounded-sm'>{item.quanlity}</p>
    <motion.div whileTap={{scale:0.7}} className="cursor-pointer" onClick={()=> descrement(item.id)}>
      <AiOutlinePlus />
    </motion.div>
  </div>
</div>
)
})
}
</div>
<div className='p-5 flex flex-col bg-cartTotal rounded-2xl w-full flex-1  justify-evenly text-gray-300 font-semibold' >
  <div className='flex items-center justify-between'>
    <p>Sub Total</p>
    <p>$ {total}</p>
  </div>
  <div className='flex items-center justify-between border-b-2 pb-4 border-gray-300'>
    <p>Delivery </p>
    <p>$ 2.5</p>
  </div>
  <div className='flex items-center justify-between'>
    <p>Total</p>
    <p>$11.5</p>
  </div>
  <button type='button' className='w-full py-2 rounded-full bg-orange-400 text-gray-50  '>
    Checkout
  </button>
</div>
</div>
    </motion.div>
  )
}

export default CartContainer