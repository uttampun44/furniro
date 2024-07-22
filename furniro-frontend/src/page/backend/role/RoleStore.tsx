import { Link } from "react-router-dom";
import BackendSidebar from "../../../components/BackendSidebar";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import TopNavigation from "../../../components/TopNavigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../../../context/ContextProvider";

type roleInput = {
  name: string;
};

const RoleStore: React.FC = () => {
  const { register, handleSubmit, control } = useForm<roleInput>();
  const [errors, setErros] = useState<{}>({});

  const context = useContext(Context);
  const token = context?.token;

  const onSubmit: SubmitHandler<roleInput> = async(data) => {
   try {
   const response =  await axios.post('/api/roles/store', data, {
        headers:{
            Accept: 'application/json',
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        }
    })
    console.log(response)
   } catch (error:any) {
     setErros(error.response)
   }
  };

  return (
    <>
      <TopNavigation />
      <BackendSidebar />
      <div className="role_store_container   pl-20 h-[100vh] max-h-full">
        <div className="roleStore pl-10 pr-4 py-12 my-20 bg-gray-700 ml-48 mr-8">
          <div className="roles_title">
            <h1 className="text-white text-2xl font-bold">Role Title</h1>
          </div>
          <div className="sm:rounded-lg my-2">
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                render={({ field : { onChange}}) => (
                  <InputField
                  {...register('name')}
                    onChange={onChange}
                    label="Role Name"
                    className={{
                      label: "text-white text-lg font-normal block",
                      input: "rounded-md my-1 py-2 font-medium",
                    }}
                  />
                )}
              />
              <div className="btnRow my-4 flex gap-x-2">
                <Button
                  type="submit"
                  value="Create Role"
                  className="bg-blue-800 text-white p-2 w-36  text-center rounded-md cursor-pointer"
                />
                <Link
                  to="/roles"
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

export default RoleStore;
