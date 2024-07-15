import BackendSidebar from "../../components/BackendSidebar";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../../context/ContextProvider";
import { useNavigate } from "react-router-dom";


type ProductAdd = {
  name: string;
  image: File | null;
};

const ProductCategoryAdd: React.FC = () => {
  
  const context = useContext(Context);
  
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductAdd>({
    name: "",
    image: null,
  });

  const [imagePreview, setPreview] = useState<string | null>(null);
  const token = context?.token;


  const productOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, files, value } = e.target;

    if (type == "file" && files) {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: files[0],
      }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const productSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/product-categories", product, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        window.alert("Product Created Successfully")
        navigate('/product-categories')
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
            <h1 className="text-white text-2xl font-bold">
              Product Categories
            </h1>
          </div>

          <div className="relative overflow-x-auto sm:rounded-lg my-2">
            <form method="POST" onSubmit={productSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="mb-5">
                  <InputField
                    type="text"
                    name="name"
                    className={{
                      label: "block mb-2 text-sm font-medium text-white",
                      input:
                        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2.5 placeholder-gray-400",
                    }}
                    label="Product Name"
                    onChange={productOnChange}
                    value={product.name}
                  />
                </div>

                <div className="mb-5">
                  <InputField
                    type="file"
                    name="image"
                    className={{
                      label: "block mb-2 text-sm font-medium text-white",
                      input:
                        "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block w-full p-2 placeholder-gray-400",
                    }}
                    label="Product Image"
                    accept="image/*"
                    onChange={productOnChange}
                  />

                  <div className="img_preview my-10">
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        className="w-40 h-auto "
                      />
                    )}
                  </div>
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
