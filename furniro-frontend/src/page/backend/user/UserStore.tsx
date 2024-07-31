import axios from "axios";
import BackendSidebar from "../../../components/BackendSidebar";
import InputField from "../../../components/InputField";
import TopNavigation from "../../../components/TopNavigation";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";

interface Role {
  id: number;
  role_name: string;
}

const UserStore: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("/api/user/user-roles", {
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 200) setRoles(response.data.roles);
    } catch (error: any) {
      if (!(error instanceof Error)) {
        error = new Error(error);
      }
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <>
      <TopNavigation />
      <BackendSidebar />
      <div className="userStoreContainer">
        <div className="user_store_container   pl-20 h-[100vh] max-h-full">
          <div className="userstore pl-10 pr-4 py-12 my-20 bg-gray-700 ml-48 mr-8">
            <h1 className="text-white my-4 font-bold text-xl">Create User</h1>
            <form>
              <div className="formGrid grid grid-cols-2 gap-x-4 gap-y-4">
                <div className="name">
                  <InputField
                    type="text"
                    name="Full Name"
                    label="Full Name"
                    className={{
                      label: "text-white block mb-2",
                      input: "text-black w-full py-3 rounded-md",
                    }}
                  />
                </div>
                <div className="email">
                  <InputField
                    type="email"
                    name="Email"
                    label="Email"
                    className={{
                      label: "text-white block mb-2",
                      input: "text-black w-full py-3 rounded-md",
                    }}
                  />
                </div>
                <div className="password">
                  <InputField
                    type="password"
                    name="Password"
                    label="Password"
                    className={{
                      label: "text-white block mb-2",
                      input: "text-black w-full py-3 rounded-md",
                    }}
                  />
                </div>
                <div className="role ">
                  <label className="text-white block mb-2">Role</label>
                  <select className="text-black w-full py-3 rounded-md">
                    {roles.map((role, index) => (
                      <option key={index} value={role.id}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="date_of_birth">
                  <InputField
                    type="date"
                    name="date"
                    label="Date Of Birth"
                    className={{
                      label: "text-white block mb-2",
                      input: "text-black w-full py-3 rounded-md",
                    }}
                  />
                </div>
                <div className="image">
                  <InputField
                    type="file"
                    name="file"
                    label="Image"
                    className={{
                      label: "text-white block mb-2 ",
                      input:
                        "text-black w-full py-3 rounded-md  border-2 bg-white",
                    }}
                  />
                </div>
                <div className="gender">
                  <label className="text-white block mb-2">Gender</label>
                  <select className="text-black w-full py-3 rounded-md">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
                <div className="address">
                  <InputField
                    type="text"
                    name="address"
                    label="Address"
                    className={{
                      label: "text-white block mb-2 ",
                      input: "text-black w-full py-3 rounded-md",
                    }}
                  />
                </div>

                <div className="telephone">
                  <InputField
                    type="text"
                    name="telephone"
                    label="Telephone"
                    className={{
                      label: "text-white block mb-2 ",
                      input: "text-black w-full py-3 rounded-md",
                    }}
                  />
                </div>

                <div className="mobile">
                  <InputField
                    type="text"
                    name="mobile"
                    label="mobile"
                    className={{
                      label: "text-white block mb-2 ",
                      input: "text-black w-full py-3 rounded-md",
                    }}
                  />
                </div>
              </div>

              <div className="btnRow my-4 flex gap-x-2">
                <Button
                  type="submit"
                  value="Create User"
                  className="bg-blue-800 text-white p-2 w-36  text-center rounded-md cursor-pointer"
                />
                <Link
                  to="/users"
                  className="bg-blue-800 text-white p-2 rounded-md cursor-pointer w-36 text-center "
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserStore;
