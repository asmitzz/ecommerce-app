import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishContext";

const Header = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

    return (
        <nav className="nav">
        <ul>
          <li>
            <i className="fa fa-bars"></i>
          </li>
          <li style={{ flex: 1 }} onClick={() => navigate("/")}>
            <h1>ShoppingHub</h1>
          </li>
          <li onClick={() => navigate("/wishlist")}>
            <i className="fa fa-heart">
              <span className="badge">{wishlist.length}</span>
            </i>
            <span className="icon-name">Wishlist</span>
          </li>
          <li onClick={() => navigate("/cart")}>
            <i className="fa fa-shopping-cart">
              <span className="badge">{cart.length}</span>
            </i>
            <span className="icon-name">Cart</span>
          </li>
        </ul>
      </nav>
    )
}

export default Header;
