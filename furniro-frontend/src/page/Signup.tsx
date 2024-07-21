import { useState } from "react";
import Backgroundpic from "../components/Backgroundpic";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";

interface formSignup {
  name: string;
  email: string;
  date_of_birth: string;
  phone_details: string;
  gender: string;
  password: string;
}

function Signup() {
  const login = useNavigate();

  const [signup, setSignup] = useState<formSignup>({
    name: "",
    email: "",
    date_of_birth: "",
    phone_details: "",
    gender: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  const signupValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setSignup({
      ...signup,
      [name]: value,
    });
  };

  const signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/signup", signup);

      if (response.status == 201) {
        login("/login");
      }
    } catch (error: any) {
      setErrors(error.response.data.errors);
      
    }
  };

  return (
    <Layout>
      <Backgroundpic />

      <div className="signup_form my-20 max-w-[1080px] mx-auto">
        <div className="form_content">
          <form className="max-w-sm mx-auto" method="POST" onSubmit={signUp}>
            <div className="mb-5">
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Full name
              </label>
              <input
                type="text"
                id="fullname"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 placeholder-gray-400"
              
                onChange={signupValue}
                value={signup.name}
              />
              {errors.name && (
                <label className="block text-red-700 font-normal text-lg">
                  {errors.name}
                </label>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-100 border  border-gray-300 outline-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400"
             
                onChange={signupValue}
                value={signup.email}
              />
              {errors.email && (
                <label className="block text-red-700 font-normal text-lg">
                  {errors.email}
                </label>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="date_of_birth"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Date Of Birth
              </label>
              <input
                type="date"
                id="date_of_birth"
                name="date_of_birth"
                className="bg-gray-100 border  border-gray-300 outline-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400"
            
                onChange={signupValue}
                value={signup.date_of_birth}
              />

              {errors.date_of_birth && (
                <label className="block text-red-700 font-normal text-lg">
                  {errors.date_of_birth}
                </label>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="phonedetails"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Phone Details
              </label>
              <input
                type="text"
                id="phone_details"
                name="phone_details"
                className="bg-gray-100 border  border-gray-300 outline-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400"
               
                onChange={signupValue}
                value={signup.phone_details}
              />
               {errors.phone_details && (
                <label className="block text-red-700 font-normal text-lg">
                  {errors.phone_details}
                </label>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Gender
              </label>
              <select
                name="gender"
                onChange={signupValue}
                className="bg-gray-100 border  border-gray-300 outline-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400"
                value={signup.gender || ""}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              {errors.gender && (
                <label className="block text-red-700 font-normal text-lg">
                  {errors.gender}
                </label>
              )}
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="bg-gray-100 border  border-gray-300 outline-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400"
               
                onChange={signupValue}
                value={signup.password}
              />
               {errors.password && (
                <label className="block text-red-700 font-normal text-lg">
                  {errors.password}
                </label>
              )}
            </div>

            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border rounded bg-gray-100  focus:ring-blue-600 "
                
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
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
    </Layout>
  );
}

export default Signup;
