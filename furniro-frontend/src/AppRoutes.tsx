import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Shop from "./page/Shop";
import Contact from "./page/Contact";
import Login from "./page/Login";
import Signup from "./page/Signup";
import UserDashboard from "./page/UserDashboard";
import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import Profile from "./page/Profile";
import Userupdateprofile from "./page/UserUpdateProfile";
import Userorder from "./page/UserOrder";
import BackendLogin from "./page/backend/BackendLogin";
import Dashboard from "./page/backend/Dashboard";
import ProductCategories from "./page/backend/productcategory/ProductCateogriesIndex";
import ProductCategoriesAdd from "./page/backend/productcategory/ProductCategoriesAdd";
import ProductCategoryEdit from "./page/backend/productcategory/ProductCategoryEdit";
import Roleindex from "./page/backend/role/RoleIndex";
import Rolestore from "./page/backend/role/RoleStore";
import RoleEdit from "./page/backend/role/RoleEdit";
import PermissionIndex from "./page/backend/permission/PermissionIndex";
import PermissionAdd from "./page/backend/permission/PermissionStore";
import PermissionEdit from "./page/backend/permission/PermissionEdit";


const AppRoutes = () => {
  const context = useContext(Context);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/user"
        element={context?.token ? <UserDashboard /> : <Navigate to="/login" />}
      />
      <Route path="/profile" element={<Profile />}>
    
      </Route>
      <Route path="/update-profile/" element={<Userupdateprofile />}></Route>
      <Route path="/orders" element={<Userorder />}></Route>
      <Route path="/furniro-login" element={<BackendLogin />}></Route>
      {/* Product categories */}
      <Route path="/product-categories" element={<ProductCategories />}></Route>
      <Route path="/product-categories/add" element={<ProductCategoriesAdd />}></Route>
      <Route path="/product-categories/edit/:id" element={<ProductCategoryEdit />}></Route>

      {/* roles */}
      <Route path="/roles" element={<Roleindex />}></Route>
      <Route path="/roles/add" element={<Rolestore />}></Route>
      <Route path="/roles/edit/:id" element={<RoleEdit />}></Route>

      {/* permission */}
      <Route path="/permission" element={<PermissionIndex />}></Route>
      <Route path="/permission/add" element={<PermissionAdd />}></Route>
      {/* <Route path="/permission/edit/:id" element={<PermissionEdit />}></Route> */}
      <Route path="/furniro/dashboard" element={context?.token ? <Dashboard /> : <Navigate to="/furniro-login" /> }></Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
