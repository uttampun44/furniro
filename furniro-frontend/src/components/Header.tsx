import { Link} from "react-router-dom";
import Logo from '../assets/images/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Links from './Navlink'
import React from "react";


const Header:React.FC = () => {
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
             <div className="cart">
                <ShoppingCartIcon className="cursor-pointer" />
             </div>
          </div>
        </div>
      </header>
  );
}

export default Header;
