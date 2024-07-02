import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './page/Home'
import About from './page/About'
import Shop from './page/Shop'
import Contact from './page/Contact'
import Login from './page/Login'
import Singup from './page/Signup'
import Dashboard from './page/Dashboard'
import User from './page/User'

function App() {


  return (
    <>
        <BrowserRouter>
             <Routes>
                 <Route  path='/' Component={Home}></Route>
                 <Route  path='/about' Component={About}></Route>
                 <Route  path='/shop' Component={Shop}></Route>
                 <Route  path='/contact' Component={Contact}></Route>
                 <Route  path='/login' Component={Login}></Route>
                 <Route  path='/signup' Component={Singup}></Route>
                 <Route  path='/dashboard' Component={Dashboard}></Route>
                 <Route path='/users' Component={User}></Route>
             </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
