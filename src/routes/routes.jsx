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

// Define a function to create dynamic section routes
const createSectionRoutes = (basePath, layout, children) => ({
    path: `${basePath}/*`,
    element: <PrivateRoute>{layout}</PrivateRoute>,
    children: children.map(({ subPath, element }) => ({
        path: subPath,
        element,
    })),
    isPublic: false,
});

// Combine all routes
const routes = [
    {
        path: "/signin",
        element: <PublicRoute><SignIn /></PublicRoute>,
        isPublic: true,
    },
    {
        path: "/signup",
        element: <PublicRoute><SignUp /></PublicRoute>,
        isPublic: true,
    },
    {
        path: "/forgotpassword",
        element: <PublicRoute><ForgotPassword /></PublicRoute>,
        isPublic: true,
    },
    {
        path: "/resetpassword",
        element: <PublicRoute><ResetPassword /></PublicRoute>,
        isPublic: true,
    },
    {
        path: "/twowayauth",
        element: <PrivateRoute><TwoWayAuth /></PrivateRoute>,
        isPublic: false,
        isTwoWayAuth: true,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
        isPublic: true,
    },

    // Dashboard section routes
    createSectionRoutes("/dashboard", <DashboardLayout />, [
        { subPath: "overview", element: <DashboardOverview /> },
        { subPath: "reports", element: <Reports /> },
        { subPath: "analytics", element: <Analytics /> },
        { subPath: "*", element: <DashboardOverview /> }, // Default or fallback route
    ]),

    // User Manager section routes
    createSectionRoutes("/usermanager", <UserManagerLayout />, [
        { subPath: "list", element: <UserList /> },
        { subPath: "details", element: <UserDetails /> },
        { subPath: "roles", element: <UserRoles /> },
        { subPath: "*", element: <UserList /> }, // Default or fallback route
    ]),

    // Role Manager section routes
    createSectionRoutes("/rolemanager", <RoleManagerLayout />, [
        { subPath: "roles", element: <RoleList /> },
        { subPath: "permissions", element: <RolePermissions /> },
        { subPath: "*", element: <RoleList /> }, // Default or fallback route
    ]),

    // Settings section routes
    createSectionRoutes("/settings", <SettingsLayout />, [
        { subPath: "general", element: <GeneralSettings /> },
        { subPath: "security", element: <SecuritySettings /> },
        { subPath: "*", element: <GeneralSettings /> }, // Default or fallback route
    ]),

    // Catch-all route for 404 Not Found
    {
        path: "*",
        element: <NotFound />,
        isPublic: true,
    },
];

export default routes;
