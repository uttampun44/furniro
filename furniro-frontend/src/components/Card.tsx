import cardProps from "../types/Card";

const Card: React.FC<cardProps> = ({ src, title, description, price, discount_price, className, onClick }) => {
  return (
    <>
      <div className="card my-8 bg-gray-200 bg-opacity-50">
        <div className="productImg" onClick={onClick}>
          <img src={src} className={className}/>
        </div>
        <div className="productDetails grid gap-y-1 px-3 py-5">
          <h6 className="text-lg font-bold font-poppins">{title}</h6>
          <strong className="block text-base text-[#B0B0B0]">{description}</strong>
         <div className="discount flex gap-x-4">
         <strong className="text-lg font-bold font-poppins">Rs {price}</strong><strong className="text-lg font-bold font-poppins line-through text-[#B0B0B0]">Rs {discount_price}</strong>
         </div>
        </div>
      </div>
    </>
  );
};
export default Card;
