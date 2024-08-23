import { Link, useNavigate } from "react-router-dom";
import BackendSidebar from "@components/BackendSidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@components/Button";

type productCateogryList = {
  id: number;
  name: string;
  image: string;
};

const ProductCategories: React.FC = () => {

  const navigate = useNavigate();

  const [productCategory, setProductCategory] = useState<productCateogryList[]>(
    []
  );

  const fetchProductCategory = async () => {
    const data = await axios.get("/api/product-category-list", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (data.status == 200) {
      setProductCategory(data.data.product_category);
    }
  };

  const deleteProductCategory = async ( e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.preventDefault()
    try {
      const response = await axios.delete(`/api/product-categies/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        setProductCategory((previousCategory) =>
          previousCategory.filter((category) => category.id !== category.id)
        );
        fetchProductCategory()
        navigate('/product-categories');
      }
    } catch (error) {

      console.log(error)
    }
  };

  useEffect(() => {
    fetchProductCategory();
  
  }, []);
  return (
    <>
      <BackendSidebar />
      <div className="product_categories_container   pl-20 h-[100vh] max-h-full">
        <div className="product_categories pl-10 pr-4 py-12 my-20 bg-gray-700 ml-48 mr-8">
          <div className="add_product_category">
            <Link
              to="/product-categories/add"
              className="bg-blue-500 text-white p-2 my-2 rounded-md"
            >
              Add Product Category
            </Link>
          </div>
          <div className="product_categories_title my-2">
            <h1 className="text-white text-2xl font-bold">
              Product Categories
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
                    Product Categories
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Delete
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Add
                  </th>
                </tr>
              </thead>
              <tbody>
                {productCategory.map((product, index) => {
                  return (
                    <tr
                      key={index}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{product.name}</td>
                      <td className="px-6 py-4">
                        <img
                          src={`http://localhost:8000/${product.image}`}
                          className="w-20 h-auto"
                          alt={product.name}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Link
                         to={`/product-categories/edit/${product.id}`}
                          className="font-medium text-blue-600 dark:text-blue-500 no-underline"
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          type="submit"
                          onClick={(e) => deleteProductCategory(e, product.id)}
                          value="Delete"
                          className="font-medium text-blue-600 dark:text-blue-500 no-underline"
                        ></Button>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to="/product-categories/add"
                          className="font-medium text-blue-600 dark:text-blue-500  no-underline"
                        >
                          Add
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductCategories;
