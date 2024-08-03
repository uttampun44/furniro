import axios from "axios";
import BackendSidebar from "../../../components/BackendSidebar";
import InputField from "../../../components/InputField";
import TopNavigation from "../../../components/TopNavigation";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface Role {
  id: number;
  role_name: string;
}

type userInputs = {
  name: string;
  email: string;
  password: string;
  role: number;
  date_of_birth: string;
  image: File;
  gender: string;
  address: string;
  telephone: number;
  mobile: number;
};

const UserStore: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [validationErrors, setValidationErrors] = useState<userInputs>()

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

  const { handleSubmit, control} = useForm<userInputs>();

  const onSubmit: SubmitHandler<userInputs> = async(data) => {
    try {
      
      const response = await axios.post('/api/user/user-store', data, {
        headers:{
          Accept: "application/json", 
          'Content-type': "multipart/form-data"
          
        }
      })
      console.log(response.data)
    } catch (error:any) {
console.log(error.response.data.errors)
      setValidationErrors(error.response.data.errors)
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
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="formGrid grid grid-cols-2 gap-x-4 gap-y-4">
                <div className="name">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="text"
                        onChange={onChange}
                        label="Full Name"
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                 {
                    validationErrors?.name && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors.name}</span>
                    )
                 }
                </div>
                <div className="email">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="email"
                        onChange={onChange}
                        label="Email"
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                  {
                    validationErrors?.email && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors.email}</span>
                    )
                  }
                </div>
                <div className="password">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="password"
                        onChange={onChange}
                        label="Password"
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                  {
                    validationErrors?.password && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors.password}</span>
                    )
                  }
                </div>
                <div className="role ">
                 <Controller 
                   name="role"
                   control={control}
                   render={({field: {onChange}}) => (
                     <>
                     <label className="text-white block mb-2">Role</label>
                    <select
                      className="text-black w-full py-3 px-2 rounded-md"
                     
                      onChange={onChange}
                    >
                        <option  disabled>Choose a role ...</option>
                      {roles.map((role, index) => (
                        <option key={index} value={role.id}>
                          {role.role_name}
                        </option>
                      ))}
                    </select>
                   </>
                )}
                 />
                  {
                    validationErrors?.role && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors.role}</span>
                    )
                  }
                </div>
                <div className="date_of_birth">
                  <Controller
                    name="date_of_birth"
                    control={control}
                    render={({ field: { onChange } }) => (
                     
                      <InputField
                        type="date"
                        onChange={onChange}
                        label="Date Of Birth"
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                  {
                    validationErrors?.date_of_birth && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors.date_of_birth}</span>
                    )
                  }
                </div>
                <div className="image">
                  <Controller
                  name="image"
                  control={control}
                  render={({field: {onChange}}) => (
                    <InputField
                    type="file"
                    onChange={e => onChange(e.target.files?.[0])}
                    label="Image"
                    className={{
                      label: "text-white block mb-2 ",
                      input:
                        "text-black w-full py-3 px-2 rounded-md  border-2 bg-white",
                    }}
                  />
                  )}
                
                  />
                  {
                    validationErrors?.image && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors?.image.type}</span>
                    )
                  }
                </div>
                <div className="gender">
                 
                  <Controller
                  name="gender"
                  control={control}
                  render={({field: {onChange} }) => (
                    <>
                     <label className="text-white block mb-2">Gender</label>
                    <select
                    className="text-black w-full py-3 px-2 rounded-md"
                    onChange={onChange} >
                    <option value="DEFAULT" disabled>Choose a gender ...</option>
                    <option value="Male" >Male</option>
                    <option value="Female">Female</option>
                  </select>

                  </>
                  )}
                 
                  />

                  {
                    validationErrors?.gender && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors?.gender}</span>
                    )
                  }
                </div>
                <div className="address">
                 <Controller 
                  name="address"
                  control={control}
                  render={({field : {onChange}}) =>(
                    <InputField
                    onChange={onChange}
                    type="text"
                
                    label="Address"
                    className={{
                      label: "text-white block mb-2 ",
                      input: "text-black w-full py-3 px-2 rounded-md",
                    }}
                    />
                  )}
                
                 />
                  {
                    validationErrors?.address && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors?.address}</span>
                    )
                  }
                </div>

                <div className="telephone">
                  <Controller 
                  control={control}
                  name="telephone"
                  render={({field: {onChange}}) =>(
                    <InputField
                    onChange={onChange}
                    type="text"
                    label="Telephone"
                    className={{
                      label: "text-white block mb-2 ",
                      input: "text-black w-full py-3 px-2 rounded-md",
                    }}
                  />
                  )}
                 
                  />
                   {
                    validationErrors?.telephone && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors?.telephone}</span>
                    )
                  }
                </div>

                <div className="mobile">
                  <Controller
                  name="mobile"
                  control={control}
                  render={({field: {onChange}}) => (
                    <InputField
                    type="text"
                    label="mobile"
                    onChange={onChange}
                    className={{
                      label: "text-white block mb-2 ",
                      input: "text-black w-full py-3 px21 rounded-md",
                    }}
                  />
                  )}
                 
                  />
                   {
                    validationErrors?.mobile && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors?.mobile}</span>
                    )
                  }
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
