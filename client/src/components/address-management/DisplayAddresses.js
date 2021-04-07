import AddressContent from "./AddressContent";
import { useAddress } from "../../contexts/AddressContext";
import { useEffect } from "react";
import { withRouter } from "react-router";

const DisplayAddresses = ({ history }) => {

  useEffect(() => {
    window.scroll(0,0)
}, [])

  const { address } = useAddress();
 
  return (
    <div className="address_container">
      <h3>Choose Delivery Address</h3>
      {
        address.map((displayAddress) => (
          <AddressContent key={displayAddress.id} {...displayAddress}/>
        ))
      }
      <br />
      <button className="primary-btn" onClick={() => history.push("/newaddress")}>
        Add a new Address
      </button>

    </div>
  );
};

export default withRouter(DisplayAddresses);
