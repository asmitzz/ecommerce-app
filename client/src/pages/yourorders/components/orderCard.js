const OrderCard = ({order}) => {
 let time = new Date(order?.Time).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});

 const totalPrice = () => {
    return order?.products.reduce( (total,p) => total + (p.price*p.quantity),0 );
 }

 const { address } = order;

    return (
        <div className="orderDetails">
                <div className="orderDetails__header">
                    <div>
                      <small><strong>ORDER PLACED</strong>: {time}</small><br/>
                    </div>
                    <div>
                       <small><strong>ORDER ID</strong> : #{order?.orderID}</small>
                    </div>
                </div>
                <div className="orderDetails__content">
                    {
                      order.products.map( p => (
                        <div key={p._id}>
                          <small><strong>PRODUCT ID</strong> : #{p.product}</small>
                          <small><strong>PRODUCT Name</strong> : {p.name}</small>
                          <small><strong>Quantity</strong> : {p.quantity}</small>
                          <small><strong>Price</strong> : ₹ {p.price}</small><br/>
                        </div>
                      ) )
                    }
                    <small><strong>Total</strong> : ₹ {totalPrice()}</small>
                    <br/>
                    <small><strong>ADDRESS</strong> : {address?.name}, {address?.address} ,{address?.city?.toUpperCase()} , {address?.state?.toUpperCase()} , {address?.locality} , {address?.pincode} , India</small>
                </div>
            </div>
    )
}

export default OrderCard;
