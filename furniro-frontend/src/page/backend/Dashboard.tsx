import React from "react"
import BackendSidebar from "../../components/BackendSidebar";
import TopNavigation from "../../components/TopNavigation";


const Dashboard:React.FC = () =>{


  return(
    <div>
      <TopNavigation />
        <BackendSidebar />
    </div>
  )
}
export default Dashboard