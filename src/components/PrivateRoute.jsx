// PrivateRoute.js
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    // Check conditions to access private routes
    const isAuthenticated = localStorage.getItem("otp") !== null;
    const isEmailStored = sessionStorage.getItem("email") !== null;

    // If OTP is stored in localStorage, block access to private routes
    if (isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    // If email is not stored in sessionStorage, redirect to Unauthorized page
    if (!isEmailStored) {
        return <Navigate to="/unauthorized" replace />;
    }

    // If all conditions are satisfied, allow access to private routes
    return children;
};

export default PrivateRoute;
