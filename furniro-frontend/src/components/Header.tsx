import { Link } from "react-router-dom";
import Logo from '../assets/images/logo.png'

function Header() {
  return (
    <div>
      <header>
        <div className="header-row container-lg mx-auto row justify-space-between align-items-center">
          <div className="header-logo d-flex col-lg-3">
            <img src={Logo}  alt="logo" style={{width:'50px', height: '50px', objectFit: 'contain'}} /><h1>Furniro</h1>
          </div>
          <div className="header-login-row col-lg-3">
            <nav>
              <ul className="d-flex list-none">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-login-signup col-lg-6">
            cart
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
