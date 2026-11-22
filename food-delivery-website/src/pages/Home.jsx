import React, { useContext,useState } from 'react'
import Nav from '../components/Nav'
import { categories } from '../Category'
import Card from '../components/Card'
import { food_items } from '../food'

import { DataContext } from '../context/UserContext'
import { GiCrossedBones } from "react-icons/gi";
import Card2 from '../components/Card2'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Home() {
  let {cate,setCate,input,showCart,setShowCart}=useContext(DataContext)

   function filter(category){
    if(category==="All"){
      setCate(food_items)
    }else{
     let newList = food_items.filter((item)=>(item.food_category===category))
     setCate(newList)
    }
   }

   let items=useSelector((state)=>state.cart)
   
   let subtotal=items.reduce((total,item)=>{
    return total + item.price*item.qty
   },0)

  let deliveryFee=20;
  let taxes=subtotal*0.5/100;
  let total=Math.floor(subtotal+deliveryFee+taxes);


  

  return (
    <div className='bg-slate-200 w-full min-h-[100vh]'>
      <Nav/>
      {!input?<div className='w-[100%]  flex justify-center items-center gap-5 flex-wrap' >
        {categories.map((item)=>{
          return <div className='w-[150px] h-[150px] bg-white flex justify-center items-center rounded-lg shadow-xl flex-col py-2 px-5 gap-1 text-[20px] hover:bg-green-200 cursor-pointer transition-all duration-200 'onClick={()=>filter(item.name)}>
            {item.icon}
            {item.name}
            
          </div>
        })}
      </div>:null}
      
      
      <div className='w-full flex flex-wrap gap-5 px-5 justify-center items-center pt-8 pb-8'>
        {cate.length>1?cate.map((item)=>(
           <Card  name={item.food_name} image={item.food_image} price={item.price} id={item.id} type={item.food_type}/>
        )):<div className='text-2xl font-semibold text-green-400 '>No dish found</div>}
        
      
      </div>
      <div className={`w-[100%r] md:w-[40vw] h-[100vh] overflow-auto fixed top-0 right-0 bg-white shadow-xl p-6 transition-all duration-500 flex flex-col items-center ${showCart?"translate-x-0":"translate-x-full"} `}>
        <header className='w-[100%] flex justify-between items-center  '>
         <span className='text-green-400 text-[18px] font-semibold '>Order items</span>
         <GiCrossedBones className='text-green-400 text-[18px] font-semibold cursor-pointer hover:text-red-950 'onClick={()=>setShowCart(false)} />
        </header>

     {items.length>0?<>
       <div className='w-full mt-8 flex  flex-col gap-5' >
        {items.map((item)=>{
          return <Card2 name={item.name} image={item.image} price={item.price} qty={item.qty} id={item.id}/>
        })}
       </div>
       
       <div className='w-full border-t-2 border-b-2  border-gray-400 mt-7 flex flex-col  gap-2 p-8'>
        <div className='w-full flex justify-between items-center '>
          <span className='text-lg text-grey-600 font-semibold'>Subtotal</span>
          <span className='text-green-400 font-semibold text-lg' >Rs {subtotal}/-</span>
        </div>

        <div className='w-full flex justify-between items-center '>
          <span className='text-lg text-grey-600 font-semibold'>Delivery Fee</span>
          <span className='text-green-400 font-semibold text-lg' >Rs {deliveryFee}/-</span>
        </div>

        <div className='w-full flex justify-between items-center '>
          <span className='text-lg text-grey-600 font-semibold'>Taxes</span>
          <span className='text-green-400 font-semibold text-lg' >Rs {taxes}/-</span>
        </div>
        
       </div>
       <div className='w-full flex justify-between items-center p-9'>
          <span className='text-2xl text-grey-600 font-semibold'>Total</span>
          <span className='text-green-400 font-semibold text-2xl' >Rs {total}/-</span>
          
        </div>
        <button className='w-[80%] p-3 rounded-lg bg-green-500 text-white hover:bg-green-400 transition-all duration-200 ' onClick={()=>{
          toast.success("Order Placed Successfully")
        }}>Place Order</button>
        </>:
        <div className='w-full h-full flex justify-center pt-8'>
          <span className='text-2xl text-green-600 font-semibold'>Your Cart is empty</span>
        </div>}
       
      </div>
    </div>
  )
}

export default Home
