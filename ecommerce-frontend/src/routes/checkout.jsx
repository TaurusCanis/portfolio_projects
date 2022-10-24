import { useState, useContext } from "react";
import OrderSummary from "../components/OrderSummary";
import { useNavigate } from "react-router-dom";
import DataContext from "../DataContext";
import { useFormFields } from "../hooks/hooks";

export default function Checkout() {
    const [sameAddress, setSameAddress] = useState(false);
    const [customerInformation, setCustomerInformation] = useFormFields({
        "firstName": "",
        "lastName": "",
        "email": "",
        "phone": "",
    });
    const [shippingAddress, setShippingAddress] = useFormFields({
        "address1": "",
        "address2": null,
        "city": "",
        "state": "",
        "zip": "",
    });
    const [billingAddress,setBillingAddress] = useFormFields({
        "address1": "",
        "address2": null,
        "city": "",
        "state": "",
        "zip": "",
    });
    const navigate = useNavigate();
    const {sessionId} = useContext(DataContext);

    function changeAddressStatus() {
        if (sameAddress) setSameAddress(false);
        else setSameAddress(true);
    }

    function formIsComplete(formValues, form) {
        if (sameAddress && form == "billing") return true;
        return formValues.every(value => value != "");
    }

    function formsComplete() {
        return (
            formIsComplete(Object.values(customerInformation), "customer")
            && formIsComplete(Object.values(shippingAddress), "shipping")
            && formIsComplete(Object.values(billingAddress), "billing")
        );
    }

    function getFetchBody() {
        return JSON.stringify({
            "sessionId": sessionId,
            "customer_info": customerInformation,
            "shippingAddress": shippingAddress,
            "billingAddress": sameAddress ? shippingAddress : billingAddress,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://127.0.0.1:8000/ecommerce-api/orders/${sessionId}/`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: getFetchBody(),
        })
        .then(res => res.json())
        .then(json => console.log("JSON>>>: ", json))
        .then(() => navigate("/payment"))
    }

    return (
        <div className="container">
            <h1>Checkout</h1>
            <div className="container-row">
                <div className="container">
                    <div>
                        <h4>Customer Information</h4>
                        <form className="container checkout-form">
                            <input name="firstName" onChange={setCustomerInformation} className="checkout-form-input" placeholder="First Name" type="text"></input>
                            <input name="lastName"  onChange={setCustomerInformation} className="checkout-form-input" placeholder="Last Name" type="text"></input>
                            <input name="email"  onChange={setCustomerInformation} className="checkout-form-input" placeholder="Email Address" type="email"></input>
                            <input name="phone"  onChange={setCustomerInformation} className="checkout-form-input" placeholder="Telephone Number" type="phone"></input>
                        </form>
                    </div>
                    <div>
                        <h4>Shipping Address</h4>
                        <form className="container checkout-form">
                            <input name="address1" onChange={setShippingAddress} className="checkout-form-input" placeholder="Address 1" type="address"></input>
                            <input name="address2" onChange={setShippingAddress} className="checkout-form-input" placeholder="Address 2" type="address"></input>
                            <input name="city" onChange={setShippingAddress} className="checkout-form-input" placeholder="City" type="text"></input>
                            <input name="state" onChange={setShippingAddress} className="checkout-form-input" placeholder="State" type="text"></input>
                            <input name="zip" onChange={setShippingAddress} className="checkout-form-input" placeholder="Zip Code" type="number"></input>
                        </form>
                    </div>
                    <div>
                        <form>
                            <label>Check if billing address is the same as shipping address: </label>
                            <input checked={sameAddress} onChange={changeAddressStatus} type="checkbox" />
                        </form>
                    </div>
                    { !sameAddress &&
                    <div>
                        <h4>Billing Address</h4>
                        <form className="container checkout-form">
                            <input name="address1" onChange={setBillingAddress} className="checkout-form-input" placeholder="Address 1" type="address"></input>
                            <input name="address2" onChange={setBillingAddress} className="checkout-form-input" placeholder="Address 2" type="address"></input>
                            <input name="city" onChange={setBillingAddress} className="checkout-form-input" placeholder="City" type="text"></input>
                            <input name="state" onChange={setBillingAddress} className="checkout-form-input" placeholder="State" type="text"></input>
                            <input name="zip" onChange={setBillingAddress} className="checkout-form-input" placeholder="Zip Code" type="number"></input>
                        </form>
                    </div>
                    }
                </div>
                <>
                    <OrderSummary />
                </>
            </div>
            <button disabled={!formsComplete()} onClick={handleSubmit} className="checkout-button">Continue</button>
        </div>
    );
}