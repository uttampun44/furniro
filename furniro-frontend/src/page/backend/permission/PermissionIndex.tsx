import { Link} from "react-router-dom";
import BackendSidebar from "../../../components/BackendSidebar";
import TopNavigation from "../../../components/TopNavigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../../../components/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import InputField from "../../../components/InputField";

type permission = {
  id: number;
  permission_name: string;
  permission_slug: string;
};

const PermissionIndex: React.FC = () => {

  const [permissions, setPermission] = useState<permission[]>([]);
  const [permissionEdit, setPermissionEdit] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>('')
  const { handleSubmit, control, reset, setValue } = useForm<permission>({
    defaultValues: { permission_name: "" },
  });

// fetching permission data from backend laravel
  const fetchPermission = async () => {
    try {
      const response = await axios.get("/api/permission/index", {
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status == 200) setPermission(response.data.permission_index);
    } catch (error) {
      console.log(error);
    }
  };

  // delete function to delete permission
  const permissionDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`/api/permission/delete/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200){
        setPermission((previousPermission) =>
          previousPermission.filter(
            (permission) => permission.id != permission.id
          )
        );
      alert("Permission Delete");
      fetchPermission()
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update method of permission
  const onSubmit: SubmitHandler<permission> = async (data) => {
   
    try {
       await axios.put(`/api/permission/edit/${data.id}`,data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      fetchPermission()
     
    } catch (error:any) {
      console.log(error)
     
    }
  };

  // fetching edit method from backend laravel 
  const fetchPermissionEdit = async(id:number) =>{
   try {
    const response = await axios.get(`/api/permission/edit/${id}`)
    if(response.status == 200){
   
      reset({ id: response.data.permissionEdit.id, permission_name: response.data.permission_name });
      setValue("permission_name",response.data.permissionEdit.permission_name)
    }
   } catch (error:any) {
      throw new error
   }
  }
  const permissionEditModal = (e: React.MouseEvent<HTMLButtonElement>, id:number) => {
    e.preventDefault();
    setPermissionEdit(!permissionEdit);
    fetchPermissionEdit(id);
  };

  const closeModal = (e: React.MouseEvent<HTMLSpanElement>) => {
    setPermissionEdit(false);
  };
  useEffect(() => {
    fetchPermission();
   
  }, []);

 
  return (
    <>
      <TopNavigation />
      <BackendSidebar />
      {permissionEdit && (
        <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
      )}
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
            <h1 className="text-white text-2xl font-bold">Permission</h1>
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
                {permissions.map((permission, index) => {
                  return (
                    <tr key={index} className="border border-whe">
                      <td className="p-6">{index + 1}</td>
                      <td className="p-6">{permission.permission_name}</td>
                      <td>
                        <Button
                          type="submit"
                          value="Edit"
                          onClick={(e) => permissionEditModal(e, permission.id)}
                        ></Button>
                      </td>
                      <td>
                        <Button
                          type="submit"
                          value="Delete"
                          onClick={(e) => permissionDelete(e, permission.id)}
                        ></Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {permissionEdit && (
            <div className="permission_update block absolute top-[50%] left-[50%] ml-[-150px] mt-[-150px] z-[999]">
              <div className="permission_edit_container   pl-20 relative">
                <div className="closeBtn absolute right-0 top-[-30px]">
                  <span
                    className="text-lg text-white text-end font-bold cursor-pointer"
                    onClick={(e) => closeModal(e)}
                  >
                   
                    X
                  </span>
                </div>
                <div className="permissionStore p-10 bg-gray-700">
                  <div className="permission_title">
                    <h1 className="text-white text-2xl font-bold">
                      Permission Update
                    </h1>
                  </div>
                  <div className="sm:rounded-lg my-2">
                    <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                      <Controller
                        name="permission_name"
                        control={control}
                        render={({ field }) => (
                          <InputField
                            value={field.value}
                            onChange={field.onChange}
                            
                            label="Permission Name"
                            className={{
                              label: "text-white text-lg font-normal block",
                              input:
                                "rounded-md my-1 py-2 font-medium text-center",
                            }}
                          />
                        )}
                      />

                      <div className="btnRow my-4">
                        <Button
                          type="submit"
                          value="Update Role"
                          className="bg-blue-800 text-white p-2 w-36  text-center rounded-md cursor-pointer"
                        />
                     
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default PermissionIndex;
