// src/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import TwoWayAuthRoute from "./pages/TwoWayAuthRoute"; // Import TwoWayAuthRoute
import routeConfig from "./routes/routes.jsx"; // Import the route configuration

const AppRoutes = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <Routes>
            {routeConfig.map(({ path, element, isPublic, isTwoWayAuth }, index) => {
                if (isPublic) {
                    return (
                        <Route
                            key={index}
                            path={path}
                            element={<PublicRoute>{element}</PublicRoute>}
                        />
                    );
                }

                // Wrap TwoWayAuth with TwoWayAuthRoute to enforce email check
                if (isTwoWayAuth) {
                    return (
                        <Route key={index} path={path} element={<TwoWayAuthRoute>{element}</TwoWayAuthRoute>} />
                    );
                }

                // Wrap private routes with PrivateRoute
                return (
                    <Route
                        key={index}
                        path={path}
                        element={<PrivateRoute>{element}</PrivateRoute>}
                    />
                );
            })}
        </Routes>
    </Suspense>
);

export default AppRoutes;
