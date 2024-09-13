import BackendSidebar from "@components/BackendSidebar"
import TopNavigation from "@components/TopNavigation"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


interface descriptionProps {
  id:number
  description:string,
  addition_images:string[],
}

const ProductDescriptionIndex = () =>{

  const [descriptions, setDescription] = useState<descriptionProps []>([]);

  console.log(descriptions)

  const fetchDescription = async() =>{
      const response = await axios.get("/api/addition/index", {
        headers:{
          'Accept': 'application/json',

        }
      })

      setDescription(response.data.product_description);
  }

  useEffect(() =>{
    
    fetchDescription()
  }, [])
    return(
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
            <h1 className="text-white text-2xl font-bold">Product Additional Information</h1>
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
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Addition Image
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
               
                 {
                  descriptions.map((description, index) => (
                     
                    
                    <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                  
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">Product Name</td>
                  <td className="px-6 py-4">{description.description}</td>
                
                  <td className="px-6 py-4">
                  {/* {
               
                  description.addition_images.map((image, index)   => (
                          <img
                      
                            src={`http://localhost:8000/storage/${image[0]}`}
                            // alt={`Product Image ${imgIndex}`}
                            className="w-16 h-16 object-contain"
                          />
                        ))
                  
                  } */}
                 </td>
                 <td className="px-6 py-4"><Link to={`/addition/products/${description.id}`}>Edit</Link></td>
                   <td className="px-6 py-4">
                     {/* <button
                       onClick={(e) => handleProductDelete(e, product.id)}
                       className="text-red-700"
                       >
                       Delete Product
                      </button> */}
                   </td>
                 </tr>
                    ))
                 }
            
              </tbody>
            </table>


          </div>
        </div>
      </div>
       
        </>
    )
}
export default ProductDescriptionIndex