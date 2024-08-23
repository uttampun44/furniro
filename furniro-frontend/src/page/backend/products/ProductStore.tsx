import { Link } from "react-router-dom";
import BackendSidebar from "@components/BackendSidebar";
import TopNavigation from "@components/TopNavigation";
import InputField from "@components/InputField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@components/Button";
import { useEffect, useState } from "react";
import axios from "axios";

type products = {};

type productsCategory = {
  name: string;
};

const ProductStore: React.FC = () => {
  const { handleSubmit, control } = useForm();
  const [productcategories, setProductcategory] = useState<productsCategory[]>(
    []
  );


  const onSubmit: SubmitHandler<products> = async (data) => {};

  const fetchProductCategory = async () => {
    const response = await axios.get("/api/products/create");

    if (response.status === 200)
      setProductcategory(response.data.product_category);
  };

  useEffect(() => {
    fetchProductCategory();
  }, []);
  return (
    <>
      <TopNavigation />
      <BackendSidebar />
      <div className="userStoreContainer">
        <div className="user_store_container   pl-20 h-[100vh] max-h-full">
          <div className="userstore pl-10 pr-4 py-12 my-20 bg-gray-700 ml-48 mr-8">
            <h1 className="text-white my-4 font-bold text-xl">
              Create products
            </h1>
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="formGrid grid grid-cols-2 gap-x-4 gap-y-4">
                <div className="name">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="text"
                        onChange={onChange}
                        label="Product Name"
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                  {/* {
                    validationErrors?.name && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors.name}</span>
                    )
                 } */}
                </div>
                <div className="email">
                  <Controller
                    name="product_sku"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="text"
                        onChange={onChange}
                        label="Product Sku"
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                  {/* {
                    validationErrors?.email && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors.email}</span>
                    )
                  } */}
                </div>
                <div className="price">
                  <Controller
                    name="price"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="text"
                        onChange={onChange}
                        label="Price"
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                  {/* {
                    validationErrors?.password && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors.password}</span>
                    )
                  } */}
                </div>

                <div className="image">
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="file"
                        onChange={(e) => onChange(e.target.files?.[0])}
                        label="Product Image"
                        className={{
                          label: "text-white block mb-2 ",
                          input:
                            "text-black w-full py-3 px-2 rounded-md  border-2 bg-white",
                        }}
                      />
                    )}
                  />
                  {/* {
                    validationErrors?.image && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors?.image.type}</span>
                    )
                  } */}
                </div>

                <div className="productCategory">
                  <Controller
                    name="product_category"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <>
                        <label className="text-white block mb-2">
                          Product Categories
                        </label>

                        <select
                          className="text-black w-full py-3 px-2 rounded-md"
                          onChange={onChange}
                        >
                          {productcategories.map((productcategory, index) => {
                            return (
                              <option key={index}>
                                {productcategory.name}
                              </option>
                            );
                          })}
                        </select>
                      </>
                    )}
                  />
                  {/* {
                    validationErrors?.role && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors.role}</span>
                    )
                  } */}
                </div>

                <div className="date_of_birth">
                  <Controller
                    name="discount"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="text"
                        onChange={onChange}
                        label="Discount"
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                  {/* {
                    validationErrors?.date_of_birth && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors.date_of_birth}</span>
                    )
                  } */}
                </div>

                <div className="address">
                  <Controller
                    name="discount"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        onChange={onChange}
                        type="text"
                        label="Quantity"
                        className={{
                          label: "text-white block mb-2 ",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                  {/* {
                    validationErrors?.address && (
                      <span className="text-red-700 text-lg font-medium block my-1">{validationErrors?.address}</span>
                    )
                  } */}
                </div>

                <div className="productCategory">
                  <Controller
                    name="product_category"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <>
                        <label className="text-white block mb-2">
                          Discount Active
                        </label>

                        <select
                          className="text-black w-full py-3 px-2 rounded-md"
                          onChange={onChange}
                        >
                          <option value="0">Inactive</option>
                          <option value="1">Active</option>
                        </select>
                      </>
                    )}
                  />
                  {/* {
                     validationErrors?.role && (
                       <span className="text-red-700 text-lg font-medium block my-1">{validationErrors.role}</span>
                     )
                   } */}
                </div>
              </div>

              <div className="btnRow my-4 flex gap-x-2">
                <Button
                  type="submit"
                  value="Create Products"
                  className="bg-blue-800 text-white p-2 w-36  text-center rounded-md cursor-pointer"
                />
                <Link
                  to="/product/index"
                  className="bg-blue-800 text-white p-2 rounded-md cursor-pointer w-36 text-center "
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductStore;
