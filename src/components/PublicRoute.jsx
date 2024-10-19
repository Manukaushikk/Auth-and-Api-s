// PublicRoute.js
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    // Check conditions to access public routes
    const isAuthenticated = localStorage.getItem("otp") !== null;

    // If OTP is stored, restrict access to public routes and redirect to TwoWayAuth
    if (isAuthenticated) {
        return <Navigate to="/twowayauth" replace />;
    }

    return children;
};

export default PublicRoute;
