import { product } from "@/database/db";

const HeroCard = () => {
  return (
    <div className="card-container">
    {
      product.map((i)=>(
        <div key={i.id} className="card card-compact bg-base-100 w-96 shadow-xl">
          <div className="product-wrapper">

      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          />
      </figure>
      
          <div className="card-body">
        <h2 className="card-title">{i.title}</h2>
        <p>{i.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
          </div>
      </div>
        ))
      }
      </div>
  );
};

export default HeroCard;
