import { useAppSelector } from "../../app/hook";
import React from "react";
import Layout from "../layout/Layout";
import InputField from "@components/InputField";
import Button from "@components/Button";
import Backgroundpic from "@components/Backgroundpic";
import CompanyFeature from "@components/CompanyFeature";

const Checkout: React.FC = () => {
  const checkoutProduct = useAppSelector((state) => state.product.cart);

  const totalPrice = checkoutProduct.reduce(
    (total, item) => item.price * item.cartQauntity + total,
    0
  );

  return (
    <>
      <Layout>
        <Backgroundpic />
        <section>
          <div className="checkout py-16 px-28">
            <form>
              <div className="rowCheckout flex gap-x-12 justify-between">
                <div className="form max-w-[50%] w-full">
                  <div className="formRow flex gap-x-4">
                    <div className="firstName w-full">
                      <InputField
                        label="First Name"
                        type="text"
                        name="firstName"
                        className={{
                          label: "text-lg text-black mb-2 block",
                          input:
                            "p-2  border-2 outline-none block rounded-md w-full",
                        }}
                      />
                    </div>
                    <div className="lastName w-full">
                      <InputField
                        label="Last Name"
                        type="text"
                        name="firstName"
                        className={{
                          label: "text-lg text-black mb-2 block",
                          input:
                            "p-2  border-2 outline-none block rounded-md w-full",
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid gap-y-3 my-4">
                    <div className="company">
                      <InputField
                        label="Company Name (Optional)"
                        type="text"
                        name="companyName"
                        className={{
                          label: "text-lg text-black mb-2 block",
                          input:
                            "p-2  border-2 outline-none block rounded-md w-full",
                        }}
                      />
                    </div>

                    <div className="countryRegion mt-2">
                      <label className="text-lg text-black mb-2 block">
                        County / Region
                      </label>
                      <select className="p-3 rounded-md w-full outline-none">
                        <option>Select Country</option>
                      </select>
                    </div>

                    <div className="streetAddress">
                      <InputField
                        label="Street Address"
                        type="text"
                        name="streetAddress"
                        className={{
                          label: "text-lg text-black mb-2 block",
                          input:
                            "p-2  border-2 outline-none block rounded-md w-full",
                        }}
                      />
                    </div>

                    <div className="townCity">
                      <InputField
                        label="Town / City"
                        type="text"
                        name="towncity"
                        className={{
                          label: "text-lg text-black mb-2 block",
                          input:
                            "p-2  border-2 outline-none block rounded-md w-full",
                        }}
                      />
                    </div>

                    <div className="province mt-2">
                      <label className="text-lg text-black mb-2 block">
                        Province
                      </label>
                      <select className="p-3 rounded-md w-full outline-none">
                        <option>Select Province</option>
                      </select>
                    </div>

                    <div className="zipcode">
                      <InputField
                        label="Zip code"
                        type="text"
                        name="zipcode"
                        className={{
                          label: "text-lg text-black mb-2 block",
                          input:
                            "p-2  border-2 outline-none block rounded-md w-full",
                        }}
                      />
                    </div>

                    <div className="phone">
                      <InputField
                        label="Phone"
                        type="text"
                        name="phone"
                        className={{
                          label: "text-lg text-black mb-2 block",
                          input:
                            "p-2  border-2 outline-none block rounded-md w-full",
                        }}
                      />
                    </div>

                    <div className="email">
                      <InputField
                        label="Email"
                        type="text"
                        name="email"
                        className={{
                          label: "text-lg text-black mb-2 block",
                          input:
                            "p-2  border-2 outline-none block rounded-md w-full",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="product max-w-[50%] w-full">
                  {checkoutProduct.length > 0 && (
                    <>
                      <div className="titleGrid grid grid-cols-2 justify-items-center mb-4">
                        <h6 className="text-2xl font-medium font-poppins">
                          Product
                        </h6>
                        <h6 className="text-2xl font-medium font-poppins">
                          Sub Total
                        </h6>
                      </div>
                      {checkoutProduct.map((product, index) => (
                        <div
                          className="grid grid-cols-2 justify-items-center gap-x-8 mb-8 "
                          key={index}
                        >
                          <div className="rowOne">
                            {product?.product_name && (
                              <>
                                <span className="text-base font-poppins font-medium text-slate-400">
                                  {product?.product_name}
                                </span>{" "}
                                <span>x </span>
                              </>
                            )}
                            <h6>Total</h6>
                          </div>
                          <div className="rowTwo">
                            <h6 className="text-base font-poppins font-medium">
                              Rs {product?.price}
                            </h6>
                          </div>
                        </div>
                      ))}

                      <div className="placeOrder grid grid-cols-2 justify-items-center ">
                        <div className="total">
                          <strong>Total</strong>
                          <h6 className="text-base font-poppins font-medium">
                            {totalPrice.toString()}
                          </h6>
                        </div>
                        <Button
                          type="submit"
                          value="Place Order"
                          className=" bg-red-700 text-white font-poppins text-xl font-medium p-2 rounded-md"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </form>
          </div>
        </section>
        <section>
          <CompanyFeature />
        </section>
      </Layout>
    </>
  );
};
export default Checkout;
