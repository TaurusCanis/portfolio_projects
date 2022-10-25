import { useEffect, useContext, useState } from "react";
import DataContext from "../DataContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_4tNiwpsFHEX7N7hon7bpW4kE00saVfxboZ");


export default function Payment() {
  const { BASE_URL } = useContext(DataContext);
    const { sessionId } = useContext(DataContext);
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
      let url = BASE_URL + `ecommerce-api/create-payment-intent/${sessionId}/`;
        fetch(url, {
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