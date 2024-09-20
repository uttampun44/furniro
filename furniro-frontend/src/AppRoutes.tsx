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
import UserIndex from "./page/backend/user/UserIndex";
import UserStore from "./page/backend/user/UserStore";
import UserEdit from "./page/backend/user/UserEdit";
import usePermission from '../customHooks/usePermission'
import ProductIndex from "./page/backend/products/ProductIndex";
import ProductStore from "./page/backend/products/ProductStore";
import ProductEdit from "./page/backend/products/ProductEdit";
import SingleProduct from "./page/SingleProduct";
import ProductDescriptionIndex from "./page/backend/productDescription/ProductDescriptionIndex";
import ProductDescriptionStore from "./page/backend/productDescription/ProductDescriptionStore"
import { useAppSelector } from "../app/hook";
import Checkout from "../src/page/Checkout";



const AppRoutes = () => {

  const singleProduct = useAppSelector(state => state.product.selectedProduct)
  const context = useContext(Context);

  const {permissions,} = usePermission()

  const user = context?.user;


   user?.roles.map((permission) => permission.permissions.filter((name) => name.permission_name))

  const hasPermission = (permission:string) => permission?.includes(permission)

  
const hasRoles = user?.roles.some((role) => role.role_name == "Super Admin" || role.role_name == "Admin")
  

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

      

     <Route path="/furniro/dashboard" element={context?.token ? <Dashboard /> : <Navigate to="/furniro-login" /> }></Route>
      

      {/* *************  products  **************** */}
      
      <Route path="/products/index" element={<ProductIndex />}></Route>
      <Route path="/product/store" element={<ProductStore />}></Route>
      <Route path="/product/edit/:id" element={<ProductEdit />}></Route>

      {/* single products */}
     {
      singleProduct  ? (
        <Route path="/products/single-product" element={<SingleProduct/>}></Route>
      ):    <Route path="/" element={<Home />} />
     }

     {/* checkout */}
     <Route path="/checkout" element={<Checkout />} ></Route>
     
     {/* product additional description */}
     <Route path="/products/description" element={<ProductDescriptionIndex/>}></Route>
     <Route path="/products/description/store" element={<ProductDescriptionStore/>}></Route>
      
      {/* user */}
      <Route path="/users" element={<UserIndex />}></Route>
      <Route path="/users/add" element={<UserStore />}></Route>
      <Route path="/users/edit/:id" element={<UserEdit />}></Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
