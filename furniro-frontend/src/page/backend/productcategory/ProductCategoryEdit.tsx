import React, {useEffect, useState } from "react";
import Button from "../../../components/Button";
import InputField from "../../../components/InputField";
import BackendSidebar from "../../../components/BackendSidebar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

type inputValue ={
    name:string,
    image: File | null
    slug?: string
}


const ProductCategoryEdit: React.FC = () => {


    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [productVal, setProductVal] = useState<inputValue>({
        name: '',
        image: null
    })

    const [imagePreview, setPreview] = useState<string | null>();



  const fectProductCategory = async() => {

    const response = await axios.get(`/api/product-categories/edit/${id}` , {
        headers: {
            'Accept' : 'application/json',
            'Content-Type': 'mutlipart/form-data',
           
        }
    })

    if(response.status == 200){
        const fetchedProduct = response.data.productCategory;
      
        setProductVal({
          name: fetchedProduct.name,
          image: null,
        });
        setPreview(fetchedProduct.image ? `http://localhost:8000/${fetchedProduct.image}` : null);
    }
  };


  const productOnChange = (e:React.ChangeEvent<HTMLInputElement>) =>{

    const {name, type, files, value} = e.target;

    if(type == "file" && files){
       setProductVal((productProduct) => ({
         ...productProduct, [name] : files[0]
       }))
     setPreview(URL.createObjectURL(files[0]))
    }else{
        setProductVal((previousProduct) => ({
            ...previousProduct, [name] : value
        }))
    }
  }

  const productSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append("_method", "PUT");
    formData.append('name', productVal.name);
    if (productVal.image) {
      formData.append('image', productVal.image);
    }
    const response = await axios.post(`/api/product-categories/update/${id}`, formData, {
      
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'mutlipart/form-data',  
            }
    
    })

    if(response.status == 200){
       window.alert("Product Update Successfully")
       navigate('/product-categories')
    }
  }
  useEffect(() => {
    fectProductCategory();
  }, [id]);

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
                    value={productVal.name}
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
                      <img  src={imagePreview} className="w-40 h-auto " />
                    )}
                  </div>
                </div>
              </div>

              <div className="submit_button">
                <Button
                  type="submit"
                  className="bg-blue-700 text-white p-2 rounded-sm"
                  value="Update Products"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategoryEdit;
