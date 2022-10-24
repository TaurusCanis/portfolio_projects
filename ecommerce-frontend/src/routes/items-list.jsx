import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import item1Mockup from "../img/item-1-mockup.jpg";

export default function ItemsList() {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/ecommerce-api/items/", {
            method: 'GET',
        })
        .then((response) => response.json())
        .then(data => {
            console.log("DATA: ", data);
            setItems(data);
            setIsLoading(false);
        })
    }, []);

    return (
        <>
            { !isLoading &&
                <>
                <div className="items-container">
                    { items.map((item, i) => 
                    <Link className="item-container" to={`${item.id}`}>
                        {/* <div className="item-container"> */}
                            <h3 className="product-title">{item.title}</h3>
                            <div className="img-container-card">
                                <img src={require(`../img/item-${i + 1}-mockup.jpg`)}></img>
                            </div>
                            <div className="price-label"><span>$</span>{item.price}</div>
                            {/* <button>Details</button> */}
                        {/* </div> */}
                    </Link>
                    )}
                </div>
                </>
            }
        </>
    )
}