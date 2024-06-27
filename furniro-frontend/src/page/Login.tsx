import Backgroundpic from '../components/Backgroundpic'
import Header from '../components/Header'


const header = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Login', path: '/login' }
]

function Login() {
  return (
    <div>
      <Header links={header} />
      <Backgroundpic />

      <div className="login-content my-20 max-w-[1080px] mx-auto">
        <div className="form-content">


          <form className="max-w-sm mx-auto" method='POST'>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400"  required />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
              <input type="password" id="password" name='password' className="bg-gray-100 border  text-gray-900 text-sm rounded-lg  block w-full p-2.5 placeholder-gray-400" required />
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input id="remember" type="checkbox" value="" className="w-4 h-4 border rounded bg-gray-100  focus:ring-blue-600 " required />
              </div>
              <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login