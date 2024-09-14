import BackendSidebar from "@components/BackendSidebar";
import Button from "@components/Button";
import InputField from "@components/InputField";
import TopNavigation from "@components/TopNavigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller,  SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

interface descriptionProps {
  product_id: number;
  description: string;
  addition_images:File[];
}

interface productsProps{
  id:number,
  product_name:string
}
const ProductDescriptionStore = () => {
  const [products, setProducts] = useState<productsProps[]>([])
  const { handleSubmit, control, setValue } = useForm<descriptionProps>();

  const onSubmit: SubmitHandler<descriptionProps> = async (data) => {

    const form = new FormData();

    form.append('product_id', data.product_id.toString())
    form.append('description', data.description)

    for (let index = 0; index < data.addition_images.length; index++) {
      
      form.append("addition_images[]", data.addition_images[index])
    }
    try {

      const response = await axios.post("/api/addition/store", form, {
        headers:{
          "Accept" : "application/json" ,
          "Content-Type": "multipart/form-data"
        }
      })

   if(response.status == 201) alert("Product Addition Created")
      
    } catch (error) {
      throw new Error
    }
  };

  const fetchProduct  = async() =>{
    const response = await axios.get("/api/addition/create", {
         headers:{
            "Accept" : "application/json"
         }
    })

    if(response.status == 200) setProducts(response.data.products)
  }

  useEffect(() => {
    fetchProduct()
  }, [])
  return (
    <>
      <TopNavigation />
      <BackendSidebar />
      <div className="product_description_store">
        <div className="userStoreContainer">
          <div className="user_store_container   pl-20 h-[100vh] max-h-full">
            <div className="userstore pl-10 pr-4 py-12 my-20 bg-gray-700 ml-48 mr-8">
              <h1 className="text-white my-4 font-bold text-xl">
                Create products
              </h1>
              <form method="POST" onSubmit={handleSubmit(onSubmit)}>
                <div className="formGrid grid grid-cols-2 gap-x-4 gap-y-4">
                  <div className="description">
                    <Controller
                      name="description"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <InputField
                          type="text"
                          onChange={onChange}
                          label="Product Additional Description"
                          name="description"
                          required={true}
                          className={{
                            label: "text-white block mb-2",
                            input: "text-black w-full py-3 px-2 rounded-md",
                          }}
                        />
                      )}
                    />
                  </div>

                  <div className="description">
                    <Controller
                      name="addition_images"
                      control={control}
                      render={() => (
                        <InputField
                          type="file"
                          onChange={(e) => {
                            if(e.target.files) {
                              setValue("addition_images", Array.from(e.target.files))
                            }
                          }
                        }
                          label="Product Additional Images"
                          name="addition_images"
                          required={true}
                          className={{
                            label: "text-white block mb-2",
                            input: "w-full p-2 rounded-md border-2 text-white",
                          }}
                          multiple={true}
                        />
                      )}
                    />
                  </div>

                  <div className="productId">
                    <Controller
                      name="product_id"
                      control={control}
                      render={({ field: { onChange } }) => (
                        <>
                          <label className="text-white block mb-2">
                            Product Categories
                          </label>

                          <select
                            className="text-black w-full py-3 px-2 rounded-md"
                            onChange={onChange}
                            name="product_id"
                            required={true}
                          >
                            <option>Select Product</option>
                            {products.map((product, index) => {
                            return (

                              <option key={index} value={product.id} >
                                {product.product_name}
                              </option>
                            );
                          })}
                          </select>
                        </>
                      )}
                    />
                  </div>
                </div>

                <div className="btnRow my-4 flex gap-x-2">
                  <Button
                    type="submit"
                    value="Create Products Addition"
                    className="bg-blue-800 text-white p-2 w-max  text-center rounded-md cursor-pointer"
                  />
                  <Link
                    to="/products/description"
                    className="bg-blue-800 text-white p-2 rounded-md cursor-pointer w-36 text-center "
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDescriptionStore;
