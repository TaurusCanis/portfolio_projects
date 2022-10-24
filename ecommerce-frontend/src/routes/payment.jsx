import { useEffect, useContext, useState } from "react";
import DataContext from "../DataContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_4tNiwpsFHEX7N7hon7bpW4kE00saVfxboZ");


export default function Payment() {
    const { sessionId } = useContext(DataContext);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        fetch("http://127.0.0.1:8000/ecommerce-api/create-payment-intent/" + sessionId + "/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
        })
        .then(res => res.json())
        .then((data) => {
          if (data['success']) {
            setClientSecret(data.clientSecret)
          } else {
            
          }
        });
    }, []);

    const appearance = {
      theme: 'stripe',
    };
    const options = {
      clientSecret,
      appearance,
    };
  
    return (
      <div className="container">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    );
}