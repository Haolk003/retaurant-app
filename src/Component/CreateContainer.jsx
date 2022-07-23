import React, { useState } from 'react'
import {motion} from 'framer-motion';
import { MdCloudCircle, MdCloudUpload, MdDelete, MdFastfood,MdFoodBank } from 'react-icons/md';
import {  ref, uploadBytesResumable, getDownloadURL,deleteObject } from "firebase/storage";
import { categories } from '../utils/data';
import {Loader} from './'
import {storage} from '../firebase.config';
import { SaveItem,getAllFoodItems } from '../utils/firebaseFunc';
import { useEffect } from 'react';

const CreateContainer = () => {
  const [title,setTitle]=useState('');
  const [calorires,setCalories]=useState('')
  const [price,setPrice]=useState('');
  const [category,setCategory]=useState(null);
  const [imageAsset,setImageAsset]=useState(null);
  const [fields,setFields]=useState(false );
  const [alertStatus,setAlertStatus]=useState('danger');
  const [msg,setMsg]=useState(null);
  const [isLoading,setIsLoading]=useState(false);
  const uploadImage=(e)=>{
setIsLoading(true);
  const imageFile=e.target.files[0];
  const moutainsRef=ref(storage,`Images/${Date.now()}-${imageFile.name}`);
  const uploadTask=uploadBytesResumable(moutainsRef,imageFile);
  uploadTask.on('state_changed',(snapshot)=>{
  const uploadProgress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
},(error)=>{
  console.log(error.message);
  setFields(true);
  setMsg('Error while uploading : Try Again 😢');
  setAlertStatus('danger');
  setTimeout(()=>{
  setFields(false);
  setIsLoading(false);
},4000)
},()=>{
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
 
    setImageAsset(downloadURL);
    setIsLoading(false);
    setFields(true);
    setMsg('Image uploaded successfully 😎');
    setAlertStatus('success');
    setTimeout(()=>{
    setFields(false);
    },4000)
  })
})
  console.log(imageFile);
  }
const deleteImage=()=>{ 
      setIsLoading(true);
    const desertRef=ref(storage,imageAsset);
    deleteObject(desertRef).then(()=>{
    
     setMsg('Image deleted successfully 😎');
     setFields(true);
     setImageAsset(null);
     setAlertStatus('success');
     setTimeout(()=>{
      setFields(false);
       setIsLoading(false);
     },4000)
}).catch((error)=>{
 
     setMsg('Error while delete 😂');
     setFields(true);
     setAlertStatus('danger');
     setTimeout(()=>{
      setFields(false);
       setIsLoading(false);
     },4000)
})
  }
  const saveDetails=()=>{
    setIsLoading(true);
    try{
      if(!title || !calorires || !imageAsset || !price || !category){
        
        setMsg("Required fields can't be empty");
        setFields(true);
        setAlertStatus('danger');
        setTimeout(()=>{
         setFields(false);
         setIsLoading(false);
        },4000)
      }
      else{
          const data={
            id:`${Date.now()}`,
            title:title,
            imgURL:imageAsset,
            price:price,
            category:category,
            categories:calorires,
            qty:1,
          }
          setTitle('');
          setImageAsset(null);
          setPrice('');
          setCategory('other');
          setCalories("");
          setMsg("Data Uploaded successfully 🙌");
          setFields(true);
          setAlertStatus('success'); 
          setTimeout(()=>{
           setFields(false);
           setIsLoading(false);
          },4000)
          SaveItem(data);

      }
    }
    catch{
      setMsg("Required fields can't be empty");
      setFields(true);
      setAlertStatus('danger');
      setTimeout(()=>{
       setFields(false);
       setIsLoading(false);
      },4000)
    }
  }
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center'>
    {fields && (
      <motion.p initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:1}} className={`w-full p-2 rounded-lg text-center font-semibold ${alertStatus === "danger" ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}>
       {msg}
      </motion.p>
    )}
    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
      <MdFastfood className='text-xl text-gray-700'/>
      <input type="text" placeholder="Give me a title ..." value={title} required onChange={(e)=> setTitle(e.target.value)} className="w-full h-full font-semibold text-xl bg-transparent outline-none text-textColor placeholder:text-gray-300 border-none"/>
    </div>
    <div className='w-full'>
      <select onChange={(e)=> setCategory(e.target.value)} value={category} className="w-full py-1 outline-none bo">
        <option value="other" className="bg-white">Select Category</option>
        {categories && categories.map((item)=>{
          return(
            <option id={item.id} value={item.url} className="text-base border-0 outline-none capitalize bg-white text-headingColor">{item.name}</option>
          )
        })}
      </select>
    </div>
    <div className="group flex items-center justify-center flex-col w-full h-[200px] mt-7 rounded-lg border-2 border-dotted border-gray-400 md:h- cursor-pointer">
      {isLoading ? <Loader /> : <>
      {!imageAsset ? (<>
      <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
        <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
          <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
          <p className='text-gray-500 hover:text-gray-700'>Click here to upload</p>
        </div>
        <input type="file" name="uploadImage" accept='image/*' onChange={(e)=> uploadImage(e)} className="w-0 h-0"/>
      </label>
      </>)
      :
      (<>
      <div className='relative h-full'>
        <img src={imageAsset} alt="uploaded image" className=" h-[200px] w-[250px] object-cover" />
        <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 
        text-xl cursor-pointer outline-none hover:shadow-md duration-500 transiton-all ease-in-out' onClick={deleteImage}>
          <MdDelete className='text-white' />
        </button>
      </div>
      </>)
      }
      </>
    }
      
    </div>
    <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
      <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
      <MdFoodBank className="text-gray-700 text-2xl" />
      <input type="numble" value={calorires} onChange={(e)=> setCalories(e.target.value)}  placeholder="Calories" className="w-full py-1 text-xl bg-transparent outline-none border-none ml-2 placeholder:text-gray-400"/>
      </div>

    </div>
    <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
      <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
      <MdFoodBank className="text-gray-700 text-2xl" />
      <input type="numble" value={price} onChange={(e)=> setPrice(e.target.value)}  placeholder="Price" className="w-full py-1 text-xl bg-transparent outline-none border-none ml-2 placeholder:text-gray-400"/>
      </div>

    </div>
   
      <button type="button" className="bg-green-700 text-semibold text-lg mt-3 rounded-md text-white w-full py-2" onClick={saveDetails}>Save</button>
   
      </div>

    </div>
  )
}

export default CreateContainer