import React,{ useContext } from 'react';
import { productContext } from '../contexts/ProductContext';

const ProductListing = () => {

    const {products,dispatch} = useContext(productContext);

    const addToWishlist = (item) => {
        if( item.isWishlist ){
            dispatch({ type:"REMOVEFROMWISHLIST",id:item.id });
            return;
        }
        dispatch({ type:"ADDTOWISHLIST",id:item.id });
    }

    return (
        <div className="products">
            {
                products.map( item => (
                    <div key={item.id} className="card">
                      <i onClick={() => addToWishlist(item)} style={{ color:item.isWishlist ? 'red' : 'white'}} className="fa fa-heart" aria-hidden="true"></i>
                      <img alt="product" className="card-img" src={item.image}/>
                      <p>Price:{item.price}</p>
                      <p>{ item.inStock ? "Instock" : "out of stock" }</p>
                      <button className="btn" disabled={!item.inStock}>Add to cart</button>
                    </div>
                ))
            }
        </div>
    );
};

export default ProductListing;
