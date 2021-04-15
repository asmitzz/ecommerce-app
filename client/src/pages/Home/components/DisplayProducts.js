import { useProducts } from "../../../contexts/ProductContext";
import ProductContent from './ProductContent';

const DisplayProducts = () => {

    const { products } = useProducts()

    return (
      <div style={{ display: products.length > 0 ? "grid" : "block" }} className="products">
         {
           products.length > 0 ? (
            products.map((item) => (
               <ProductContent item={item}/>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No results found</p>
          )
         }
      </div>
    )
};

export default DisplayProducts;
