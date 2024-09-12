import Backgroundpic from "@components/Backgroundpic";
import Layout from "../layout/Layout";
import { useAppDispatch, useAppSelector } from "../../app/hook"
import Card from "@components/Card"
import { viewProduct } from "../../store/Products";
import { useNavigate } from "react-router-dom";

function Shop() {

  const product = useAppSelector(state => state.product.products)

  /*showing product two times*/ 
  const products = [...product, ...product]

  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const handleProduct = (product:any) =>{
    dispatch(viewProduct(product))
    navigate("/products/single-product")
  }
  return (
    <Layout>
      <Backgroundpic />

      <div className="products px-24 max-w-[1299px] mx-auto w-full py-10">
     
                <div className="productGrid grid grid-cols-4 gap-4 cursor-pointer">
                {
                    products.map((product, index) => (
                        <Card
                        title={product.product_name}
                        description={product.short_description}
                        src={`http://localhost:8000/storage/${product.product_image}`}
                        price={product.price}
                        discount_price={product.discount_price}
                        key={index}
                       onClick={() => handleProduct(product)}
                      />
                    ))
                }
                </div>
                </div>
    </Layout>
  );
}

export default Shop;
