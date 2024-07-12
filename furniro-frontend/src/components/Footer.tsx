import { Link } from "react-router-dom"
import Links from '../types/Navlink'

const Footer:React.FC = () => {
  return (
    <div className="border-t-slate-400 border-2">
      <footer>
        <div className="footer-row max-w-[1440px]  mx-auto flex justify-between py-14">
          <div className="footer_title p-2">
            <div className="title">
              <h1 className="font-bold text-2xl">Furnio .</h1>
            </div>
            <div className="footer_address my-4">
              <address className="text-lg font-normal not-italic text-gray-400">
                400 University Drive Suite 200 Coral<br></br>
                Gables,
                FL 33134 USA
              </address>
            </div>

          </div>

          <div className="links">
            <div className="links_title">
              <h2 className="text-slate-400 font-medium text-xl">Link</h2>
            </div>
            <div className="links">
              <ul className="grid gap-y-6 my-4">
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
            </div>
          </div>

          <div className="help">
            <div className="help_title">
              <h2 className="text-slate-400 font-medium text-xl">Help</h2>
            </div>
            <div className="help_links my-4">
              <ul className="grid gap-y-6">
                <li><span className="text-xl font-medium text-decoration-none text-dark">Payment</span></li>
                <li><span className="text-xl font-medium text-decoration-none text-dark">Returns</span></li>
                <li><span className="text-xl font-medium text-decoration-none text-dark">Privacy Policies</span></li>
              </ul>
            </div>
          </div>

          <div className="newsletter">
            <div className="news_letter ">
              <h2 className="text-slate-400 font-medium text-xl">Newsletter</h2>
            </div>
            <div className="newsletter_form my-4 flex gap-x-2">
                <input name="email_address" placeholder="Enter Your Email Address" className="border-t-0 outline-none border-black border-l-0 border-r-0 border-2 "/>
                <button className="text-lg font-bold border-2 border-black border-l-0 border-r-0 border-t-0">Subscribe</button>
            </div>
          </div>
        </div>

        <div className="furnio_copyrights py-10 max-w-[1440px]  mx-auto border-t-2">
           <strong>2024 furnio. All rights reserved</strong>
        </div>
      </footer>
    </div>
  )
}

export default Footer