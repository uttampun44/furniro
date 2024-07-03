import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Shop from "./page/Shop";
import Contact from "./page/Contact";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Dashboard from "./page/Dashboard";
import User from "./page/User";
import { useState } from "react";
import UserDashboard from "./page/UserDashboard";

function App() {
  const [isLogin, setLogins] = useState<boolean>(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setLogins={setLogins} />} />
          <Route path="/signup" element={<Signup />} />
          {/* <Route path='/dashboard' element={isLogin ? <Dashboard /> : <Navigate to="/login" />} /> */}
          <Route
            path="/users"
            element={isLogin ? <UserDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
