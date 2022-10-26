import { useEffect, useContext, useState } from "react";
import DataContext from "../DataContext";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {
    const { BASE_URL } = useContext(DataContext);
    const {cart, addToCart} = useContext(DataContext);
    const [orderItems, setOrderItems] = useState();
    const [orderDetails, setOrderDetails] = useState();
    const { sessionId } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        if (sessionId != null) {
            fetch(`${BASE_URL}ecommerce-api/orders/${sessionId}/`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                console.log("json.items: ", json)
                setOrderDetails(json);
            })
            .then(() => setIsLoading(false))
            .catch(err => {
                console.log("ERROR: ", err);
                navigate("/items");
            });
        }
    }, [])


    return (
        <div className="container order-summary-sidebar-container">
            { !isLoading && orderDetails.items.length > 0 ? 
            <>
                <h3>Order Summary</h3>
                <div>
                    {
                        orderDetails.items.map(item => 
                            <div>{item.quantity} {item.item_variant.title} @ ${item.item_variant.retail_price} each</div> 
                        )
                    }
                </div>
                <div>Grand Total: ${orderDetails.grand_total}</div> 
            </> 
            :
            <h3>You have no items in your shopping cart!</h3>
            }
        </div>
    );
}