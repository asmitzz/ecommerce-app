import { useState } from "react";
import { useAddress } from "../../../contexts/AddressContext";
import { useCart } from "../../../contexts/CartContext";
import EditAddress from "./EditAddress";
import { useNavigate } from "react-router-dom";


const AddressContent = (props) => {

  const { id ,name, type, number, pincode, city, state, address, locality } = props;
  const [edit, setEdit] = useState(false);
  const { dispatchAddress,selectedAddress } = useAddress();
  const {cart} = useCart();
  const navigate = useNavigate();
  
  const HandleAddressSelection = (e) => {
    dispatchAddress({type:"SELECTED_ADDRESS",payload:e.target.id})
  }

  return (
    <div className="addresses_container">
      {!edit ? (
        <>
          <input id={id} name="address" checked={ selectedAddress && selectedAddress.id === id} type="radio" onChange={HandleAddressSelection} />
          <div className="addresses">
            <span className="address_type">{type}</span>
            <div>
              <span className="name"> {name}</span>
              <span className="number"> &nbsp;{number} </span>
              <div className="removeIcon">
                <button title="remove" onClick={() => dispatchAddress({ type:"REMOVE_ADDRESS",payload:id })} >
                  <i style={{ color:'rgb(223, 71, 89)' }} className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
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
            { selectedAddress !== null && selectedAddress.id === id  && <button className="secondary-btn" onClick={ () => cart.length > 0 ? navigate("/ordersummary") : navigate('/cart') }>Deliver to this address</button>}
          </div>
        </>
      ) : (
        <EditAddress {...props} edit={setEdit} />
      )}
    </div>
  );
};

export default AddressContent;
