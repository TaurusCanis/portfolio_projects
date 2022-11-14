import QuantityToggle from "./QuantityToggle";


export default function ItemQuantity({item}) {
    return (
        <>
            <QuantityToggle />
            <span>+</span>
            {item.quantity}
            <span>-</span>
        </>
    );
}