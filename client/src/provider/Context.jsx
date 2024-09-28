import React from 'react'
import { useState, createContext, useContext } from 'react'

const Context = createContext()

function ContextProvider({ children }) 
{
  
  
  return (
    <Context.Provider value={{}}>
      {children}
    </Context.Provider>
  )
}

export default ContextProvider

export const useGlobalContext = () => {
    const context = useContext(Context)
    if (!context) {
        throw new Error('useGlobalContext must be used within a Context.Provider')
    }
    return context

}