import Homebg from "../assets/images/home_bg.png";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@components/Button";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import {fetchProducts, Product, viewProduct } from "../../store/Products";
import Card from "@components/Card";
import SecondBg from "../assets/images/furniro_furniture.jpg"

type productCateogryList = {
  name: string;
  image: string;
};

function Home() {
  const [productList, setProduct] = useState<productCateogryList[]>([]);

  const navigate = useNavigate();

  const Products = useAppSelector(state => state.product.products);
  const idle = useAppSelector(state => state.product.status);



  /* use dispatch is used for asynchronous action*/
  const dispatch = useAppDispatch();

  const fetchProductCategory = async () => {
    const data = await axios.get("/api/product-category-list", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (data.status === 200) setProduct(data.data.product_category);
  };

  const handleProduct = (product:Product) =>{
     
      dispatch(viewProduct(product))
       navigate("/products/single-product")
  }

  const handleProductPage = () =>{
    navigate("/shop")
  }

  useEffect(() => {
    fetchProductCategory();
 
    if (idle) {
      dispatch(fetchProducts());
    }
  }, [dispatch]);
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
            <h2 className="font-poppins text-4xl font-bold">
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
                      <img
                        src={`http://localhost:8000/${product.image}`}
                        alt={product.name}
                      />
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
            <h2 className="font-poppins text-center text-4xl font-bold">
              Our Products
            </h2>

            <div className="productGrid grid grid-cols-4 gap-4 cursor-pointer">
              {Products.map((product, index) => (
                <Card
                  title={product.product_name}
                  description={product.short_description}
                  src={`http://localhost:8000/storage/${product.product_image}`}
                  price={product.price}
                  discount_price={product.discount_price}
                  key={index}
                  onClick={() => handleProduct(product)}
                />
              ))}
            </div>
          </div>
          <div className="buttonExplore flex justify-center mb-12">
            <Button value="Show More" className=" border-2  border-[#B88E2F] px-10 py-2 rounded-md" onClick={handleProductPage} />
          </div>
        </div>
      </section>

      <div className="shareFurniture py-14">
          <div className="title text-center pb-10">
               <span className="text-text-secondary-color text-xl font-semibold">Share your setup with</span>
               <h2 className="font-poppins text-center text-4xl font-bold">#Furniro Furniture</h2>
          </div>
        </div>

     <section  style={{
          backgroundImage: `url(${SecondBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          minHeight: "721px",
        }} className="mb-20">
    
     </section>
    </Layout>
  );
}

export default Home;
