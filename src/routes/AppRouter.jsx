import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routeConfig from "./routes"; // Adjust the path if needed
import { useAuth } from "../hooks/useAuth.jsx"; // Custom hook to check authentication status
import LoadingSpinner from "../components/LoadingSpinner.jsx/index.js"; // Placeholder component for loading
import SignIn from "../pages/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import MyComponent1 from "../pages/MyComponent1.jsx";
import MyComponent2 from "../pages/MyComponent2.jsx";

const AppRouter = () => {
    const { isAuthenticated, isTwoWayAuthEnabled } = useAuth(); // Assuming a hook that checks if a user is authenticated and if two-way auth is enabled

    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                {routeConfig.map(({ path, element, isPublic, isTwoWayAuth }) => {
                    if (isPublic) {
                        // Public route (accessible to everyone)
                        <>
                            <SignIn />
                            <SignUp />
                            <ForgotPassword />
                            <ResetPassword /></>
                        return <Route key={path} path={path} element={element} />;
                    } else if (isTwoWayAuth) {
                        // Protected route for two-way authentication
                        <>
                            <MyComponent1 />
                            <MyComponent2 />
                        </>

                        return (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    isAuthenticated && isTwoWayAuthEnabled ? (
                                        element
                                    ) : (
                                        <Navigate to="/signin" />
                                    )
                                }
                            />
                        );
                    } else {
                        // Protected route (requires authentication)
                        return (
                            <Route
                                key={path}
                                path={path}
                                element={
                                    isAuthenticated ? element : <Navigate to="/signin" />
                                }
                            />
                        );
                    }
                })}
                {/* Default route to handle 404 or redirect */}
                <Route path="*" element={<Navigate to="/signin" />} />
            </Routes>
        </Suspense>
    );
};

export default AppRouter;
