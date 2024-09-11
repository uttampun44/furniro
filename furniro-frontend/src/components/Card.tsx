import cardProps from "../types/Card";

const Card: React.FC<cardProps> = ({ src, title, description, price, onClick }) => {
  return (
    <>
      <div className="card my-8 bg-gray-200 bg-opacity-50">
        <div className="productImg" onClick={onClick}>
          <img src={src} className="w-full h-auto"/>
        </div>
        <div className="productDetails grid gap-y-1 px-2 py-3">
          <h6>{title}</h6>
          <strong className="block">{description}</strong>
          <strong>{price}</strong>
        </div>
      </div>
    </>
  );
};
export default Card;
