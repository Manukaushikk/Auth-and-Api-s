// PrivateRoute.js
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    // Check if the user is authenticated and if email is available
    const isAuthenticated = localStorage.getItem("otp") !== null;
    const isEmailStored = sessionStorage.getItem("email") !== null;

    // Redirect to sign-in if OTP is stored
    if (isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    // Redirect to Unauthorized if email is not stored
    if (!isEmailStored) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Otherwise, allow access to private routes
    return children;
};

export default PrivateRoute;
