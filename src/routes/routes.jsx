// src/routes/routes.js
import { lazy } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import UserManagerLayout from "../layouts/UserManagerLayout";
import RoleManagerLayout from "../layouts/RoleManagerLayout";
import SettingsLayout from "../layouts/SettingsLayout";
import PublicRoute from "../components/PublicRoute";
import PrivateRoute from "../components/PrivateRoute";

// Lazy load main components
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const TwoWayAuth = lazy(() => import("../pages/TwoWayAuth"));
const Unauthorized = lazy(() => import("../components/Unauthorized.jsx"));
const NotFound = lazy(() => import("../pages/NotFound.jsx"));

// Lazy load the section-specific components
const DashboardOverview = lazy(() => import("../pages/DashboardOverview.jsx"));
const Reports = lazy(() => import("../pages/Reports.jsx"));
const Analytics = lazy(() => import("../pages/Analytics.jsx"));
const UserList = lazy(() => import("../pages/UserList.jsx"));
const UserDetails = lazy(() => import("../pages/UserDetails.jsx"));
const UserRoles = lazy(() => import("../pages/UserRoles.jsx"));
const RoleList = lazy(() => import("../pages/RoleList.jsx"));
const RolePermissions = lazy(() => import("../pages/RolePermissions.jsx"));
const GeneralSettings = lazy(() => import("../pages/GeneralSettings.jsx"));
const SecuritySettings = lazy(() => import("../pages/SecuritySettings.jsx"));

// Helper function for creating Public Routes
const createPublicRoute = (path, Component) => ({
    path,
    element: <PublicRoute><Component /></PublicRoute>,
    isPublic: true,
});

// Helper function for creating Private Routes
const createPrivateRoute = (path, Component, isTwoWayAuth = false) => ({
    path,
    element: <PrivateRoute><Component /></PrivateRoute>,
    isPublic: false,
    isTwoWayAuth,
});

// Helper function to create section routes with a specific layout
const createSectionRoutes = (basePath, layout, routes) => ({
    path: `${basePath}/*`,
    element: <PrivateRoute>{layout}</PrivateRoute>,
    children: routes.map(({ subPath, Component }) => ({
        path: subPath,
        element: <Component />,
    })),
    isPublic: false,
});

// Define routes configuration
const routes = [
    // Public routes
    createPublicRoute("/signin", SignIn),
    createPublicRoute("/signup", SignUp),
    createPublicRoute("/forgotpassword", ForgotPassword),
    createPublicRoute("/resetpassword", ResetPassword),
    { path: "/unauthorized", element: <Unauthorized />, isPublic: true },

    // Two-way auth private route
    createPrivateRoute("/twowayauth", TwoWayAuth, true),

    // Dashboard section routes
    createSectionRoutes("/dashboard", <DashboardLayout />, [
        { subPath: "overview", Component: DashboardOverview },
        { subPath: "reports", Component: Reports },
        { subPath: "analytics", Component: Analytics },
        { subPath: "*", Component: DashboardOverview }, // Default or fallback route
    ]),

    // User Manager section routes
    createSectionRoutes("/usermanager", <UserManagerLayout />, [
        { subPath: "list", Component: UserList },
        { subPath: "details", Component: UserDetails },
        { subPath: "roles", Component: UserRoles },
        { subPath: "*", Component: UserList }, // Default or fallback route
    ]),

    // Role Manager section routes
    createSectionRoutes("/rolemanager", <RoleManagerLayout />, [
        { subPath: "roles", Component: RoleList },
        { subPath: "permissions", Component: RolePermissions },
        { subPath: "*", Component: RoleList }, // Default or fallback route
    ]),

    // Settings section routes
    createSectionRoutes("/settings", <SettingsLayout />, [
        { subPath: "general", Component: GeneralSettings },
        { subPath: "security", Component: SecuritySettings },
        { subPath: "*", Component: GeneralSettings }, // Default or fallback route
    ]),

    // Catch-all route for 404 Not Found
    { path: "*", element: <NotFound />, isPublic: true },
];

export default routes;
