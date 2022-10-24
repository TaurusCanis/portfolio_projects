import {
    Routes,
    Route,
} from "react-router-dom";
import ItemsList from "./items-list";
import ItemDetail from "./item-detail";
import Root from "./root";
import Checkout from "./checkout";
import TermsAndConditions from "./termsAndConditions";
import Returns from "./returns";
import ShoppingCart from "./shopping-cart";
import Payment from "./payment";
import Success from "./success";
// import PrivacyPolicy from "./privacyPolicy";

export default function Links() {
    return (
        <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/items" element={<ItemsList />} />
            <Route path="/items/:itemId" element={<ItemDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/shopping-cart" element={<ShoppingCart />} />
            <Route path="/terms_and_conditions" element={<TermsAndConditions />} />
            <Route path="/returns" element={<Returns />} />
            {/* <Route path="/privacy_policy" element={<PrivacyPolicy />} /> */}
            <Route
                path="*"
                element={
                    <main style={{ padding: "1rem" }}>
                        <p>There's nothing here!</p>
                    </main>
                }
            />
        </Routes>
    );
}