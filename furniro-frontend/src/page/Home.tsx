import Homebg from "../assets/images/home_bg.png";
import { Link } from "react-router-dom";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@components/Button";

type productCateogryList = {
  name: string;
  image: string;
};

interface products  {
 product_name:string,
 price:string,
 short_description:string,
 product_image:string,

}

function Home() {
  const [productList, setProduct] = useState<productCateogryList[]>([]);
  const [products, setProducts] = useState<products[]>([]);

  console.log(products)
  const fetchProductCategory = async () => {
    const data = await axios.get("/api/product-category-list", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (data.status === 200) setProduct(data.data.product_category);
    
  };

  const fetchProduct = async() =>{
    const response = await axios.get("/api/front/products", {
      headers:{
        Accept:"applcation/json"
      }
    })

   if(response.status == 200) setProducts(response.data.products)
  }

  useEffect(() => {
    fetchProductCategory();
    fetchProduct()
  }, []);
  return (
    <Layout>
      <section
        style={{
          backgroundImage: `url(${Homebg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition: "center",
          minHeight: "718px",
        }}
      >
        <div className="bg-home relative">
          <div className="home_main_content max-w-[1440px] mx-auto ">
            <div className="discover_collection flex h-[718px] items-center">
              <div className="home_one w-[45%]"></div>
              <div className="home_two w-[55%]  bg-[#FFF3E3] py-6 pl-6 pr-32 ">
                <strong>
                  <span className="text-primary_button text-xl my-4 font-poppins font-normal">
                    New Arrival
                  </span>
                  <h1 className="text-5xl font-bold text-primary_button my-4 text-uppercase font-poppins">
                    Discover Our<br></br> New Collection
                  </h1>
                  <p className="text-primary_button text-base my-4 font-poppins font-medium">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem amet dicta ipsam quis, cumque aliquid excepturi
                    fugit dolorum illum accusantium.
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
            <h2 className="font-poppins text-2xl font-bold">
              Browse The Range
            </h2>
            <p className="font-poppins font-medium text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. At, est?
            </p>
          </div>

          <div className="proudct_img ">
            <div className="product_categories flex gap-x-4 my-12">
              {productList.map((product, index) => {
                return (
                  <div key={index}>
                    <div className="img_one mb-6">
                      <img src={`http://localhost:8000/${product.image}`} alt={product.name} />
                    </div>
                    <h3 className="font-poppins text-2xl font-semibold text-center">
                      {product.name}
                    </h3>
                  </div>
                
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section>
      <div className="productSectionContainer mb-8 max-w-[1230px] w-full mx-auto">
            <div className="title">
            <h2 className="font-poppins text-center text-2xl font-bold">
              Our Products
            </h2>

            <div className="productGrid grid grid-cols-4 gap-4">
                {
                  products.map((product, index) => (
                    <div className="product my-8 bg-gray-200 bg-opacity-50" key={index} >
                       <div className="productImg">
                       <img  src={`http://localhost:8000/storage/${product.product_image}`} className="w-full h-auto"/>
                       </div>
                      <div className="productDetails grid gap-y-1 px-2 py-3">
                        <h6>{product.product_name}</h6>
                       <strong className="block">{product.short_description}</strong>
                       <strong>{product.price}</strong>
                      </div>

                    </div>
                  ))
                }
            </div>
            </div>
            <div className="buttonExplore">
              <Button value="Show More"/>
            </div>
      </div>
      </section>
    </Layout>
  );
}

export default Home;
