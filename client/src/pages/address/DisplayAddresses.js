import AddressContent from "./components/AddressContent";
import { useAddress } from "../../contexts/AddressContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DisplayAddresses = () => {

  useEffect(() => {
    window.scroll({ behavior:'smooth',top:0 });
  })

  const { address } = useAddress();
  const navigate = useNavigate();

  return (
    <div className="address_container">
      <h3>Choose Delivery Address</h3>
      {
        address.map((displayAddress) => (
          <AddressContent key={displayAddress._id} {...displayAddress}/>
        ))
      }
      <br />
      <button className="primary-btn" onClick={() => navigate("/newaddress")}>
        Add a new Address
      </button>

    </div>
  );
};

export default DisplayAddresses;
