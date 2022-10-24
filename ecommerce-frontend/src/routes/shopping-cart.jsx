import OrderSummary from "../components/OrderSummary";
import { Link } from "react-router-dom";

export default function ShoppingCart() {
    return (
        <div className="container shopping-cart">
            <h1>Shopping Cart</h1>
            <OrderSummary />
            <Link to="/checkout">
                <button className="checkout-button">Checkout</button>
            </Link>
        </div>
    );
}