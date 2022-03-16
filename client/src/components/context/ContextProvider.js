import React, { createContext, useState } from 'react'

export const adddata= createContext("");
export const updatedata= createContext("");
export const deldata= createContext("");

const ContextProvider = ({children}) => {

    const [udata,setudata]= useState("");
    const [updata,setupdata]= useState("");
    const [dltdata,setdltdata]= useState("");
  return (
    <adddata.Provider value={{udata,setudata}}>
        <updatedata.Provider value={{updata,setupdata}}>
            <deldata.Provider value={{dltdata,setdltdata}}>
            {children}
            </deldata.Provider>
        
        </updatedata.Provider>
       
    </adddata.Provider>
  )
}

export default ContextProvider
