import AddressContent from "./AddressContent";
import { useAddress } from "../../contexts/AddressContext";

const DisplayAddresses = ({ route }) => {
  const { address } = useAddress();
 
  return (
    <div className="address_container">
      <h3>Choose Delivery Address</h3>
      {
        address.map((displayAddress) => (
          <AddressContent key={displayAddress.id} {...displayAddress} />
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
