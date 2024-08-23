import { Link } from "react-router-dom";
import BackendSidebar from "@components/BackendSidebar"
import TopNavigation from "@components/TopNavigation"


const ProductIndex:React.FC = () =>{
  return(
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
            <h1 className="text-white text-2xl font-bold">
              Product List
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
                  <th scope="col" className="px-6 py-3">
                   Sku
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                </tr>
              </thead>
              
              <tbody>
                  <tr>

                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductIndex