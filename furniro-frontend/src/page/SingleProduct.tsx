import Button from "@components/Button";
import { useAppSelector } from "../../app/hook";
import Layout from "../layout/Layout";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


const SingleProduct = () => {
  const products = useAppSelector((state) => state.product.selectedProduct);

  console.log("selected products", products);
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
                    />
                    <span className="text-lg font-bold text-gray-400">0</span>{" "}
                    <Button
                      value="+"
                      className="text-lg font-bold text-gray-400"
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
                         <button>Description</button> <button>Reviews</button>
                     </div>
              </div>
        </section>

        <section>
        <div className="relatedProducts pt-14 pb-24">
               <div className="relatedProducts">
                   <h2 className="font-poppins text-center text-4xl font-bold">Related Products</h2>
               </div>
            </div>
        </section>
      </Layout>
    </>
  );
};
export default SingleProduct;
