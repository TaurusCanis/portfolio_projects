import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DataContext from "../DataContext";
import { useContext } from "react";

export default function Navbar() {
    const {cart, addToCart} = useContext(DataContext);

    return (
        <nav>
            <div>
                <Link className="nav-item" to="/">
                    <span>TaurusCanis Rex</span>
                </Link>
                <Link className="nav-item" to="/items">
                    <span>Shop</span>
                </Link>
                <Link className="nav-item" to="/connect">
                    <span>Connect</span>
                </Link>
            </div>
            <div>
                <Link className="nav-item" to="shopping-cart">
                    {/* <a href="{% url 'core:order_summary' %}" class="nav-link waves-effect"> */}
                        {/* <span class="badge red z-depth-1 mr-1"> {{ request.session.id| cart_item_count }} </span> */}
                        
                        <FontAwesomeIcon icon="shopping-cart" />
                        <span class="clearfix white-text d-none d-sm-inline-block"> Cart </span>
                        {/* { Object.keys(cart).length > 0 && <span>  {Object.keys(cart).length}</span> } */}
                    {/* </a> */}
                </Link>
            </div>
        </nav>
    );
}