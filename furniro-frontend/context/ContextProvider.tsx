import React, { useState, ReactNode, createContext } from 'react';

type ContextProviderProps = {
    children?: ReactNode
}
type ContextValueType = {
   isAuthenticated: boolean;
   setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}
type user={
   curentUser: string,
   token:string
}

type loginForm = {
   email:string,
   password:string
}

const Context = createContext<ContextValueType | undefined>(undefined);


const ContextProvider = ({children}:ContextProviderProps) =>{

    
    const [isAuthenticated, setAuthenticated] = useState(false);

  return(
     <Context.Provider value={{isAuthenticated, setAuthenticated}}>
        {children}
     </Context.Provider>
  )
}
export default ContextProvider
export { Context };