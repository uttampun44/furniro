import { Link, useNavigate } from "react-router-dom";
import Backgroundpic from "../components/Backgroundpic";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/ContextProvider";
import Layout from "../layout/Layout";
import Button from "../components/Button";
import InputField from "../components/InputField";

interface formLogin {
  email: string;
  password: string;
}

function Login() {
  const users = useNavigate();

  const context = useContext(Context);

  const [login, setLogin] = useState<formLogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const loginVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const loginForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", login, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        localStorage.setItem("Token", response.data.token);
        context?.setToken(response.data.token);
        context?.setUser(JSON.stringify(response.data.user_profile.id));

        users("/user");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError("Email or Password not matched");
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <Layout>
      <Backgroundpic />
      <div className="login-content my-20 max-w-[1080px] mx-auto">
        <div className="form-content">
          <form className="max-w-sm mx-auto" method="POST" onSubmit={loginForm}>
            <div className="mb-5">
            
              <InputField  type="email" onChange={loginVal} value={login.email} required={true} label="Your Email" className={{label: 'block mb-2 text-sm font-medium text-gray-900', input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 placeholder-gray-400'}} name="email" />
            </div>
            <div className="mb-5">
             
            <InputField  type="password" onChange={loginVal} value={login.password} required={true} label="Your Email" className={{label: 'block mb-2 text-sm font-medium text-gray-900', input: 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 placeholder-gray-400'}} name="password" />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
              
                <InputField label="Remember Me" name="Remember Me" type="checkbox" className={{input: 'w-4 h-4 border rounded bg-gray-100  focus:ring-blue-600 ', label:'block'}} required={true} />
              </div>
             
            </div>
            <div className="flex-button flex gap-x-4">
            
              <Button type="submit" value="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" />
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
