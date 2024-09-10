import { useContext, useEffect, useState } from "react";
import TopNavigation from "@components/TopNavigation";
import Sidebaruser from "@components/Sidebar";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Context } from "../../context/ContextProvider";


interface Country {
  country: string;
}

type City = {
  city:string
}

type Inputs = {
    address_line_one:string,
    address_line_two:string,
    city:string
    postalcode:string,
    image:string,
    country:string,
    telephone:string,
    mobile:string,  
  }

const Userupdateprofile: React.FC = () => {

  const context = useContext(Context);

  const token = context?.token;
  const user_id = context?.user;


    const link =[
        {
            name: 'Dashboard', path: "/user"
        },
        {
            name: 'Profile', path: "/profile"
        },
        {
            name: 'Update Profile', path: "/update-profile"
        },
        {
            name: 'Orders', path: "/orders"
        }
      ]

      const [country, setCountry] = useState<Country []>([]);
      const [city, setCity] = useState<City []>([]);
    

      const {register,handleSubmit, formState: {errors}} = useForm<Inputs>();

      const onSubmit:SubmitHandler<Inputs> = (data) => {

        const formData = new FormData();
          formData.append('address_line_one', data.address_line_one);
          formData.append('address_line_two', data.address_line_two);
          formData.append('city', data.city);
          formData.append('postal_code', data.postalcode);
          formData.append('image', data.image[0]); 
          formData.append('country', data.country);
          formData.append('telephone', data.telephone);
          formData.append('mobile', data.mobile);
          formData.append('_method', 'PUT');

              axios.post(`/api/update-profile/${user_id}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                   'Authorization': `Bearer ${token}`
                  }
              })
      }

      const fetcthCountries = async() =>{
        await axios.get('https://countriesnow.space/api/v0.1/countries/population/cities')
        .then((response) =>{
          if(response.status == 200){
             setCountry(response.data.data)
             setCity(response.data.data)
          }
        })
        .catch( function(error){
           throw new Error
        })
      }

      
      useEffect(() => {
        fetcthCountries()
         
      }, [])

     
  return (
    <div className=" bg-gray-300 h-[100vh]">
      <TopNavigation />
      <Sidebaruser sidebarLink={link}/>

      <div className="update-profile bg-white max-w-2xl py-8 mx-auto my-8 shadow overflow-hidden sm:rounded-lg">
        <h1 className="text-2xl font-bold text-center my-2">Update Profile</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)} method="POST" encType="multipart/form-data">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              {...register('address_line_one', {required: true})}
            
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
           
            />
            {errors.address_line_one && <span className="text-red-700">This Field is required</span>}
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address One
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              {...register("address_line_two", {required:true})}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
             
            />
               {errors.address_line_two && <span className="text-red-700">This Field is required</span>}
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address Two
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              {...register('postalcode', {required: true})}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
            
            />
             {errors.postalcode && <span className="text-red-700">This Field is required</span>}
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Postal Code
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="file"
               {...register('image', {required:true})}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
           
            />
             {errors.image && <span className="text-red-700">This Field is required</span>}
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Image
            </label>
          </div>
          <div className="grid  md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
                <select {...register('city', {required:true})}  className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  font-medium dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                      <option className="text-lg">Select City</option>
                      {
                        city.map((city, index) => {
                          return(
                            <option key={index} className="font-medium text-lg p-2">{city.city}</option>
                          )
                        })
                      }
                </select>
                {errors.country && <span className="text-red-700">This Field is required</span>}
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>
            </div>
           
          </div>

          <div className="grid  md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
                <select {...register('country', {required:true})}  className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  font-medium dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer">
                      <option className="text-lg">Select Country</option>
                      {
                        country.map((countryData, index) => {
                          return(
                            <option key={index} className="font-medium text-lg p-2">{countryData.country}</option>
                          )
                        })
                      }
                </select>
                {errors.country && <span className="text-red-700">This Field is required</span>}
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Country
              </label>
            </div>
           
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="tel"
                {...register('telephone', {required:true})}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
               
              />
               {errors.telephone && <span className="text-red-700">This Field is required</span>}
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Telephone
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                {...register('mobile', {required:true})}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
             
              />
               {errors.mobile && <span className="text-red-700">This Field is required</span>}
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mobile
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default Userupdateprofile;
