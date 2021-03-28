import { useState } from "react";
import EditAddress from "./EditAddress";

const AddressContent = (props) => {

  const { id ,name, type, number, pincode, city, state, address, locality } = props;
  const [edit, setEdit] = useState(false);
  
  const HandleAddressSelection = (e) => {
       console.log(e.target.id);
  }

  return (
    <div className="addresses_container">
      {!edit ? (
        <>
          <input id={id} name="address" type="radio" onChange={HandleAddressSelection} />
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
          </div>
        </>
      ) : (
        <EditAddress {...props} edit={setEdit} />
      )}
    </div>
  );
};

export default AddressContent;
