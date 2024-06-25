import { Link } from "react-router-dom";
import Logo from '../assets/images/logo.png'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface linkType {
  links:{
    name: string,
    path: string
  }[]
}



function Header(props : linkType) {
  return (
    <div>
      <header>
        <div className="header-row max-w-[1440px]  mx-auto flex justify-between my-4 items-center">
          <div className="header-logo flex w-[33.3%]">
            <img src={Logo}  alt="logo" style={{width:'30px', height: '30px'}} /><Link to='/'><h1 className="text-2xl font-bold">Furniro</h1></Link>
          </div>
          <div className="header-login-row w-[33.3%]">
            <nav>
              <ul className="flex list-unstyled gap-x-4">
                {
                  props.links.map((link, index) => (
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

          <div className="header-login-signup w-[33.3%] flex justify-end gap-x-4">
            <div className="account-circle">
               <AccountCircleIcon />
            </div>
            <div className="search">
               <SearchIcon />
            </div>
             <div className="favourite">
               <FavoriteIcon />
             </div>
             <div className="cart">
                <ShoppingCartIcon />
             </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
