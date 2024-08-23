import React from "react"
import TopNavigation from "@components/TopNavigation"
import Sidebaruser from "@components/Sidebar"

const Userorder:React.FC = () =>{
    const link =[
        {
            name: 'Dashboard', path: "/user"
        },
        {
            name: 'Profile', path: "/profile"
        },
        {
            name: 'Update Profile', path: "/update-profile"
        },
        {
            name: 'Orders', path: "/orders"
        }
      ]

      
   return(
    <div>
        <TopNavigation />
        <Sidebaruser sidebarLink={link}/>
    </div>
   )
}

export default Userorder