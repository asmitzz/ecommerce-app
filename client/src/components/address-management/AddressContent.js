import { useState } from "react";
import { useAddress } from "../../contexts/AddressContext";
import EditAddress from "./EditAddress";

const AddressContent = (props) => {

  const { id ,name, type, number, pincode, city, state, address, locality } = props;
  const [edit, setEdit] = useState(false);
  const { dispatchAddress,selectedAddress } = useAddress();
 
  
  const HandleAddressSelection = (e) => {
    dispatchAddress({type:"SELECTED_ADDRESS",payload:e.target.id})
  }

  return (
    <div className="addresses_container">
      {!edit ? (
        <>
          <input id={id} name="address" defaultChecked={ selectedAddress && selectedAddress.id === id} type="radio" onChange={HandleAddressSelection} />
          <div className="addresses">
            <span className="address_type">{type}</span>
            <div>
              <span className="name"> {name}</span>
              <span className="number">{number}</span>
              <button
                onClick={() => setEdit(!edit)}
                className="secondary-btn"
              >
              <i className="fa fa-edit"></i> EDIT
              </button>
            </div>
            <p>
              {address} , {locality} , {city} , {state} ,
              <strong> {pincode}</strong>
            </p>
            { selectedAddress !== null && <button className="secondary-btn" onClick={ () => props.route("OrderSummary") }>Deliver to this address</button>}
          </div>
        </>
      ) : (
        <EditAddress {...props} edit={setEdit} />
      )}
    </div>
  );
};

export default AddressContent;
