import Header from "../components/Header";
import Homebg from "../assets/images/home_bg.png";
import { Link } from "react-router-dom";

function Home() {
  const header = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Login", path: "/login" },
  ];
  return (
    <div>
      <Header links={header} />
      <div
        className="bg-home pt-44 pb-32 h-[810px]"
        style={{
          backgroundImage: `url(${Homebg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: 'center center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="home_main_content relative max-w-[1440px] mx-auto ">
          <div className="discover_collection">
            <div className="home_row flex">
              <div className="home_one w-[45%]"></div>
              <div className="home_two w-[55%] bg-[#FFF3E3] py-6 pl-6 pr-32 ">
                <strong>
                  <span className="text-primary_button text-xl my-4 font-poppins font-normal">New Arrival</span>
                  <h1 className="text-5xl font-bold text-primary_button my-4 text-uppercase font-poppins">Discover Our<br></br> New Collection</h1>
                  <p className="text-primary_button text-base my-4 font-poppins font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem amet dicta ipsam quis, cumque aliquid excepturi
                    fugit dolorum illum accusantium.
                  </p>
                </strong>

                <div className="button bg-primary_button p-4 text-center w-44">
                    <Link to='/shop' className="font-bold font-poppins text-white">Buy Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
