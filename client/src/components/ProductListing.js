import React,{ useContext } from 'react';
import { productContext } from '../contexts/ProductContext';

const ProductListing = () => {

    const {products,dispatch,sortBy,includeOutOfStock,fastDelivery} = useContext(productContext);

    const addToWishlist = (item) => {
        if( item.isWishlist ){
            dispatch({ type:"REMOVEFROMWISHLIST",id:item.id });
            return;
        }
        dispatch({ type:"ADDTOWISHLIST",id:item.id });
    }

    return (
        <div>
            <fieldset>
                <legend>Sort by :</legend>
                <label htmlFor="sort">
                    <input type="radio" checked ={ sortBy === "LOW_TO_HIGH" } onChange={() => dispatch({ type:"SORT",payload:"LOW_TO_HIGH" })} name="sort"/>Low to High
                    <input type="radio" checked ={ sortBy === "HIGH_TO_LOW" } onChange={() => dispatch({ type:"SORT",payload:"HIGH_TO_LOW" })} name="sort"/>High to Low
                </label>
            </fieldset>

            <fieldset>
                <legend>Available :</legend>
                    <input type="checkbox" checked = {includeOutOfStock} onChange={() => dispatch({ type:"INCLUDE_OUT_STOCK" })}/>Include Out Of Stock
                    <input type="checkbox" checked = {fastDelivery} onChange={() => dispatch({ type:"FAST_DELIVERY" })}/>Fast Delivery
            </fieldset>
            
            <div className="products">
            {
                products.map( item => (
                    <div key={item.id} className="card">
                      <i onClick={() => addToWishlist(item)} style={{ color:item.isWishlist ? 'red' : 'white'}} className="fa fa-heart" aria-hidden="true"></i>
                      <img alt="product" className="card-img" src={item.image}/>
                      <h3>{item.name}</h3>
                      <p>Price:{item.price}</p>
                      <p>{ item.inStock ? "Instock" : "out of stock" }</p>
                      <p>{ item.fastDelivery ? "Fast Delivery available" : ""}</p>
                      <button className="btn" disabled={!item.inStock}>Add to cart</button>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default ProductListing;
