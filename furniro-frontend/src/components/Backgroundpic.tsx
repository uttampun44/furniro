import { useLocation } from 'react-router-dom'
import Mainbg from '../assets/images/bgmain.png'
import Logo from '../assets/images/logo.png'


function Backgroundpic() {

    const location = useLocation();

    const path = location.pathname.replace(/^\//, '');

  return (
    <div className="backgroundImage" style={{ backgroundImage: `url(${Mainbg})`,  backgroundSize: 'cover',  width: '100%'}}>
          <div className="contact-logo py-32 grid justify-center justify-items-center">
               <div className="logo">
                    
                    <img src={Logo} alt='contact_logo'/>
               </div>
               <div className="logo_text">
                  <h1 className='text-5xl font-bold leading-normal'>{path.toUpperCase()}</h1>
               </div>
          </div>
    </div>
  )
}

export default Backgroundpic