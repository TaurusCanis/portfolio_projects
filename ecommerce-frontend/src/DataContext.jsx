import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
    const PRODUCTION = false;
    let BASE_URL = PRODUCTION ? "https://portfolio-projects-app-is9ao.ondigitalocean.app/" 
                              : "http://127.0.0.1:8000/";

    const [sessionId, setSessionId] = useState(() => {
        const sessionId = localStorage.getItem("sessionId");
        return sessionId ? sessionId : null;
    });

    const [cart, setCart] = useState(() => {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : {};
    });

    async function updateOrder(variantId, amount, method, session_id=null) {
        let url = `${BASE_URL}ecommerce-api/orders/`;

        const body = {
            variant_id: variantId,
            quantity: amount,
        }

        if (sessionId != null) {
            body["sessionId"] = sessionId;
            url += sessionId + "/";
        }

        console.log("URL: ", url);
        console.log("METHOD: ", method);
        // PICK UP HERE
        console.log("BODY: ", body);

        return fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(body),
        })
        .then((res, url) => {
            console.log("URL*****: ", url);
            return res.json();
        })
        .then(json => {
            console.log("JSON******: ", json);
            return json
        })
        .catch(err => {
            console.log('ERROR: ',err);
         });;
    }

    async function addToCart(variantId, amount) {
        if (sessionId == null) {
            const orderData = await updateOrder(variantId, amount, "POST");
            console.log("orderData: ", orderData);
            setSessionId(orderData.id);
            localStorage.setItem("sessionId", orderData.id);
        } else {
            updateOrder(variantId, amount, "PUT", localStorage.getItem("sessionId"));
        }

        console.log("amount: ", amount)
        const key = `${variantId}`;
        setCart(previousCart => (
            {...previousCart, [key]: amount }
        ));

        let storedCart = {};

        if (!cartIsEmpty()) {
            storedCart = JSON.parse(localStorage.getItem("cart"));
        }

        storedCart[key] = amount;
        console.log("storedCart: ", storedCart, typeof(storedCart));
        localStorage.setItem("cart", JSON.stringify(storedCart));
        
        console.log("cart: ", cart);
        console.log("localStorage: ", localStorage);
    }

    function cartIsEmpty() {
        return localStorage.getItem("cart") == null;
    }

    function clearSessionId() {
        localStorage.removeItem('sessionId');
        setSessionId(null);
    }

    const contextData = { cart, addToCart, sessionId, clearSessionId, BASE_URL };
    
    return (
        <DataContext.Provider value={ contextData }>
            { children }
        </DataContext.Provider>
    );
}

export default DataContext;