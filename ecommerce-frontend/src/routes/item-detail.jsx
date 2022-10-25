import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import item1Mockup from "../img/item-1-mockup.jpg";
import DataContext from "../DataContext";

let SIZE_OPTIONS = [
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL',
]

export default function ItemDetail() {
    const navigate = useNavigate();
    let params = useParams();
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [variantId, setVariantId] = useState();
    const {cart, addToCart} = useContext(DataContext);
    const { BASE_URL } = useContext(DataContext);

    useEffect(() => {
        const url = BASE_URL + `ecommerce-api/items/${params.itemId}/`;

        fetch(url, {
            method: 'GET',
        })
        .then((response) => response.json())
        .then(data => {
            console.log("DATA: ", data);
            setItem(data);
            setVariantId(data.item_variants[0].id)
            setIsLoading(false);
        })
    }, []);

    function updateQuantity(amount) {
        // e.preventDefault();
        setQuantity(quantity + amount);
    }

    function increaseQuantity(e, amount) {
        e.preventDefault();
        if (quantity + amount >= 1) {
            updateQuantity(amount);
        }
    }

    function updateCart(e) {
        e.preventDefault();
        addToCart(variantId, quantity);
    }

    function updateVariantId(e) {
        e.preventDefault();
        setVariantId(e.target.value)
    }

    function navigateToCheckout() {
        navigate("/checkout");
    }

    return (
        <>
        { !isLoading &&
            <div class="container product-page-container">
                <div className="item-detail-container">
                    <div className="img-container">
                        <img src={item1Mockup}></img>
                    </div>
                    <div className="product-purchase-container">
                        <div>
                            <h2 className="product-title">{item.title}</h2>
                            <div className="price-label">${item.price}</div>
                        </div>
                        <form className="add-to-cart-form">
                            <div className="container">
                                { item.item_variants && 
                                    <div>
                                        <label>Size: </label>
                                        <select onChange={updateVariantId} className="add-to-cart-form-input">
                                            {
                                                item.item_variants.map(iv => 
                                                    <option value={iv.id}>{iv.title}</option>    
                                                )
                                            }
                                        </select>
                                    </div>
                                }
                                <div>
                                    <label>Quantity: <button onClick={(e) => increaseQuantity(e, -1)}>-</button> {quantity} <button onClick={(e) => increaseQuantity(e, 1)}>+</button></label>
                                </div>
                                <button className="add-to-cart-form-input" onClick={updateCart}>Add to Cart</button>
                            </div>
                        </form>
                        { Object.keys(cart).length > 0 && 
                            <form className="add-to-cart-form">
                                <div className="container">
                                    <button onClick={navigateToCheckout} class="add-to-cart-form-input checkout-button">Proceed to Checkout</button>
                                </div>
                            </form>
                        }
                    </div>
                </div>
                <div className="product-info-container">
               
                    <h2 className="product-title">TaurusCanis Rex T-Shirt</h2>
                    <div className="product-description" dangerouslySetInnerHTML={{ __html: item.description}}>
                    </div>
                </div>
            </div>
        }   
        </>
    );
}
