import { Link} from "react-router-dom";
import Logo from '../assets/images/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Links from '../types/Navlink'
import { useAppSelector } from "../../app/hook";
import SideMenu from "./SideMenu";
import { useState } from "react";


const Header:React.FC = () => {

  const cart = useAppSelector(state => state.product.cart);

const cartTotal = cart.length

const [showVisibility, setVisibility] = useState<boolean>(false)

const handleShow = (e: React.MouseEvent<HTMLDivElement>) =>{
  setVisibility(showVisibility => !showVisibility)
}
const handleHide = () =>{
  setVisibility(false)
}

  return (
    
      <header>
        <div className="header-row max-w-[1440px]  mx-auto flex justify-between my-4 items-center">
          <div className="header-logo flex ">
            <img src={Logo}  alt="logo" style={{width:'30px', height: '30px'}} /><Link to='/'><h1 className="text-2xl font-bold">Furniro</h1></Link>
          </div>
          <div className="header-login-row ">
            <nav>
              <ul className="flex list-unstyled gap-x-10">
                {
                  Links.map((link, index) => (
                    <li key={index}>
                         <Link to={link.path} className="text-xl font-medium text-decoration-none text-dark">
                      {link.name}
                    </Link>
                    </li>
                  ))
                }
             
              </ul>
            </nav>
          </div>

          <div className="header-login-signup flex justify-end gap-x-4">
            <div className="account-circle">
               <AccountCircleIcon className="cursor-pointer" />
            </div>
            <div className="search">
               <SearchIcon className="cursor-pointer" />
            </div>
             <div className="favourite">
               <FavoriteIcon className="cursor-pointer" />
             </div>
             <div className="cart" onClick={handleShow}>
                 {cart.length > 0 && <span className="text-red-700">{cartTotal}</span>}
                <ShoppingCartIcon className="cursor-pointer"/>
             </div>
          </div>
          <SideMenu
            show={showVisibility}
            onClick={handleHide}
          />
        </div>
      </header>
  );
}

export default Header;
