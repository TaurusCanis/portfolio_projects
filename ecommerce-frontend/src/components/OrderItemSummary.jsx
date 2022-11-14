import { useEffect } from "react";
import { useContext } from "react";
import DataContext from "../DataContext";
import ItemQuantity from "./ItemQuantity";


export default function OrderItemSummary({item, pathname, key, setCartHasChanged}) {
    const { addToCart } = useContext(DataContext);

    function removeFromCart(e) {
        addToCart(item.item_variant.id, 0);
        setCartHasChanged(true);
    }

    return (
        <>
            <div>
                {/* { pathname == "/shopping-cart" &&
                    <ItemQuantity item={item} />
                }
                { pathname != "/shopping-cart" &&
                    item.quantity
                } */}
                {item.quantity} {item.item_variant.title} @ ${item.item_variant.retail_price} each <button id={`remove-${item.item_variant.id}`} onClick={removeFromCart}>Remove</button>
            </div> 
        </>
    );
}