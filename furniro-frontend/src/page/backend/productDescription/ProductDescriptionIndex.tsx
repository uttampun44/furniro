import BackendSidebar from "@components/BackendSidebar";
import Button from "@components/Button";
import TopNavigation from "@components/TopNavigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface productsProps {
  id: number;
  product_name: string;
}
interface descriptionProps {
  id: number;
  description: string;
  addition_images: string;
  products: productsProps;
}

const ProductDescriptionIndex = () => {
  const [descriptions, setDescription] = useState<descriptionProps[]>([]);


  const fetchDescription = async () => {
    const response = await axios.get("/api/addition/index", {
      headers: {
        Accept: "application/json",
      },
    });

    if (response.status == 200) {
      const updateImages = response.data.product_description.map(
        (item: descriptionProps) => ({
          ...item,
          addition_images: JSON.parse(item.addition_images),
        })
      );

      setDescription(updateImages);
    }
  };

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>,id: number) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`/api/addition/delete/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

  
      if (response.status == 200) {
        alert("Product addition deleted");
        fetchDescription();
      }
    } catch (error) {
      throw new Error();
    }
  };

  useEffect(() => {
    fetchDescription();
  }, []);
  return (
    <>
      <TopNavigation />
      <BackendSidebar />

      <div className="product_descripiton_container   pl-20 h-[100vh] max-h-full">
        <div className="product_list pl-10 pr-4 py-6 mb-8 bg-gray-700 ml-48 mr-8">
          <div className="add_product_description flex justify-end">
            <Link
              to="/products/description/store"
              className="bg-blue-500 text-white p-2 my-2 rounded-md"
            >
              Add Product Description
            </Link>
          </div>
          <div className="product_list my-2">
            <h1 className="text-white text-2xl font-bold">
              Product Additional Information
            </h1>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 w-[40%]">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Addition Image
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody>
                {descriptions.map((description, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">
                      {description.products.product_name}
                    </td>
                    <td className="px-6 py-4">{description.description}</td>

                    <td className="px-6 py-4 flex gap-x-4">
                      {
                        /**********checking the images is it in array format or not before mapping the array*/
                        Array.isArray(description.addition_images) &&
                          description.addition_images.length > 0 &&
                          description.addition_images.map((image, index) => (
                            <img
                              src={`http://localhost:8000/storage/${image}`}
                              alt={`Product Image ${index}`}
                              className="w-16 h-16 object-contain"
                              key={index}
                            />
                          ))
                      }
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        type="submit"
                        value="Delete"
                        className="font-medium text-blue-600 dark:text-blue-500 no-underline"
                        onClick={(e) => handleDelete(e, description.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDescriptionIndex;
