import { useAppSelector } from "../../app/hook"
import Button from "./Button";
import clostBtn from '../../src/assets/images/Vector.png'
import { useDispatch } from "react-redux";
import { removeCart } from "../../store/Products";

const SideMenu = () =>{

    const cart = useAppSelector(state => state.product.cart);
    const dispatch = useDispatch()

    const details = cart.find(item => item)
    

    const handleRemoveCart = () =>{
        dispatch(removeCart(details?.id))
    }
    return(

      
      <div >
         {
             cart.length > 0 && (
                <div className=" fixed w-full h-full inset-0 bg-gray-700/30 z-50"></div>
             )
         }
            {
                cart.length > 0 ? (
       <aside className="fixed h-full bg-white z-50 right-0 top-0 p-5 min-w-60">
       <div className="sidebarMenu">
                    <div className="data">
                        <strong className="text-2xl font-poppins">Shopping Cart</strong>
                        <hr className="my-2"></hr>
                      <div className="rowCart flex gap-x-5 my-6">
                         <div className="img w-20 h-20">
                          <img src={`http://localhost:8000/storage/${details?.product_image}`} 
                          alt={details?.product_name}
                          className="w-full h-full object-contain rounded-md"
                          />
                         </div>
                         <div className="cartDetail text-lg font-poppins font-medium">
                         <p>{details?.product_name}</p>
                         <p><span>{details?.sku}</span> X Rs {details?.price}</p>
                         </div>
                         <div className="removeCart">
                             <img src={clostBtn} /> <Button onClick={handleRemoveCart} />
                         </div>
                      </div>
                    </div>
        </div>
       </aside>
                ):null
            }
      </div>
    )
}
export default SideMenu