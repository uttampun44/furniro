import Button from "@components/Button";
import { useAppSelector } from "../../app/hook";
import Layout from "../layout/Layout";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "@components/Card";
import { useDispatch } from "react-redux";
import { Product, decrement, decrementProduct, increment, incrementProduct } from "../../store/Products";


const SingleProduct = () => {
  const products = useAppSelector(state => state.product.selectedProduct);

  const relatedProdcts = useAppSelector(state => state.product.products);

  const quantities = useAppSelector(state => state.product.cartQuantities)

  console.log(quantities)
  const dispatch = useDispatch();

  const responsive = {
    superLargeDesktop: {
   
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) =>{

    if(products){
      dispatch(decrement(quantities))
    }
    console.log((quantities))
    
  }

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) =>{
    if(products){
      dispatch(increment(quantities))
    }
    console.log(incrementProduct(quantities))
  }
  return (
    <>
      <Layout>
        <section className="border-b-2">
          <div className="singleProductsContainer py-20 px-12">
            <div className="productDescription flex gap-x-12">
              <div className="productImage w-[50%]">
                <img
                  src={`http://localhost:8000/storage/${products?.product_image}`}
                  className="w-[432px] float-right h-auto mx-auto"
                />
              </div>

              <div className="details w-[50%]">
                <div className="title">
                  <h1 className="text-2xl font-bold font-poppins">
                    Original Rs: {products?.product_name}
                  </h1>
                </div>
                <div className="price mt-4">
                  <strong className="text-xl font-medium font-poppins">
                    {products?.price}
                  </strong>
                  <span className="discount_price block">
                    Discount: Rs {products?.discount_price}
                  </span>
                </div>

                <div className="addTocart flex gap-x-8 mt-4">
                  <div className="quantity flex items-center justify-between border-2 p-2 rounded-md w-32">
                    <Button
                      value="-"
                      className="text-lg font-bold text-gray-400"
                      onClick={handleDecrement}
                    />
                    <span className="text-lg font-bold text-gray-400">{quantities}</span>
                    <Button
                      value="+"
                      className="text-lg font-bold text-gray-400"
                      onClick={handleIncrement}
                    />
                  </div>
                  <div className="addTocartBtn border-2 flex items-center rounded-md w-32">
                    <Button
                      value="Add To Cart"
                      className="text-lg font-medium w-full"
                    />
                  </div>
                </div>
                <hr className="my-12"></hr>

                <div className="share flex gap-x-8 items-center gap-y-4">
                  <div className="sku">
                    <span className="text-base font-medium text-gray-400">
                      SKU
                    </span>
                    : <span className="text-base font-medium text-gray-400">{products?.sku}</span>
                  </div>
                  <div className="category">
                    <span className="text-base font-medium text-gray-400">
                      Category
                    </span>
                    : <span className="text-base font-medium text-gray-400">{products?.name}</span>
                  </div>
                  <div className="share">
                      <span className="text-base font-medium text-gray-400">Share</span> : <span></span> <span><FacebookIcon /></span><span><TwitterIcon /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b-2">
              <div className="description px-24 py-12">
                     <div className="descriptionReview flex gap-x-4 justify-center">
                       <Button value="Description" className="text-text-secondary-color text-lg font-medium" />
                       <Button value="Customer Reviews" className="text-text-secondary-color text-lg font-medium" />
                     </div>
                     <div className="description max-w-[1024px] w-full mx-auto">
                        <p className="text-text-secondary-color text-base font-poppins font-medium">{products?.description}</p>
                     </div>
                     <div className="imagesProduct flex gap-x-4 justify-center my-4">
                        {
                          Array.isArray(products?.addition_images) &&
                           products?.addition_images.map((image, index) => (
                            <React.Fragment key={index}>
                            <img src={`http://localhost:8000/storage/${image}`} alt={`images ${index+1}`}/>
                            </React.Fragment>
                           ))
                        }
                     </div>
              </div>
        </section>

        <section>
        <div className="relatedProducts pt-14 pb-24">
               <div className="relatedProducts">
                   <h2 className="font-poppins text-center text-4xl font-bold">Related Products</h2>
               </div>

               <div className="realtedProducts my-12 max-w-[1208px] w-full mx-auto">
                   <Carousel
                    responsive={responsive}
                    infinite={true}
                    >
                       {relatedProdcts.slice(0, 7).map((product, index) => (
                <Card
                  title={product.product_name}
                  description={product.short_description}
                  src={`http://localhost:8000/storage/${product.product_image}`}
                  price={product.price}
                  discount_price={product.discount_price}
                  key={index}
                  className="w-full"
                 
                />
              ))}
                   </Carousel>
               </div>
            </div>
        </section>
      </Layout>
    </>
  );
};
export default SingleProduct;
