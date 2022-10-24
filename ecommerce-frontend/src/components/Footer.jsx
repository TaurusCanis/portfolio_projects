import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="container">
    
        {/* <!--Copyright--> */}
        <div className="footer-item">
          © 2022
        </div>
        <Link to="/terms_and_conditions" className="footer-item" target="_blank">
            Terms and Conditions
        </Link>
        {/* <Link to="/privacy_policy" className="footer-item" target="_blank">
            Privacy Policy
        </Link> */}
        <Link to="/returns" className="footer-item" target="_blank">
             Returns Policy
        </Link>
    
        {/* <!--/.Copyright--> */}
    
      </footer>
    );
}