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
      case "ADDTOWISHLIST":
        return {
          ...state,
          products: state.products.map((i) =>
            i.id === action.id ? { ...i, isWishlist: true } : i
          ),
        };
      case "REMOVEFROMWISHLIST":
        return {
          ...state,
          products: state.products.map((i) =>
            i.id === action.id ? { ...i, isWishlist: false } : i
          ),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(productsReducer, {
    products: productsDb,
    sortBy: null,
    includeOutOfStock: true,
    fastDelivery: false,
  });

  return { state, dispatch };
};

export default ProductReducer;
