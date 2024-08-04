import { Link, useParams } from "react-router-dom"
import Button from "../../../components/Button"
import InputField from "../../../components/InputField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import TopNavigation from "../../../components/TopNavigation"
import BackendSidebar from "../../../components/BackendSidebar"
import axios from "axios"
import { useEffect, useState } from "react"


interface Role {
    id: number;
    role_name: string;
  }
  
interface User{
name:string,
email:string
}  
interface userDetails  {
    user:User,
    password: string;
    date_of_birth: string;
    image: File;
    gender: string;
    address: string;
    telephone: number;
    mobile: number;
    role:Role
  };

  
const UserEdit:React.FC = () =>{
    
    const {id} = useParams<{id:string}>()

    const [userValue, setUserValue] = useState<userDetails | null>(null);

    console.log(userValue)

    const {control, handleSubmit} = useForm<userDetails>()
    
    const onSubmit:SubmitHandler<userDetails> = async(data) => {
        console.log(data)
    }

    const fetchSingleUser = async() =>{
        const response = await axios.get(`/api/user/edit/${id}`, {
            headers:{
                "Accept" : 'application/json'
            }
        })

        // console.log(response.data.single_user_data)

        if(response.status === 200) setUserValue(response.data.single_user_data)
    }

    useEffect(() =>{
     fetchSingleUser()
    }, [id, setUserValue])

    return(
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
                    // defaultValue={userValue?.user.name}
                    render={({ field}) => (
                      <InputField
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        label="Full Name"
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                
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
                  
                </div>
                <div className="password">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field}) => (
                      <InputField
                        type="password"
                        value={field.value}
                        onChange={field.onChange}
                        label="Password"
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                 
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
                      {/* {roles.map((role, index) => (
                        <option key={index} value={role.id}>
                          {role.role_name}
                        </option>
                      ))} */}
                    </select>
                   </>
                )}
                 />
                 
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
    )
}

export default UserEdit