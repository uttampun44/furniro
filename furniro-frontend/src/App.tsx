import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Shop from "./page/Shop";
import Contact from "./page/Contact";
import Login from "./page/Login";
import Signup from "./page/Signup";
import { useEffect, useState } from "react";
import UserDashboard from "./page/UserDashboard";
import ContextProvider from '../context/ContextProvider';


function App() {
  const [isLogin, setLogins] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("Token") ? true : false;
    if (token) {
        setLogins(true);
    }
}, []);

  return (
    <>
   
      <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login setLogins={setLogins} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/users"
            element={isLogin ? <UserDashboard /> : <Navigate to="/login" />}
          />
        </Routes>
        </ContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
