import { Link } from "react-router-dom";
import BackendSidebar from "../../../components/BackendSidebar";
import TopNavigation from "../../../components/TopNavigation";
import { useEffect, useState } from "react";
import axios from "axios";

interface User{
  name:string
  date_of_birth:string
}

const UserIndex: React.FC = () => {

  const [users, setUser] = useState<User[]>([]);

  
  const fetchUser = async() =>{
   try {
    const response = await axios.get('/api/profile',{
      headers:{
        "Accept": 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('Token')}`
      }
     })

   
     if(response.status === 200){
      // console.log(response.data)
      setUser(users)
     }
   } catch (error) {
    
   }
  }

  useEffect(() => {
     fetchUser()
  }, [])
  return (
    <>
      <TopNavigation />
      <BackendSidebar />
      <div className="userContainer">
        <div className="user_index_container   pl-20 h-[100vh] max-h-full">
          <div className="userindex pl-10 pr-4 py-12 my-20 bg-gray-700 ml-48 mr-8">
            <div className="add_product_category">
              <Link
                to="/users/add"
                className="bg-blue-500 text-white p-2 my-2 rounded-md"
              >
                Add User
              </Link>
            </div>
            <div className="role_title my-2">
              <h1 className="text-white text-2xl font-bold">User Detail</h1>
            </div>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S.No
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Date Of Birth
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Gender
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Telephone
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Mobile
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
                    users.map((user, index) => (
                      <tr key={index + 1} >
                            <td>{index + 1}</td>
                            <td>{user.date_of_birth}</td>
                      </tr>
                    )

                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserIndex;
