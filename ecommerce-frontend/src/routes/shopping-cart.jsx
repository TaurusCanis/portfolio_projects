import OrderSummary from "../components/OrderSummary";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../DataContext";
import { useState } from "react";

export default function ShoppingCart() {
    const { sessionId, BASE_URL } = useContext(DataContext);
    const [orderDetails, setOrderDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [cartHasChanged, setCartHasChanged] = useState(false);

      useEffect(() => {
        if (sessionId != null) {
            fetch(`${BASE_URL}ecommerce-api/orders/${sessionId}/`, {
                method: "GET"
            })
            .then(res => res.json())
            .then(json => {
                console.log("json.items: ", json)
                setOrderDetails({json});
                setIsLoading(false);
            })
            // .then(() => setIsLoading(false))
            .catch(err => {
                console.log("ERROR: ", err);
                navigate("/items");
            });
        }
        setCartHasChanged(false);
        console.log("BULLDOG")
    }, [cartHasChanged])
    
    return (
        <main className="container shopping-cart">
            <h1>Shopping Cart</h1>
            <OrderSummary orderDetails={orderDetails} isLoading={isLoading} setCartHasChanged={setCartHasChanged} />
            <Link to="/checkout">
                <button className="checkout-button">Checkout</button>
            </Link>
        </main>
    );
}