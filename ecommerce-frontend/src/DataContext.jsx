import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
    const [sessionId, setSessionId] = useState(() => {
        const sessionId = localStorage.getItem("sessionId");
        return sessionId ? sessionId : null;
    });

    const [cart, setCart] = useState(() => {
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : {};
    });

    async function updateOrder(variantId, amount, method, session_id=null) {
        let url = "http://127.0.0.1:8000/ecommerce-api/orders/";

        const body = {
            variant_id: variantId,
            quantity: amount,
        }

        if (sessionId != null) {
            body["sessionId"] = sessionId;
            url += sessionId + "/";
        }
        return fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify(body),
        })
        .then(res => res.json())
        .then(json => {
            console.log("JSON******: ", json);
            return json
        });
    }

    async function addToCart(variantId, amount) {
        if (sessionId == null) {
            const orderData = await updateOrder(variantId, amount, "POST");
            setSessionId(orderData.session_id);
            localStorage.setItem("sessionId", orderData.session_id);
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

    const contextData = { cart, addToCart, sessionId, clearSessionId };
    
    return (
        <DataContext.Provider value={ contextData }>
            { children }
        </DataContext.Provider>
    );
}

export default DataContext;