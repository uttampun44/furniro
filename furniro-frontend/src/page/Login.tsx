import { Link, useNavigate } from "react-router-dom";
import Backgroundpic from "../components/Backgroundpic";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/ContextProvider";
import Layout from "../layout/Layout";
import Button from "../components/Button";
import InputField from "../components/InputField";

interface FormLogin {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const context = useContext(Context);

  const [login, setLogin] = useState<FormLogin>({
    email: "",
    password: "",
  });

  const [errors, setError] = useState<{ [key: string]: string[] }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", login, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        localStorage.setItem("Token", response.data.token);
        context?.setToken(response.data.token);
        context?.setUser(JSON.stringify(response.data.user_profile.id));
        navigate("/user");
      }
    } catch (error: any) {
      setError(error.response.data.errors);
    }
  };

  return (
    <Layout>
      <Backgroundpic />
      <div className="login-content my-20 max-w-[1080px] mx-auto">
        <div className="form-content">
          <form
            className="max-w-sm mx-auto"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <InputField
                type="email"
                onChange={handleInputChange}
                value={login.email}
                label="Your Email"
                className={{
                  label: "block mb-2 text-sm font-medium text-gray-900",
                  input:
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 placeholder-gray-400",
                }}
                name="email"
              />

              {errors.email && (
                <label className="block text-red-700 font-normal text-lg">
                  {errors.email}
                </label>
              )}
            </div>
            <div className="mb-5">
              <InputField
                type="password"
                onChange={handleInputChange}
                value={login.password}
                label="Your Password"
                className={{
                  label: "block mb-2 text-sm font-medium text-gray-900",
                  input:
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 placeholder-gray-400",
                }}
                name="password"
              />
                  {errors.password && (
                  <label className="block text-red-700 font-normal text-lg">
                    {errors.password}
                  </label>
                )}
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <InputField
                  label="Remember Me"
                  name="rememberMe"
                  type="checkbox"
                  className={{
                    input:
                      "w-4 h-4 border rounded bg-gray-100 focus:ring-blue-600",
                    label: "block",
                  }}
                  onChange={() => {}}
                 
                />

            
              </div>
            </div>
            <div className="flex-button flex gap-x-4">
              <Button
                type="submit"
                value="Submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              />
              <Link
                to="/signup"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Signup
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
