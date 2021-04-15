import { useProducts } from "../../../contexts/ProductContext";

const Filter = () => {

    const {
        dispatchProduct,
        includeOutOfStock,
        fastDelivery,
        priceRange,
    } = useProducts();

    return (
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
              }}
            />
              1000</label>
          <button onClick={() => dispatchProduct({type:"CLEAR_ALL_FILTER"})} style={{background:'none',border:'none',cursor:'pointer'}}>Clear all</button>
          </div>
    );
};

export default Filter;
