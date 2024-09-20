import { useAppSelector } from "../../app/hook";
import clostBtn from "../../src/assets/images/Vector.png";
import { useDispatch } from "react-redux";
import { removeCart } from "../../store/Products";
import Button from "./Button";

const SideMenu = () => {
  const cart = useAppSelector((state) => state.product.cart);
  const dispatch = useDispatch();

  const details = cart.find((item) => item);

  const handleRemoveCart = () => {
    console.log("remove");
    if (!details) return;

    dispatch(removeCart(details?.id));
  };

  const handleCloseMenu = () =>{
    alert("remove")
  }

  return (
    <div>
      {cart.length > 0 && (
        <div className=" fixed w-full h-full inset-0 bg-gray-700/30 z-50"></div>
      )}
     
        <aside className={`fixed h-full bg-white z-50 right-0 top-0 p-5 min-w-60 ${cart.length > 0 ? 'translate-x-0 transition-transform duration-500 ease-in-out' : 'translate-x-[100%] transition-transform duration-300 ease-in-out'}`}>
          <div className="sidebarMenu">
            <div className="data relative">
            <div className="title_close flex justify-between">
            <strong className="text-2xl font-poppins">Shopping Cart</strong>   <Button 
            value="X" onClick={handleCloseMenu} 
            className="absolute right-0 text-xl font-poppins font-semibold"  />
              <hr className="my-2"></hr>
            </div>
              <div className="rowCart flex gap-x-5 my-6">
                <div className="img w-20 h-20">
                  <img
                    src={`http://localhost:8000/storage/${details?.product_image}`}
                    alt={details?.product_name}
                    className="w-full h-full object-contain rounded-md"
                  />
                </div>
                <div className="cartDetail text-lg font-poppins font-medium">
                  <p>{details?.product_name}</p>
                  <p>
                    <span>{details?.sku}</span> X Rs {details?.price}
                  </p>
                </div>
                <div className="removeCart">
                  <img src={clostBtn} onClick={handleRemoveCart} className="cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </aside>
      
    </div>
  );
};
export default SideMenu;
