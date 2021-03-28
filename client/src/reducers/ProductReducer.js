import { useReducer } from "react";
import { productsDb } from "../productsDb";

const ProductReducer = () => {
  const productsReducer = (state, action) => {
    switch (action.type) {
      case "SORT":
        return { ...state, sortBy: action.payload };
      case "INCLUDE_OUT_STOCK":
        return { ...state, includeOutOfStock: !state.includeOutOfStock };
      case "FAST_DELIVERY":
        return { ...state, fastDelivery: !state.fastDelivery };
      case "SORT_BY_PRICE_RANGE":
        return { ...state, priceRange: action.payload}
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(productsReducer, {
    products: productsDb,
    sortBy: null,
    includeOutOfStock: true,
    fastDelivery: false,
    priceRange:null
  });

  return { state, dispatch };
};

export default ProductReducer;
