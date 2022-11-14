import { useEffect, useContext, useState } from "react";
import DataContext from "../DataContext";
import { useNavigate, useLocation } from "react-router-dom";
import OrderItemSummary from "./OrderItemSummary";

export default function OrderSummary(props) {
    const { BASE_URL } = useContext(DataContext);
    const {cart, addToCart} = useContext(DataContext);
    const [orderItems, setOrderItems] = useState();
    // const [orderDetails, setOrderDetails] = useState();
    const { sessionId } = useContext(DataContext);
    // const [isLoading, setIsLoading] = useState(true);
    let navigate = useNavigate();
    let location = useLocation();

    // useEffect(() => {
    //     if (sessionId != null) {
    //         fetch(`${BASE_URL}ecommerce-api/orders/${sessionId}/`, {
    //             method: "GET"
    //         })
    //         .then(res => res.json())
    //         .then(json => {
    //             console.log("json.items: ", json)
    //             setOrderDetails(json);
    //         })
    //         .then(() => setIsLoading(false))
    //         .catch(err => {
    //             console.log("ERROR: ", err);
    //             navigate("/items");
    //         });
    //     }
    // }, [])

    function handleClick(e) {
        if (e.target.id == "continue-shopping") {
            navigate("/items");
        } 
        if (e.target.id == "edit-cart") {
            navigate("/shopping-cart");
        }
    }


    return (
        <div className="container order-summary-sidebar-container">
            { !props.isLoading && props.orderDetails.json.items.length > 0 ? 
            <>
                <h3>Order Summary</h3>
                <div>
                    {
                        props.orderDetails.json.items.map((item, i) => 
                            <OrderItemSummary setCartHasChanged={props.setCartHasChanged} key={i} isLoading={props.isLoading} item={item} orderDetails={props.orderDetails} pathname={location.pathname}/>                            
                        )
                    }
                </div>
                <div>Grand Total: ${props.orderDetails.json.grand_total}</div> 
                <button id="continue-shopping" onClick={handleClick}>Continue Shopping</button>
                { location.pathname == "/checkout" &&
                    <button id="edit-cart" onClick={handleClick}>Edit Cart</button>
                }
            </> 
            :
            <h3>You have no items in your shopping cart!</h3>
            }
        </div>
    );
}