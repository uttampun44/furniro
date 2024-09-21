import { useAppSelector } from "../../app/hook";
import clostBtn from "../../src/assets/images/Vector.png";
import { useDispatch } from "react-redux";
import { removeCart } from "../../store/Products";
import Button from "./Button";
import { useRef } from "react";
import { Link } from "react-router-dom";

interface sideProps{
  show:boolean
  onClick: (e: React.MouseEvent) => void
}

const SideMenu : React.FC<sideProps> = (props:sideProps) => {

  const carts = useAppSelector((state) => state.product.cart);

  const totalPrice = carts.reduce((total, item) => (item.price * item.cartQauntity) + total, 0)

  const dispatch = useDispatch();

  const sideRef = useRef<HTMLDivElement>(null);

  const handleRemoveCart = (id:number) => {
    console.log("remove");
    if (!carts) return;

    dispatch(removeCart(id));
  };

 
  return (
    <div>
      {props.show && (
        <div className=" fixed w-full h-full inset-0 bg-gray-700/30 z-50"></div>
      )}

      <div ref={sideRef} >
        <aside
          className={`fixed h-full bg-white z-50 right-0 top-0 p-5 min-w-60 ${
            props.show
              ? "translate-x-0 transition-transform duration-500 ease-in-out"
              : "translate-x-[100%] transition-transform duration-300 ease-in-out"
          }`}
        >
          <div className="sidebarMenu">
            <div className="data relative">
              <div className="title_close flex justify-between">
                <strong className="text-2xl font-poppins">Shopping Cart</strong>
                <Button
                  value="X"
                  onClick={props.onClick}
                  className="absolute right-0 text-xl font-poppins font-semibold"
                />
                <hr className="my-2"></hr>
              </div>
               {
                  carts.map((cart, index) => (
              <div className="rowCart flex gap-x-5 my-6" key={index}>
               
                       <div className="img w-20 h-20">
                    <img
                      src={`http://localhost:8000/storage/${cart?.product_image}`}
                      alt={cart?.product_name}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                  <div className="cartDetail text-lg font-poppins font-medium">
                    <p>{cart?.product_name}</p>
                    <p>
                      <span>{cart?.sku}</span> X Rs {cart?.price}
                    </p>
                  </div>
                  <div className="removeCart">
                    <img
                      src={clostBtn}
                      onClick={() => handleRemoveCart(cart.id)}
                      className="cursor-pointer"
                    />
                  </div>
                 
              </div>
                  ))
               }
            </div>

            <div className="checkoutBtn">
               <Link to="/checkout"><Button value="Checkout" /></Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
export default SideMenu;
