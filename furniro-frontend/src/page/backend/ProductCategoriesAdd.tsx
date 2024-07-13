import { SubmitHandler, useForm } from "react-hook-form";
import BackendSidebar from "../../components/BackendSidebar";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import axios from "axios";

type ProductAdd = {
  product_name: string;
  product_image: FileList;
};

const ProductCategoryAdd: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductAdd>();

  const onSubmit: SubmitHandler<ProductAdd> = async (data) => {
console.log(data)

    try {
      const response = await axios.post("/api/product-categories", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("There was an error adding the product category:", error);
    }
  };

  return (
    <>
      <BackendSidebar />
      <div className="product_categories_container pl-20 h-[100vh] max-h-full">
        <div className="product_categories pl-10 pr-4 py-12 my-20 bg-gray-700 ml-48 mr-8">
          <div className="product_categories_title">
            <h1 className="text-white text-2xl font-bold">Product Categories</h1>
          </div>

          <div className="relative overflow-x-auto sm:rounded-lg my-2">
            <form method="POST" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-5">
                  <InputField
                    type="text"
                    {...register("product_name")}
                    className={{
                      label: "block mb-2 text-sm font-medium text-white",
                      input:
                        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 placeholder-gray-400",
                    }}
                    label="Product Name"
                  />
                  {errors.product_name && (
                    <span className="text-red my-2 font-bold text-lg">
                      This Field is required
                    </span>
                  )}
                </div>

                <div className="mb-5">
                  <InputField
                    type="file"
                    {...register("product_image")}
                    className={{
                      label: "block mb-2 text-sm font-medium text-white",
                      input:
                        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2 placeholder-gray-400",
                    }}
                    label="Product Image"
                    accept="image/*"
                  />
                  {errors.product_image && (
                    <span className="text-red my-2 font-bold text-lg">
                      This Field is required
                    </span>
                  )}
                </div>
              </div>
              <div className="submit_button">
                <Button
                  type="submit"
                  className="bg-blue-700 text-white p-2 rounded-sm"
                  value="Add Products"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategoryAdd;
