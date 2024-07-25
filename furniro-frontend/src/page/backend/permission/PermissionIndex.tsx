import { Link } from "react-router-dom"
import BackendSidebar from "../../../components/BackendSidebar"
import TopNavigation from "../../../components/TopNavigation"

const PermissionIndex:React.FC = () =>{
    return(
        <>
        <TopNavigation />
        <BackendSidebar />
        <div className="permission_index_container   pl-20 h-[100vh] max-h-full">
        <div className="permissionindex pl-10 pr-4 py-12 my-20 bg-gray-700 ml-48 mr-8">
          <div className="add_permission">
            <Link
              to="/permission/add"
              className="bg-blue-500 text-white p-2 my-2 rounded-md"
            >
             Add Permission
            </Link>
          </div>
          <div className="permission_title my-2">
            <h1 className="text-white text-2xl font-bold">
            Permission
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
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
        </>
    )
}
export default PermissionIndex