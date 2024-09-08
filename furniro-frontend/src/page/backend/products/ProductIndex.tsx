import { Link } from "react-router-dom";
import BackendSidebar from "@components/BackendSidebar";
import TopNavigation from "@components/TopNavigation";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface productQauntity {
  quantity: number;
}

interface productDetails {
  id: number;
  name: string;
  product_name: string;
  product_image: string;
  short_description: string;
  sku: string;
  discount_price: string;
  price: string;
  status: number;
}

const ProductIndex: React.FC = () => {
  const [products, setProduct] = useState<productDetails[]>([]);
  const [quantity, setQauntity] = useState<productQauntity | number>();

  const fetchProduct = async () => {
    const response = await axios.get("/api/products/index", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });

    if (response.status == 200) {
      setProduct(response.data.products);
      setQauntity(response.data.quantity);
    }
  };

  const handleProductDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    e.preventDefault();
    try {
    } catch (error) {}
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <TopNavigation />
      <BackendSidebar />

      <div className="product_container   pl-20 h-[100vh] max-h-full">
        <div className="product_list pl-10 pr-4 py-12 my-20 bg-gray-700 ml-48 mr-8">
          <div className="add_product_category">
            <Link
              to="/product/store"
              className="bg-blue-500 text-white p-2 my-2 rounded-md"
            >
              Add Products
            </Link>
          </div>
          <div className="product_list my-2">
            <h1 className="text-white text-2xl font-bold">Product List</h1>
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
                  <th scope="col" className="px-6 py-3">
                    Sku
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Short Descritption
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Available Stock
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{product.product_name}</td>
                    <td className="px-6 py-4">{product.sku}</td>
                    <td className="px-6 py-4">{product.name}</td>

                    <td className="px-6 py-4">{product.discount_price} </td>
                    <td className="px-6 py-4">
                      {product.status === 1
                        ? "Discount Available"
                        : "Discount Not Available"}{" "}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={`http://localhost:8000/storage/${product.product_image}`}
                        alt={product.name}
                      />
                    </td>

                    <td className="px-6 py-4">{product.short_description}</td>

                    <td className="px-6 py-4">{quantity?.toString()}</td>

                    <td className="px-6 py-4">
                      <Link to={`/product/edit/${product.id}`}>Edit</Link>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={(e) => handleProductDelete(e, product.id)}
                      >
                        Delete Product
                      </button>
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

export default ProductIndex;
