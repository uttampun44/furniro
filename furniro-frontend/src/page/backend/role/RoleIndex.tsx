import { Link } from "react-router-dom";
import BackendSidebar from "../../../components/BackendSidebar"
import TopNavigation from "../../../components/TopNavigation"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../components/Button";
import { Context } from "../../../../context/ContextProvider";

type roles= {
  id:number
  role_name:string
}

const Roleindex:React.FC = () => {

  const context = useContext(Context)
  const token = context?.token;
  
    const [roles, setRoles] = useState<roles []>([])

    
    const fetchRoles = async() => {
   
        const response = await axios.get('api/roles/index', {
            headers:{
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `${token}`
            }
        })

        if(response.status == 200){
            setRoles(response.data.roles)
        }

    }
  
    const deleteRole = async(e: React.MouseEvent<HTMLButtonElement>, id:number) => {
      e.preventDefault()

      try {
        
      const response = await axios.delete(`/api/roles/delete/${id}`, {
        headers:{
          'Accept' : 'application/json',
          "Content-Type": "application/json",
        }
      })
    
      console.log(response)
      if(response.status == 200)
        {
          setRoles((previousRole) => previousRole.filter((role) => role.id != role.id))
          alert("Role Deleted Successfully")
        }
      } catch (error) {
        console.log(`Throw new Error, ${error}`)
      }
    }
    useEffect(() => {
        fetchRoles()
    }, [])
    return(
        <>
        <TopNavigation />
         <BackendSidebar />
         <div className="role_index_container   pl-20 h-[100vh] max-h-full">
        <div className="roleindex pl-10 pr-4 py-12 my-20 bg-gray-700 ml-48 mr-8">
          <div className="add_product_category">
            <Link
              to="/roles/add"
              className="bg-blue-500 text-white p-2 my-2 rounded-md"
            >
              Add Roles
            </Link>
          </div>
          <div className="product_categories_title my-2">
            <h1 className="text-white text-2xl font-bold">
             Roles
            </h1>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                   Roles
                  </th>
                 
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                 
                </tr>
              </thead>
              <tbody>
                 {
                    roles.map((role, index) => {
                        return(
                            <tr key={index}    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4">{index+1}</td>
                                <td className="px-6 py-4">{role.role_name}</td>
                                <td className="px-6 py-4"><Link to={`/roles/edit/${role.id}`} >Edit</Link></td>
                                <td className="px-6 py-4"> 
                                    <Button
                          type="submit"
                     
                          value="Delete"
                          className="font-medium text-blue-600 dark:text-blue-500 no-underline"
                       onClick={(e) => deleteRole(e, role.id)} ></Button></td>
                            </tr>
                        )
                    })
                 }
              </tbody>
            </table>
          </div>
        </div>
      </div>
        </>
    )
}

export default Roleindex