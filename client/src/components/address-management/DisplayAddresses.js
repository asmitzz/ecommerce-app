import AddressContent from "./AddressContent";
import { useAddress } from "../../contexts/AddressContext";
import { useEffect } from "react";

const DisplayAddresses = ({ route }) => {

  useEffect(() => {
    window.scroll(0,0)
}, [])

  const { address } = useAddress();
 
  return (
    <div className="address_container">
      <h3>Choose Delivery Address</h3>
      {
        address.map((displayAddress) => (
          <AddressContent key={displayAddress.id} {...displayAddress} route={route} />
        ))
      }
      <br />
      <button className="primary-btn" onClick={() => route("AddNewAddress")}>
        Add a new Address
      </button>

    </div>
  );
};

export default DisplayAddresses;
