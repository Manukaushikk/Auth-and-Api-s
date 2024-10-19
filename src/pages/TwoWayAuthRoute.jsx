// TwoWayAuthRoute.js
import { Navigate } from "react-router-dom";

const TwoWayAuthRoute = ({ children }) => {
  // Check if email is stored in session storage
  const isEmailStored = sessionStorage.getItem("email") !== null;

  // If email is not present, redirect to SignIn page
  if (!isEmailStored) {
    return <Navigate to="/signin" replace />;
  }

  // If email is present, allow access to TwoWayAuth route
  return children;
};

export default TwoWayAuthRoute;
