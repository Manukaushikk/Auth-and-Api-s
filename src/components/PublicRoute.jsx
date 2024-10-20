// PublicRoute.js
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    // Check if the user is authenticated based on the OTP
    const isAuthenticated = localStorage.getItem("otp") !== null;

    // If authenticated, redirect to the Two-Way Auth page
    if (isAuthenticated) {
        return <Navigate to="/twowayauth" replace />;
    }

    // Otherwise, allow access to the public route
    return children;
};

export default PublicRoute;
