import { useAppSelector } from "../../app/hook"
import React from "react"
import Layout from "../layout/Layout"
import InputField from "@components/InputField";

const Checkout: React.FC = () =>{

    const checkoutProduct = useAppSelector(state => state.product.cart);

    const product = checkoutProduct.find(items => items)
 return(
     <>
        <Layout >
            <section>
                 <div className="checkout py-16 px-28">
                      <div className="rowCheckout flex justify-between">
                          <div className="form">
                              <form>
                                   <div className="formRow">
                                      <InputField label="First Name"
                                       type="text"
                                       name="firstName"
                                       className={{
                                        label: 'text-lg text-black',
                                        input: 'p-2'
                                       }}
                                      />
                                   </div>
                              </form>
                          </div>

                          <div className="product row grid grid-cols-2 gap-x-8">
                              <div className="rowOne">
                                  <strong>Product</strong>
                                 {
                                    product?.product_name && (
                                        <h6>{product?.product_name}</h6>
                                    )
                                 }
                                   <h6>Total</h6>
                              </div>
                              <div className="rowTwo">
                                  <strong>Sub Total</strong>
                                  <h6>Rs {product?.price}</h6>
                                  <h6>Rs 908</h6>
                              </div>
                          </div>
                      </div>
                 </div>
            </section>
        </Layout>
     </>
 )
}
export default Checkout