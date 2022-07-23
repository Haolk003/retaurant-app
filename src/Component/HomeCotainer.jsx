import React from 'react'
import Delivery from '../img/delivery.png'
import HeroBg from '../img/heroBg.png';
import { heroDropData } from '../utils/data';
const HomeContainer = () => {
  return (
    <div className='md:grid-cols-2 grid grid-cols-1 w-full h-full '>
    <div className='flex flex-1 py-2 gap-8 flex-col items-start md:items-left justify-between'>
    <div className='flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full'>
      <p className='text-orange-500 font-semibold text-base'>
        Bike Delivery
      </p>
      <div className='w-8 h-8 bg-white rounded-full overflow-hidden'>
        <img src={Delivery} alt="delivery" className='w-full h-full object-contain' />
      </div>
    </div>
    <p className='tracking-wide font-semibold text-[2.5rem] md:text-[4.5rem] text-headingColor'>
      The Fastest Delivery in 
      <span className='font-bold text-orange-600 text-[3rem] md:text-[5rem]'> Your City</span>
    </p>
    <p className='text-base text-textColor text-center md:text-left md:w-[80%]'>
      Lorem ipsum, dolor sit amet consectetur adipisicung elit. Minima velit  eaque fugit distinctio est nam voluptatum architecto, porro lusto deserunt recusandae ipsaminus eos sunt dolores illo repellat facere suscipit!
    </p>
    <button type="button" className='bg-gradient-to-r from-orange-400 to-orange-500 w-full md:w-auto py-2 px-3 rounded-lg hover:shadow-lg duration-100 transition-all ease-in-out' >Order Now</button>
    </div>
    <div className='flex flex-1 items-center py-2 relative '>
      <img src={HeroBg} alt="HeroBg" className='ml-auto w-full h-full lg:h-650 lg:w-auto mx-auto my-0' />
        <div className='w-full h-full lg:px-32 px-2 py-4 top-0 left-[50%] -translate-x-[50%] absolute flex items-center gap-1 lg:gap-4 justify-center  rounded-md flex-wrap bg-cardOverlay'>
          {heroDropData && heroDropData.map((item)=>{
            return(
             <div key={item.id} className='sm:w-190 w-120 p-2 bg-cardOverlay mr-2 backdrop-blur-md flex flex-col items-center'>
             <img src={item.imgSrc} alt="i1" className='lg:w-40 w-20 -mt-2  lg:-mt-20' />
             <p className='text-center font-semibold text-textColor text-xl mt-3'>{item.name}</p>
             <p className="text-center text-ligthTextGray text-sm">{item.decp} </p>
             <p className='text-sm text-center font-semibold text-headingColor my-1'><span className='text-red-700 text-xs'>$</span>{item.price}</p>
           </div>
           )
          })}
       
        </div>
        </div>
      </div>
  )
}

export default HomeContainer