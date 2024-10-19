// Unauthorized.jsx
import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Unauthorized Access</h1>
            <p>You tried to access a private route that requires authentication.</p>
            <p>Please <Link to="/signin">Sign In</Link> to continue or <Link to="/signup">Sign Up</Link> if you don't have an account.</p>
        </div>
    );
};

export default Unauthorized;
