import React,{useState} from "react";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";
import { useWishlist } from "../contexts/WishContext";

const ProductListing = ({ route }) => {
  const {
    products,
    dispatchProduct,
    sortBy,
    includeOutOfStock,
    fastDelivery,
  } = useProducts();

  const { cart, dispatchCart } = useCart();
  const { wishlist, dispatchWishlist } = useWishlist();

  const [min] = useState( () => [...products].sort( (a,b) => a.price - b.price )[0].price);
  const [max] = useState( () => [...products].sort( (a,b) => b.price - a.price )[0].price);

  const addToWishlist = (item) => {
    if (wishlist.find((i) => i.id === item.id)) {
      return dispatchWishlist({
        type: "REMOVE_FROM_WISHLIST",
        payload: item.id,
      });
    }
    dispatchWishlist({ type: "ADD_TO_WISHLIST", payload: item });
  };

  const cartHandler = (item) => {
    if (cart.find((i) => i.id === item.id)) {
      return route("Cart");
    }
    dispatchCart({ type: "ADD_TO_CART", payload: item });
  };

  return (
    <div>
        <fieldset>
          <legend>Sort by :</legend>
          <label htmlFor="sort">
            <input
              type="radio"
              checked={sortBy === "LOW_TO_HIGH"}
              onChange={() =>
                dispatchProduct({ type: "SORT", payload: "LOW_TO_HIGH" })
              }
              name="sort"
            />
            Low to High
            <input
              type="radio"
              checked={sortBy === "HIGH_TO_LOW"}
              onChange={() =>
                dispatchProduct({ type: "SORT", payload: "HIGH_TO_LOW" })
              }
              name="sort"
            />
            High to Low
          </label>
        </fieldset>

        <fieldset>
          <legend>Filter :</legend>
          <label>
          <input
            type="checkbox"
            checked={includeOutOfStock}
            onChange={() => dispatchProduct({ type: "INCLUDE_OUT_STOCK" })}
          />
          Include Out Of Stock
          </label>
         
          <label>
          &nbsp; <input
            type="checkbox"
            checked={fastDelivery}
            onChange={() => dispatchProduct({ type: "FAST_DELIVERY" })}
          />
          Fast Delivery
          </label>

          <label>
            &nbsp; Price : <input
            type="range"
            min={min}
            max={max}
            defaultValue={50}
            onChange={(e) => dispatchProduct({ type:"SORT_BY_PRICE_RANGE",payload:e.target.value })}
          />
          </label>
        </fieldset>

      <div className="products">
        {products.map((item) => (
          <div
            key={item.id}
            className={item.inStock ? "card" : "card out-of-stock"}
          >
            <i
              onClick={() => addToWishlist(item)}
              style={{
                color: wishlist.find((i) => i.id === item.id) ? "red" : "white",
              }}
              className="fa fa-heart"
              aria-hidden="true"
            ></i>
            <img alt="product" className="card-img" src={item.image} />
            <div className="card-content">
              <h3>{item.name}</h3>
              <span>Price:{item.price}</span>
              <span>{item.inStock ? "Instock" : "out of stock"}</span>
              {item.fastDelivery && (
                <span style={{ flex: 1 }}>Fast Delivery available</span>
              )}
            </div>
            <button
              onClick={() => cartHandler(item)}
              className="primary-btn"
              disabled={!item.inStock}
            >
              {!item.inStock
                ? "Out of Stock"
                : cart.find((i) => i.id === item.id)
                ? "Go to cart"
                : "Add to cart"}
            </button>
          </div>
        ))}
      </div>
      <footer className="footer">
        <div className="footer-header">Connect with me on Social media</div>
        <ul className="list-non-bullet ">
          <li className="list-item-inline social">
            <a className="link" href="https://github.com/asmitzz">
              <img
                alt="social-media"
                loading="lazy"
                src="https://img.icons8.com/fluent/50/000000/github.png"
              />
            </a>
          </li>
          <li className="list-item-inline social">
            <a className="link" href="https://www.instagram.com/smit_asmit008/">
              <img
                alt="social-media"
                src="https://img.icons8.com/fluent/48/000000/instagram-new.png"
              />
            </a>
          </li>
          <li className="list-item-inline social">
            <a className="link" href="https://twitter.com/ASMITSHRIVASTA9">
              <img
                alt="social-media"
                src="https://img.icons8.com/fluent/48/000000/twitter.png"
              />
            </a>
          </li>
          <li className="list-item-inline social">
            <a
              className="link"
              href="https://www.linkedin.com/in/asmit-shrivastava-3b94a3189/"
            >
              <img
                alt="social-media"
                src="https://img.icons8.com/fluent/48/000000/linkedin-circled.png"
              />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default ProductListing;
