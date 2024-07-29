import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../../components/Button";
import TopNavigation from "../../../components/TopNavigation";
import BackendSidebar from "../../../components/BackendSidebar";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import InputField from "../../../components/InputField";
import axios from "axios";

type roleEdit = {
  role_name: string;
};

const RoleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { handleSubmit, control, setValue } = useForm<roleEdit>({
    defaultValues: {
      role_name: "",
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const onSubmit: SubmitHandler<roleEdit> = async (data) => {
    try {
      const response = await axios.put(`/api/roles/update/${id}`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(response)
      if (response.status == 200) {
        alert("Roles updated");
        navigate("/roles");
      }
     
      
    } catch (error: any) {
      setErrors(error.response.data.errors);
    }
  }

  const fetRolesEdit = async () => {
    const response = await axios.get(`/api/roles/edit/${id}`);

    if (response.status == 200) setValue("role_name", response.data.roles_edit.role_name);
    
  };
  useEffect(() => {
    fetRolesEdit();
  }, [id, setValue]);

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
                name="role_name"
                control={control}
                render={({ field }) => (
                  <InputField
                    value={field.value}
                    onChange={field.onChange}
                    label="Role Name"
                    className={{
                      label: "text-white text-lg font-normal block",
                      input: "rounded-md my-1 py-2 font-medium text-center",
                    }}
                  />
                )}
              />
              {/* {errors.name && (
                <span className="text-red-700 my-1 block">{errors.name}</span>
              )} */}
              <div className="btnRow my-4 flex gap-x-2">
                <Button
                  type="submit"
                  value="Update Role"
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

export default RoleEdit;
