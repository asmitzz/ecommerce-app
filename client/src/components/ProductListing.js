import React,{ useContext } from 'react';
import { productContext } from '../contexts/ProductContext';
import { wishlistContext } from '../contexts/WishListContext';

const ProductListing = () => {

    const {dispatchWishlist} = useContext(wishlistContext);
    const {products,dispatchProducts} = useContext(productContext);

    const addToWishlist = (item) => {
        if( item.isWishlist ){
            dispatchProducts({ type:"REMOVEFROMWISHLIST",id:item.id });
            dispatchWishlist({ type:"REMOVEFROMWISHLIST",id:item.id });
            return;
        }
        dispatchProducts({ type:"ADDTOWISHLIST",id:item.id });
        dispatchWishlist({ type:"ADDTOWISHLIST",item:{...item,isWishlist:true} });
    }

    return (
        <div className="products">
            {
                products.map( item => (
                    <div key={item.id} className="card">
                      <i onClick={() => addToWishlist(item)} style={{ color:item.isWishlist ? 'red' : 'white'}} className="fa fa-heart" aria-hidden="true"></i>
                      <img className="card-img" src={item.image}/>
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
