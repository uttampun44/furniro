import { Link, useNavigate } from "react-router-dom";
import BackendSidebar from "@components/BackendSidebar";
import TopNavigation from "@components/TopNavigation";
import InputField from "@components/InputField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Button from "@components/Button";
import { useEffect, useState } from "react";
import axios from "axios";

type products = {

  product_name:string,
  sku:string,
  price:string,
  product_image:string,
  short_description:string,
  discount_price:string,
  status:string,
  quantity:string,
  product_categories_id:number
};

type productsCategory = {
  id:number,
  name: string;
};

const ProductStore: React.FC = () => {

  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<products>();
  const [productcategories, setProductcategory] = useState<productsCategory[]>([]);
  

  const onSubmit: SubmitHandler<products> = async (data) => {
 
    try {
         const response = await axios.post('/api/products/store', data, {
            headers:{
            Accept: "application/json",
            "Content-Type": "multipart/form-data"
            }
         })

         if(response.status === 201){
             alert("Product Added")
             navigate("/products/index")
         }
    } catch (error) {
      throw new Error
    }
  };

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
                    name="product_name"
                    control={control}

                    render={({ field: { onChange } }) => (
                      <InputField
                        type="text"
                        onChange={onChange}
                        label="Product Name"
                        name="product_name"
                       required={true}
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                 
                </div>
                <div className="sku">
                  <Controller
                    name="sku"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="text"
                        name="sku"
                        onChange={onChange}
                        label="Product Sku"
                        required={true}
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                 
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
                        name="price"
                        required={true}
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                 
                </div>



                <div className="image">
                  <Controller
                    name="product_image"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="file"
                        onChange={(e) => onChange(e.target.files?.[0])}
                        label="Product Image"
                        name="product_image"
                        required={true}
                        className={{
                          label: "text-white block mb-2 ",
                          input:
                            "text-black w-full py-3 px-2 rounded-md  border-2 bg-white",
                        }}
                      />
                    )}
                  />
               
                </div>
                

                <div className="short description">
                  <Controller
                    name="short_description"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="text"
                        onChange={onChange}
                        label="Product Short Description"
                        name="short_description"
                        required={true}
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                 
                </div>

               

                <div className="productCategory">
                  <Controller
                    name="product_categories_id"
                    control={control}
                   
                    render={({ field: { onChange } }) => (
                      <>
                        <label className="text-white block mb-2">
                          Product Categories
                        </label>

                        <select
                          className="text-black w-full py-3 px-2 rounded-md"
                          onChange={onChange}
                          name="product_categories_id"
                          required={true}
                        >
                          <option>Select Product Category</option>
                          {productcategories.map((productcategory, index) => {
                            return (

                              <option key={index} value={productcategory.id} >
                                {productcategory.name}
                              </option>
                            );
                          })}
                        </select>
                      </>
                    )}
                  />
                  
                </div>

                <div className="discount">
                  <Controller
                    name="discount_price"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        type="text"
                        onChange={onChange}
                        label="Discount"
                        name="discount_price"
                        required={true}
                        className={{
                          label: "text-white block mb-2",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                  
                </div>
                <div className="status">
                  <Controller
                    name="status"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <>
                        <label className="text-white block mb-2">
                          Discount Active
                        </label>

                        <select
                          className="text-black w-full py-3 px-2 rounded-md"
                          onChange={onChange}
                          name="status"
                          required={true}
                        >
                          <option  >select</option>
                          <option value="0" >Inactive</option>
                          <option value="1">Active</option>
                        </select>
                      </>
                    )}
                  />
                 
                </div>

                <div className="quantity">
                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <InputField
                        onChange={onChange}
                        type="text"
                        label="Quantity"
                        name="quantity"
                        required={true}
                        className={{
                          label: "text-white block mb-2 ",
                          input: "text-black w-full py-3 px-2 rounded-md",
                        }}
                      />
                    )}
                  />
                 
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
