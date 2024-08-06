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

interface Permission {
  id: number;
  permission_name: string;
}

const RoleEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { handleSubmit, control, setValue } = useForm<roleEdit>({
    defaultValues: {
      role_name: "",
    },
  });

  const [permissions, setPermission] = useState<Permission[]>([]);

  const onSubmit: SubmitHandler<roleEdit> = async (data) => {
    try {
      const response = await axios.put(`/api/roles/update/${id}`, data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      if (response.status === 200) {
        alert("Permission Created");
        navigate("/roles");
      }
    } catch (error: any) {
     
    }
  };

  const fetRolesEdit = async () => {
    const response = await axios.get(`/api/roles/edit/${id}`);

    if (response.status === 200) {
      setValue("role_name", response.data.roles_edit.role_name);
      setPermission(response.data.permission);
    }
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
            <h1 className="text-white text-2xl font-bold">Role Permission</h1>
          </div>
          <div className="sm:rounded-lg my-2">
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              {permissions.map((permission, key) => (
                <Controller
                  key={key}
                  name="role_name"
                  control={control}
                  render={({ field }) => (
                    <InputField
                      type="checkbox"
                      value={permission.id}
                      onChange={(e) => field.onChange(e.target.checked)}
                      label={permission.permission_name}
                      className={{
                        label: "text-white text-lg font-normal block",
                        input: "rounded-md my-1 py-2 font-medium text-center",
                      }}
                    />
                  )}
                />
              ))}

              <Controller
                name="role_id"
                control={control}
                render={({ field }) => (
                  <InputField
                    type="hidden"
                    value={field.value}
                    onChange={field.onChange}
                    className={{
                      label: "text-white text-lg font-normal block",
                      input: "rounded-md my-1 py-2 font-medium text-center",
                    }}
                  />
                )}
              />

              <div className="btnRow my-4 flex gap-x-2">
                <Button
                  type="submit"
                  value="Permission Allow"
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
