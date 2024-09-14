import { Link } from "react-router-dom";
import BackendSidebar from "@components/BackendSidebar";
import TopNavigation from "@components/TopNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";

interface User {
  id:number,
  name: string;
}

interface userProfile {
  user: User;
  email: string;
  date_of_birth: string;
  image: File;
  gender: string;
  address: string;
  telephone: string;
  mobile: string;
}

const UserIndex: React.FC = () => {
  // const port = import.meta.env.
  const [users, setUser] = useState<userProfile[]>([]);

  // fetching users data
  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/profile", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });


      if (response.status === 200) {
        setUser(response.data.user_profile);
      }
    } catch (error) {}
  };

  const handleDeleteUser = async (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
   
    try {
      e.preventDefault()
      const response = await axios.delete(`/api/user/delete/${id}`, {
        headers: {
          'Accept' : 'application/json',
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      
      if (response.data === 200) {
        setUser((previousUsers) => previousUsers.filter((user) => user.user.id !== user.user.id));
        alert("User Delete Successfully");
        fetchUser();
      }
    } catch (error) {
      throw new Error
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
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
                  {users.map((user, index) => (
                    <tr key={index + 1} >
                 
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{user.user.name}</td>
                      <td className="px-6 py-4">{user.date_of_birth}</td>
                      <td className="px-6 py-4">
                        {" "}
                        {user.image && (
                          <img
                            src={`http://localhost:8000/${user.image}`}
                            className="w-20 h-auto"
                            alt="User"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4">{user.gender}</td>
                      <td className="px-6 py-4">{user.address}</td>
                      <td className="px-6 py-4">{user.telephone}</td>
                      <td className="px-6 py-4">{user.mobile}</td>
                      <td className="px-6 py-4">
                        <Link to={`/users/edit/${user.user.id}`}>
                          <EditNoteIcon style={{ cursor: "pointer" }} />
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <button onClick={(e) => handleDeleteUser(e, user.user.id)}>
                          <DeleteIcon
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
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
