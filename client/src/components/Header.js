import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishContext";



const Header = ({route}) => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
    return (
        <nav className="nav">
        <ul>
          <li>
            <i className="fa fa-bars"></i>
          </li>
          <li style={{ flex: 1 }} onClick={() => route("ProductListing")}>
            <h1>ShoppingHub</h1>
          </li>
          <li onClick={() => route("WishList")}>
            <i className="fa fa-heart">
              <span className="badge">{wishlist.length}</span>
            </i>
            <span className="icon-name">Wishlist</span>
          </li>
          <li onClick={() => route("Cart")}>
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
