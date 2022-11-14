

export default function QuantityToggle({ quantity, setQuantity }) {
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

    return (
        <>
            <button onClick={(e) => increaseQuantity(e, -1)}>-</button> {quantity} <button onClick={(e) => increaseQuantity(e, 1)}>+</button>
        </>
    );
}