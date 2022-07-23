import React, { useState } from 'react'
import Logo from '../img/logo.png';
import {MdShoppingBasket} from 'react-icons/md';
import Avatar from '../img/avatar.png';
import {motion} from 'framer-motion';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {app} from '../firebase.config.js';
import { useDispatch,useSelector } from 'react-redux';
import { LoginActions } from '../store/login-auth';
import { useEffect } from 'react';
import {IoIosAdd} from 'react-icons/io';
import {FiLogOut} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {CartContainer} from './';
import { CartAction } from '../store/cart-auth';
import { SaveDataCart } from '../utils/firebaseFunc';
import { ref, onChildAdded, onValue} from "firebase/database";
import { database } from '../firebase.config.js';
import { UpdateDataCart } from '../utils/firebaseFunc';
import { async } from '@firebase/util';
const Header = () =>{
 
  const cartItem=useSelector((state)=> state.cart.itemList);
  const user=useSelector((state)=> state.login.user);
  const dataFull=useSelector((state)=> state.login.dataFull);
  const isLogin=useSelector((state)=> state.login.isLogin);
  const totalQuality=useSelector((state)=> state.cart.totalQuanlity);
  const fields=useSelector((state)=> state.cart.request)
  const [activeMenu,setActiveMenu]=useState(false);
  const [request,setRequest]=useState(false);
  const [key,setKey]=useState(null);
  const [requestAdd,setRequestAdd]=useState(true);
  const dispatch=useDispatch();
  const firebaseAuth=getAuth(app);
  const provider =new GoogleAuthProvider();
  const login=async ()=>{
    if(!user){
const {user:{providerData,accessToken}}=await signInWithPopup(firebaseAuth,provider);
dispatch(LoginActions.Login(providerData[0]));

 }
 else{
  setActiveMenu(!activeMenu);
 }
 
  }
  const showCart=()=>{
    dispatch(CartAction.showCart());
  }
  const Logout=()=>{
    dispatch(LoginActions.Logout());
  }
  const getDataCart=async ()=>{

    const starCountRef=ref(database,'users/');
 onValue(starCountRef,(snapshot)=>{
   snapshot.forEach((childSnapshot)=>{
      const childData=childSnapshot.val(); 
      if(childData.user.uid===user.uid){
        setKey(childSnapshot.key);
       setRequestAdd(false);
      }
    })

    })
  } 
  useEffect(()=>{
    if(user){
       getDataCart();
    }
      
       console.log(key);
  },[user]);
 
  useEffect(()=>{
   if(user && request && requestAdd ){
    SaveDataCart({user:user,data:cartItem});
   }
   else if(user && request && !requestAdd ){
    UpdateDataCart({data:cartItem,key:key});
   }
setRequest(true);

  },[user]);
  return (
    <div className='fixed z-50 w-screen  p-6 px-16'>
        {/* destop & table */}
        <div className='hidden md:flex w-full h-full justify-between items-center'>
        <Link to="/" className='flex items-center gap-2'>
        <img src={Logo} alt="Logo" className='w-10 object-cover  '/>   
        <p className='text-headingColor text-xl font-bold' >City</p>
        </Link>
        <div className='flex items-center gap-8'>
        <motion.ul className='flex items-center gap-8' initial={{x:300,opacity:0}} animate={{x:0,opacity:1}} exit={{x:300,opacity:0}}>
            <li className='text-xl  text-textColor hover:text-headingColor duration-100 trasition-all ease-in-out cursor-pointer'>Home</li>
            <li className='text-xl  text-textColor hover:text-headingColor duration-100 trasition-all ease-in-out cursor-pointer'>Menu</li>
            <li className='text-xl  text-textColor hover:text-headingColor duration-100 trasition-all ease-in-out cursor-pointer'>About Us</li>
            <li className='text-xl  text-textColor hover:text-headingColor duration-100 trasition-all ease-in-out cursor-pointer'>Service</li>
        </motion.ul>
        <div className='relative'>
          <motion.div onClick={()=>showCart()} whileTap={{scale:0.75}}>

            <MdShoppingBasket className='text-textColor text-2xl ml-8 cursor-pointer'/>
            </motion.div>
            <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                <p className='text-xs text-white text-semibold'>{totalQuality}</p>
            </div>
        </div>
        <div className='relative'>
        <motion.img whileTap={{scale:0.6}}  src={user ? user.photoURL: Avatar} alt="Avatar" className="w-10 min-w-[40px] min-h-[40px] object-cover drop-shadow-xl rounded-full cursor-pointer" onClick={login}/>
       {activeMenu && (<motion.div className='absolute w-150 right-0 top-12 flex flex-col bg-white rounded-lg shadow-xl' initial={{opacity:0,scale:0.6}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.6}}>

          {user && user.email =="6251071028@st.utc2.edu.vn"  &&  (<Link to="/createItem" className='flex items-center gap-2 px-3 py-2 hover:bg-slate-100 cursor-pointer text-textColor ease-in-out duration-100 transition-all' >
              <p>New Item</p>
              <IoIosAdd />
            </Link>)
            }
            <div onClick={()=> Logout()} className='flex items-center gap-2  px-3 py-2 hover:bg-slate-100 cursor-pointer text-textColor ease-in-out duration-100 transition-all' >
              <p >Logout</p>
              <FiLogOut />
            </div>
        </motion.div>)
        }
        </div>
      
        </div> 
        
        </div>
         <div className='relative'>
        {fields && <CartContainer />}
        </div>
        {/* mobile */}
        <div className='flex items-center justify-between md:hidden w-full  h-full'>
        <div className='relative'>
            <MdShoppingBasket className='text-textColor text-2xl ml-8 cursor-pointer'/>
            <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center'>
                <p className='text-xs text-white text-semibold'>2</p>
            </div>
            </div>
            <div className='flex items-center gap-2'>
        <img src={Logo} alt="Logo" className='w-10 object-cover  '/>   
        <p className='text-headingColor text-xl font-bold' >City</p>
        </div>
        <div className='relative'>
        <motion.img whileTap={{scale:0.6}}  src={user ? user.photoURL: Avatar} alt="Avatar" className="w-10 min-w-[40px] min-h-[40px] object-cover drop-shadow-xl rounded-full cursor-pointer" onClick={()=>login()}/>
       {activeMenu && (<motion.div className='absolute w-150 right-0 top-12 flex flex-col bg-white rounded-lg shadow-xl' initial={{opacity:0,scale:0.6}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.6}}>

          {user && user.email =="6251071028@st.utc2.edu.vn"  &&  (<div className='flex items-center gap-2 px-3 py-2 hover:bg-slate-100 cursor-pointer text-textColor ease-in-out duration-100 transition-all' >
              <p>New Item</p>
              <IoIosAdd />
            </div>)
            }
            <div className='flex items-center gap-2  px-3 py-2 hover:bg-slate-100 cursor-pointer text-textColor ease-in-out duration-100 transition-all' >
              <p onClick={()=> Logout()}>Logout</p>
              <FiLogOut />
            </div>
        </motion.div>)
        }
        </div>
        </div>
    </div>
  )
}

export default Header