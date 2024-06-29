import Header from "../components/Header";
import Homebg from "../assets/images/home_bg.png";
import { Link } from "react-router-dom";
import Imageone from '../assets/images/image_one.png'
import Imagetwo from '../assets/images/image_two.png'

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
      <main>
        <section>
          <div
            className="bg-home relative"
          >
          <div className="img_home">
                  <img src={Homebg} className="w-[100%] h-[718px] object-cover" />
          </div>
            <div className="home_main_content max-w-[1440px] mx-auto ">
              <div className="discover_collection grid">
                
                  <div className="home_two absolute bottom-[35%] left-[48%] w-[40%] bg-[#FFF3E3] py-6 pl-6 pr-32 ">
                    <strong>
                      <span className="text-primary_button text-xl my-4 font-poppins font-normal">
                        New Arrival
                      </span>
                      <h1 className="text-5xl font-bold text-primary_button my-4 text-uppercase font-poppins">
                        Discover Our<br></br> New Collection
                      </h1>
                      <p className="text-primary_button text-base my-4 font-poppins font-medium">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatem amet dicta ipsam quis, cumque aliquid
                        excepturi fugit dolorum illum accusantium.
                      </p>
                    </strong>

                    <div className="button bg-primary_button p-4 text-center w-44">
                      <Link
                        to="/shop"
                        className="font-bold font-poppins text-white"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="browse_the_range max-w-[1140px] mx-auto py-16">
              <div className="title_browse text-center">
                   <h2 className="font-poppins text-2xl font-bold">Browse The Range</h2>
                   <p className="font-poppins font-medium text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. At, est?</p>
              </div>

              <div className="proudct_img flex gap-x-4 my-12">
                   <div className="product_img_one">
                       <div className="img_one">
                            <img src={Imageone} />
                       </div>
                       <h3 className="font-poppins text-2xl font-bold text-center" >Dinning</h3>
                   </div>

                   <div className="product_img_two">
                      <div className="img_two">
                          <img src={Imagetwo} />
                      </div>
                      <h3 className="font-poppins text-2xl font-bold text-center" >Dinning</h3>
                   </div>

                   <div className="product_img_three">
                       <div className="img_three">
                       <img src={Imagetwo} />
                       </div>
                      <h3 className="font-poppins text-2xl font-bold text-center" >Dinning</h3>

                   </div>
              </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
