import React, { useState, ReactNode, createContext, useEffect } from 'react';

type ContextProviderProps = {
    children?: ReactNode
}

type ContextValueType = {
   user?:string | null
   token:string | null,
   setToken:React.Dispatch<React.SetStateAction<string | null>>
   setUser:React.Dispatch<React.SetStateAction<string | null>>
}


const Context = createContext<ContextValueType | undefined>(undefined);


const ContextProvider = ({children}:ContextProviderProps) =>{

   const [token, setToken] = useState<string | null>(() => {
      return localStorage.getItem("Token");
  });
  const [user, setUser] =  useState<string | null>(() =>{
 return localStorage.getItem("User")
  });

  console.log(user)
 
    useEffect(() => {
      try {
      
         if (token) {
          localStorage.setItem("Token", token);
          setToken(token);
         }else{
            localStorage.removeItem("Token")
         }

         if(user){
            localStorage.setItem("User", user);
            setUser(user);
         }else{
            localStorage.removeItem("User");
         }
            
       } catch (error) {
         // console.error("Error parsing JSON from localStorage:", error);
       }
    }, [token, user])

 
  return(
     <Context.Provider value={{user, token, setToken, setUser}}>
        {children}
     </Context.Provider>
  )
}
export default ContextProvider
export { Context };