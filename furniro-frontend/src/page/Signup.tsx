import Backgroundpic from "../components/Backgroundpic";
import Footer from "../components/Footer";
import Header from "../components/Header";

function Singup() {
  return (
    <div>
      <Header />

      <main>
        <Backgroundpic />

        <div className="signup_form my-20 max-w-[1080px] mx-auto">
          <div className="form_content">
            <form className="max-w-sm mx-auto" method="POST">
              <div className="mb-5">
                <label
                  htmlFor="fullname"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Full name
                </label>
                <input
                  type="email"
                  id="fullname"
                  name="fullname"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 placeholder-gray-400"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="bg-gray-100 border  border-gray-300 outline-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400"
                  required
                />
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
                  required
                />
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
                  required
                />
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
                  className="bg-gray-100 border  border-gray-300 outline-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
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
                  id="phone_details"
                  name="password"
                  className="bg-gray-100 border  border-gray-300 outline-none  text-gray-900 text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400"
                  required
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

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Singup;
