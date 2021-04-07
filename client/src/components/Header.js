import { withRouter } from "react-router";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishContext";

const Header = ({history}) => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
    return (
        <nav className="nav">
        <ul>
          <li>
            <i className="fa fa-bars"></i>
          </li>
          <li style={{ flex: 1 }} onClick={() => history.push("/")}>
            <h1>ShoppingHub</h1>
          </li>
          <li onClick={() => history.push("/wishlist")}>
            <i className="fa fa-heart">
              <span className="badge">{wishlist.length}</span>
            </i>
            <span className="icon-name">Wishlist</span>
          </li>
          <li onClick={() => history.push("/cart")}>
            <i className="fa fa-shopping-cart">
              <span className="badge">{cart.length}</span>
            </i>
            <span className="icon-name">Cart</span>
          </li>
        </ul>
      </nav>
    )
}

export default withRouter(Header);
