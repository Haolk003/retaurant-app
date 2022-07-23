import { AnimatePresence } from 'framer-motion'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header,MainContainer,CreateContainer } from './Component'
import { useDispatch,useSelector } from 'react-redux';
import { FoodAction } from './store/foodItem-auth';
import { getAllFoodItems } from './utils/firebaseFunc';

const App = () => {
  const dispatch=useDispatch();
  const AddItems=()=>{
    getAllFoodItems().then((item)=>{
      dispatch(FoodAction.addData(item));     
    })
  }

  useEffect(()=>{
    AddItems();
  },[dispatch])
  return (
    <AnimatePresence exitBeforeEnter>

   
    <div className='w-screen flex flex-col bg-Primary'>
      <Header />
      <main className='mt-24 px-8 py-2 w-full'>
      <Routes>
        <Route path='/' element={  <MainContainer />} />  
        <Route path="/createItem" element={<CreateContainer />} />   
       </Routes>
       </main>
    </div>
     </AnimatePresence>
  )
}

export default App;