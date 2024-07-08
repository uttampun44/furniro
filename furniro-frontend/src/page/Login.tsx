import { Link, useNavigate } from "react-router-dom";
import Backgroundpic from "../components/Backgroundpic";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../context/ContextProvider";

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
        context?.setUser(JSON.stringify(response.data.user_profile.id))
       
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
    <div>
      <Header />
      <main>
        <Backgroundpic />
        <div className="login-content my-20 max-w-[1080px] mx-auto">
          <div className="form-content">
            <form
              className="max-w-sm mx-auto"
              method="POST"
              onSubmit={loginForm}
            >
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 placeholder-gray-400"
                  required
                  onChange={loginVal}
                  value={login.email}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="bg-gray-100 border  border-gray-300 outline-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400"
                  required
                  onChange={loginVal}
                  value={login.password}
                />
              </div>
              <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border rounded bg-gray-100  focus:ring-blue-600 "
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <div className="flex-button flex gap-x-4">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
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
      </main>

      <Footer />
    </div>
  );
}

export default Login;
