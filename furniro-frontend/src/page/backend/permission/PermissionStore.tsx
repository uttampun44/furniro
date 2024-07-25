import { Link } from "react-router-dom"
import BackendSidebar from "../../../components/BackendSidebar"
import TopNavigation from "../../../components/TopNavigation"
import Button from "../../../components/Button"
import InputField from "../../../components/InputField"
import { Controller, SubmitHandler, useForm } from "react-hook-form"


type permissionType = {
    permission_name: string
}
const PermissionAdd:React.FC = () =>{

    const {handleSubmit, control} = useForm();

    const onSubmit: SubmitHandler<permissionType> = async(data) => {
      try {
        
      } catch (error) {
        
      }
    }
    
    return(
        <>
        <TopNavigation />
        <BackendSidebar />
        <div className="permission_container   pl-20 h-[100vh] max-h-full">
        <div className="permissionStore pl-10 pr-4 py-12 my-20 bg-gray-700 ml-48 mr-8">
          <div className="permission_title">
            <h1 className="text-white text-2xl font-bold">Pemission Title</h1>
          </div>
          <div className="sm:rounded-lg my-2">
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="role_name"
                control={control}
                render={({ field : { onChange}}) => (
                  <InputField
                  
                    onChange={onChange}
                    label="Role Name"
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
                  value="Create Role"
                  className="bg-blue-800 text-white p-2 w-36  text-center rounded-md cursor-pointer"
                />
                <Link
                  to="/permission"
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

export default PermissionAdd