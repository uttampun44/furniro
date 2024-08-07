import React, { useContext } from "react"
import BackendSidebar from "../../components/BackendSidebar";
import TopNavigation from "../../components/TopNavigation";
import { Context } from "../../../context/ContextProvider";

const Dashboard:React.FC = () =>{

  const context = useContext(Context);
 const  permission = context?.permission;

  return(
    <div>
      <TopNavigation />
        <BackendSidebar />
    </div>
  )
}
export default Dashboard