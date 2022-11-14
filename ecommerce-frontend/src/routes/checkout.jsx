import { useState, useContext, useEffect } from "react";
import OrderSummary from "../components/OrderSummary";
import { useNavigate } from "react-router-dom";
import DataContext from "../DataContext";
// import { useFormFields } from "../hooks/hooks";

export default function Checkout() {
    const { BASE_URL } = useContext(DataContext);
    const [sameAddress, setSameAddress] = useState(false);
    const [customerInformation, setCustomerInformation] = useState({    
        "first_name": "",
        "last_name": "",
        "email_address": "",
        "phone_number": "",
    });
    const [shippingAddress, setShippingAddress] = useState({
        "street_address": "",
        "apartment_address": "",
        "city": "",
        "state": "",
        "zip": "",
    });
    const [billingAddress,setBillingAddress] = useState({
        "street_address": "",
        "apartment_address": "",
        "city": "",
        "state": "",
        "zip": "",
    });
    const navigate = useNavigate();
    const {sessionId} = useContext(DataContext);
    const [orderDetails, setOrderDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [cartHasChanged, setCartHasChanged] = useState(false);

    useEffect(() => {
        if (sessionId) {
            let url = BASE_URL + `ecommerce-api/orders/${sessionId}/`
            fetch(url, {
                method:"GET"
            })
            .then(res => res.json())
            .then(json => {
                console.log("JSON****: ", json);
                setOrderDetails({json});
                setIsLoading(false);
            }
        )}
        setCartHasChanged(false);
    }, [cartHasChanged]);

    useEffect(() => {
        if (Object.keys(orderDetails).length > 0) {
                if (Object.values(orderDetails.json.customer)
                    .filter(key => ['first_name', 'last_name', 'email_address', 'phone_number']
                    .includes(key))
                    .every(el => el.length > 0)) {
                    console.log("CUSTOMER: ", orderDetails.json.customer);
                    setCustomerInformation({
                        "first_name": orderDetails.json.customer.first_name,
                        "last_name": orderDetails.json.customer.last_name,
                        "email_address": orderDetails.json.customer.email_address,
                        "phone_number": orderDetails.json.customer.phone_number,
                    });
                }
                if (Object.values(orderDetails.json.shipping_address)
                    .filter(key => ['street_address', 'city', 'state', 'zip']
                    .includes(key))
                    .every(el => el.length > 0)) 
                {
                    console.log("setShippingAddress: ", orderDetails.json.shipping_address);
                    setShippingAddress({
                        "street_address": orderDetails.json.shipping_address.street_address,
                        "apartment_address": orderDetails.json.shipping_address.apartment_address,
                        "city": orderDetails.json.shipping_address.city,
                        "state": orderDetails.json.shipping_address.state,
                        "zip": orderDetails.json.shipping_address.zip,
                    });
                }
                if (Object.values(orderDetails.json.billing_address)
                    .filter(key => ['street_address', 'city', 'state', 'zip']
                    .includes(key))
                    .every(el => el.length > 0)) 
                {
                    console.log("setBillingAddress");
                    setBillingAddress({
                        "street_address": orderDetails.json.billing_address.street_address,
                        "apartment_address": orderDetails.json.billing_address.apartment_address,
                        "city": orderDetails.json.billing_address.city,
                        "state": orderDetails.json.billing_address.state,
                        "zip": orderDetails.json.billing_address.zip,
                    });
                }
        }
    }, [orderDetails])

    function changeAddressStatus() {
        if (sameAddress) setSameAddress(false);
        else setSameAddress(true);
    }

    function formIsComplete(formValues, form) {
        console.log("formValues: ", formValues, " form: ", form);
        if (sameAddress && form == "billing") return true;
        return formValues.every(value => value != "");
    }

    function formsComplete() {
        const shippingValues = Object.values(shippingAddress);
        shippingValues.splice(1,1);

        const billingValues = Object.values(shippingAddress);
        billingValues.splice(1,1);
        
        return (
            formIsComplete(Object.values(customerInformation), "customer")
            && formIsComplete(shippingValues, "shipping")  // remove "apartment_address key for formIsComplete check"
            && formIsComplete(billingValues, "billing")
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
        const url = BASE_URL + `ecommerce-api/orders/${sessionId}/`;

        fetch(url, {
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

    function handleChange(e) {
        console.log("e.target.className: ", e.target.className, " type: ", typeof(e.target.className));
        if (e.target.className.includes("customer-info")) {
            setCustomerInformation(prevState => ({ ...prevState, [e.target.name]: e.target.value}));
        }
        else if (e.target.className.includes("shipping-address")) {
            setShippingAddress(prevState => ({...prevState, [e.target.name]: e.target.value}));
        }
        else if (e.target.className.includes("billing-address")) {
            setBillingAddress(prevState => ({...prevState, [e.target.name]: e.target.value}));
        }
    }

    return (
        <div className="container">
            <h1>Checkout</h1>
            <div className="container-row">
                <div className="container">
                    <div>
                        <h4>Customer Information</h4>
                        <form className="container checkout-form">
                            <input name="first_name" value={customerInformation.first_name} onChange={handleChange} className="checkout-form-input customer-info" placeholder="First Name" type="text"></input>
                            <input name="last_name"  value={customerInformation.last_name} onChange={handleChange} className="checkout-form-input customer-info" placeholder="Last Name" type="text"></input>
                            <input name="email_address"  value={customerInformation.email_address} onChange={handleChange} className="checkout-form-input customer-info" placeholder="Email Address" type="email"></input>
                            <input name="phone_number"  value={customerInformation.phone_number} onChange={handleChange} className="checkout-form-input customer-info" placeholder="Telephone Number" type="phone"></input>
                        </form>
                    </div>
                    <div>
                        <h4>Shipping Address</h4>
                        <form className="container checkout-form">
                            <input name="street_address" value={shippingAddress.street_address} onChange={handleChange} className="checkout-form-input shipping-address" placeholder="Address 1" type="address"></input>
                            <input name="apartment_address" value={shippingAddress.apartment_address} onChange={handleChange} className="checkout-form-input shipping-address" placeholder="Address 2" type="address"></input>
                            <input name="city" value={shippingAddress.city} onChange={handleChange} className="checkout-form-input shipping-address" placeholder="City" type="text"></input>
                            <input name="state" value={shippingAddress.state} onChange={handleChange} className="checkout-form-input shipping-address" placeholder="State" type="text"></input>
                            <input name="zip" value={shippingAddress.zip} onChange={handleChange} className="checkout-form-input shipping-address" placeholder="Zip Code" type="number"></input>
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
                            <input name="street_address" value={billingAddress.street_address} onChange={handleChange} className="checkout-form-input billing-address" placeholder="Address 1" type="address"></input>
                            <input name="apartment_address" value={billingAddress.apartment_address} onChange={handleChange} className="checkout-form-input billing-address" placeholder="Address 2" type="address"></input>
                            <input name="city" value={billingAddress.city} onChange={handleChange} className="checkout-form-input billing-address" placeholder="City" type="text"></input>
                            <input name="state" value={billingAddress.state} onChange={handleChange} className="checkout-form-input billing-address" placeholder="State" type="text"></input>
                            <input name="zip" value={billingAddress.zip} onChange={handleChange} className="checkout-form-input billing-address" placeholder="Zip Code" type="number"></input>
                        </form>
                    </div>
                    }
                </div>
                <>
                    <OrderSummary setCartHasChanged={setCartHasChanged} orderDetails={orderDetails} isLoading={isLoading}/>
                </>
            </div>
            <button disabled={!formsComplete()} onClick={handleSubmit} className="checkout-button">Continue</button>
        </div>
    );
}