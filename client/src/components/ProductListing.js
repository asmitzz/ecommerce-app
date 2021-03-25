import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';

const ProductListing = () => {

    const {products,dispatchProduct,sortBy,includeOutOfStock,fastDelivery} = useProducts();
    const { dispatchCart } = useCart();


    const addToWishlist = (item) => {
        if( item.isWishlist ){
            dispatchProduct({ type:"REMOVEFROMWISHLIST",id:item.id });
            return;
        }
        dispatchProduct({ type:"ADDTOWISHLIST",id:item.id });
    }

    return (
        <div>
            <fieldset>
                <legend>Sort by :</legend>
                <label htmlFor="sort">
                    <input type="radio" checked ={ sortBy === "LOW_TO_HIGH" } onChange={() => dispatchProduct({ type:"SORT",payload:"LOW_TO_HIGH" })} name="sort"/>Low to High
                    <input type="radio" checked ={ sortBy === "HIGH_TO_LOW" } onChange={() => dispatchProduct({ type:"SORT",payload:"HIGH_TO_LOW" })} name="sort"/>High to Low
                </label>
            </fieldset>

            <fieldset>
                <legend>Filter :</legend>
                    <input type="checkbox" checked = {includeOutOfStock} onChange={() => dispatchProduct({ type:"INCLUDE_OUT_STOCK" })}/>Include Out Of Stock
                    <input type="checkbox" checked = {fastDelivery} onChange={() => dispatchProduct({ type:"FAST_DELIVERY" })}/>Fast Delivery
            </fieldset>
            
            <div className="products">
            {
                products.map( item => (
                    <div key={item.id} className={ item.inStock ? "card" : "card out-of-stock"}>
                      <i onClick={() => addToWishlist(item)} style={{ color:item.isWishlist ? 'red' : 'white'}} className="fa fa-heart" aria-hidden="true"></i>
                      <img alt="product" className="card-img" src={item.image}/>
                      <div className="card-content">
                        <h3>{item.name}</h3>
                        <span>Price:{item.price}</span>
                        <span>{ item.inStock ? "Instock" : "out of stock" }</span>
                        { item.fastDelivery && <span style={{flex: 1}}>Fast Delivery available</span>}
                      </div>
                      <button onClick={() => dispatchCart({ type:"ADD_TO_CART" , payload:item }) } className="btn" disabled={!item.inStock}>{!item.inStock ? "Out of Stock" : "Add to cart"}</button>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default ProductListing;
