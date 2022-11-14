import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../DataContext";

export default function Success() {
    const { sessionId, clearSessionId, BASE_URL } = useContext(DataContext);
    const params = useParams();
    const url = BASE_URL + `ecommerce-api/orders/${sessionId}/`;
    const [orderDetails, setOrderDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(url, {
            method: 'GET',
        })
        .then(res => res.json())
        .then(json => {
            console.log("JSON: ", json);
            setOrderDetails(json);
            setIsLoading(false);
        })
        .then(() => clearSessionId(sessionId));
    }, []);

    // useEffect(() => {
    //     clearSessionId(sessionId);
    // }, []);
    
    return (
        <main>
            { !isLoading &&
                <>
                    <h2> Success!!!</h2>
                    <div>Confirmation Number: {orderDetails.session_id}</div>
                    <div>Ship to:</div>
                    <div>{orderDetails.customer.first_name} {orderDetails.customer.last_name}</div>
                    <div>{orderDetails.shipping_address.street_address}</div>
                { orderDetails.shipping_address.apartment_address &&
                    <div> orderDetails.shipping_address.apartment_address</div>}
                    <div>{orderDetails.shipping_address.city}, {orderDetails.shipping_address.state}</div>
                    <div>{orderDetails.shipping_address.zip}</div>
                    <div>Order Details:</div>
                    {orderDetails.items.map((item, key) => 
                        <div>{item.quantity} {item.item_variant.title} @ {item.item_variant.retail_price} each</div>
                    )}
                    <div>Total: {orderDetails.grand_total}</div>
                </>
            }
        </main>
    );
}