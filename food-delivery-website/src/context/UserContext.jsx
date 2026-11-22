import React, { createContext, useState } from 'react';
import { food_items } from '../food';
export const DataContext = createContext(); 

function UserContext({ children }) {
  let [cate,setCate]=useState(food_items)
  const [input, setInput] = useState("");
  let [showCart,setShowCart] = useState(false)
  return (
    <DataContext.Provider value={{ input, setInput,cate ,setCate, showCart , setShowCart}}>
      {children}
    </DataContext.Provider>
  );
}

export default UserContext;
