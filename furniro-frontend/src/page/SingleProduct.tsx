import { useAppSelector } from "../../app/hook";
import Layout from "../layout/Layout";

const SingleProduct = () => {
  const products = useAppSelector((state) => state.product.selectedProduct);

  console.log("selected products", products);
  return (
    <>
      <Layout>
        <section>
          <div className="singleProductsContainer py-10">

                <div className="productDescription flex gap-x-8">
                     <div className="productImage w-[50%]">
                         <img src={`http://localhost:8000/storage/${products?.product_image}`} className="w-[432px] float-right h-auto mx-auto"/>   
                     </div> 

                     <div className="details w-[50%]">
                           <div className="title">
                              <h1 className="text-2xl font-bold font-poppins">{products?.product_name}</h1>
                           </div>
                           <div className="price">
                             <strong className="text-xl font-medium font-poppins">{products?.price}</strong>
                             <span className="discount_price block">{products?.discount_price}</span>
                           </div>
                    </div> 
                </div>            
          </div>
        </section>
      </Layout>
    </>
  );
};
export default SingleProduct;
