import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useProducts } from "../contexts/ProductContext";
import { useWishlist } from "../contexts/WishContext";
import Footer from "./Footer";

const ProductListing = ({ route }) => {
  const {
    products,
    dispatchProduct,
    includeOutOfStock,
    fastDelivery,
    priceRange,
    sortBy
  } = useProducts();

  const { cart, dispatchCart } = useCart();
  const { wishlist, dispatchWishlist } = useWishlist();

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

  const HandleDropdown = (e) => {
    dispatchProduct({ type: "SORT", payload: e.target.value });
  };

  const [displayFilter, setDisplayFilter] = useState(false);

  return (
    <div className="products-container">
      <div className="sorting-container">
      <div className="dropdownBtn-container">
        <small><i className="fas fa-sort-amount-up-alt"></i> Sort by :</small>
        <select className="dropdownBtn" value={sortBy === null ? 'DEFAULT' : sortBy} onChange={HandleDropdown}>
          <option value="DEFAULT">Relevance</option>
          <option value="HIGH_TO_LOW">High to low</option>
          <option value="LOW_TO_HIGH">Low to high</option>
        </select>
      </div>

      <div className="filter-btn-container">
        <button className="filter-button" onClick={() => setDisplayFilter(!displayFilter)}><i className="fa fa-filter"></i> Filter</button>
      </div>
     </div>

     {displayFilter && (
          <div className="fiter-content">
            <label className="filter-content-label">
              <input
                type="checkbox"
                checked={includeOutOfStock}
                onChange={() => dispatchProduct({ type: "INCLUDE_OUT_STOCK" })}
              />
              Include Out Of Stock&nbsp;&nbsp;
            </label>

            <label className="filter-content-label">
              <input
                type="checkbox"
                checked={fastDelivery}
                onChange={() => dispatchProduct({ type: "FAST_DELIVERY" })}
              />
              &nbsp;<i className="fas fa-shipping-fast"></i> Fast Delivery&nbsp;
            </label>

            <label className="filter-content-label">&nbsp;Price-range : 0 
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange === null ? 1000 : priceRange}
              onChange={(e) => {
                dispatchProduct({
                  type: "SORT_BY_PRICE_RANGE",
                  payload: e.target.value,
                });
                // setState({ min, max, value: e.target.value });
              }}
            />
              1000</label>
          <button onClick={() => dispatchProduct({type:"CLEAR_ALL_FILTER"})} style={{background:'none',border:'none',cursor:'pointer'}}>Clear all</button>
          </div>
        )}

      <div
        style={{ display: products.length > 0 ? "grid" : "block" }}
        className="products"
      >
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item.id}
              className={item.inStock ? "card" : "card out-of-stock"}
            >
              <div className="wishlist-icon">
                <i onClick={() => addToWishlist(item)}
                style={{
                  color: wishlist.find((i) => i.id === item.id)
                    ? "red"
                    : "white",
                }}
                className="fa fa-heart"
                aria-hidden="true"
                ></i>
              </div>
              <img alt="product" className="card-img" src={item.image} />
              <div className="card-content">
                <h4>{item.name}</h4>
                <small className="card-content-details">Price:{item.price}</small>
                {item.fastDelivery && (
                  <small className="card-content-details"><i className="fas fa-shipping-fast"></i> Fast Delivery available</small>
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
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No results found</p>
        )}
      </div>

     <Footer/>
      
    </div>
  );
};

export default ProductListing;
