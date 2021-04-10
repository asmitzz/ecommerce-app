import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishContext";
import { useAuth } from "../contexts/AuthContext";
import Sidebar from "./Sidebar";
import Backdrop from "./Backdrop";
import { useState } from "react";

const Header = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const { userDetails } = useAuth();

  const { name } = userDetails;

  const [showSidebar,setShowSidebar] = useState(false); 

    return (
        <nav className="nav">
            <Backdrop show={showSidebar} onClick={() => setShowSidebar(false)}/>
            <Sidebar className={showSidebar ? "show__sidebar" : ""} setShowSidebar={setShowSidebar}/>
        <ul>
          <li>
            <i className="fa fa-bars" onClick={() => setShowSidebar(true)}></i>
          </li>
          <li style={{ flex: 1 }} onClick={() => navigate("/")}>
            <h1>ShoppingHub</h1>
          </li>
          <li>
             <h4>Hello {name}!</h4>
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
