import React, { useEffect, useState } from 'react';
import {useAuth} from '../../contexts/AuthContext';

import axios from 'axios';
import OrderCard from './components/orderCard';

const MyOrders = () => {
    const {uid} = useAuth();
    const [orders,setOrders] = useState([])

    useEffect( () => {
        ( async function(){
          try {
            const res = await axios.get("https://shopping-hub-2021.herokuapp.com/api/orders/"+uid);
            setOrders(res.data?.orders)
          } catch (error) {
            setOrders(null)
          }
        } )()
      },[uid] )

    return (
        <div className="yourorders__container">
            <h1 className="yourorders__container__heading">Your Orders</h1>
            
             { orders ? orders.map( order => (
                 <OrderCard key={order.orderID} order={order}/>
             )) : <p>No orders found</p>}
             
        </div>
    );
};

export default MyOrders;
