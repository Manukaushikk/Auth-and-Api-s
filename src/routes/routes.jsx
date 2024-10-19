// src/routes/routes.js
import { lazy } from "react";

// Lazy load components for code-splitting
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const TwoWayAuth = lazy(() => import("../pages/TwoWayAuth"));
const MyComponent1 = lazy(() => import("../pages/MyComponent1"));
const MyComponent2 = lazy(() => import("../pages/MyComponent2"));
import Unauthorized from "../components/Unauthorized"; // Adjust the path as necessary

// Define route configuration
const routeConfig = [
    {
        path: "/signin",
        element: <SignIn />,
        isPublic: true,
    },
    {
        path: "/signup",
        element: <SignUp />,
        isPublic: true,
    },
    {
        path: "/forgotpassword",
        element: <ForgotPassword />,
        isPublic: true,
    },
    {
        path: "/resetpassword",
        element: <ResetPassword />,
        isPublic: true,
    },
    {
        path: "/twowayauth",
        element: <TwoWayAuth />,
        isPublic: false,
        isTwoWayAuth: true, // Flag to identify TwoWayAuth route
    },
    {
        path: "/mycomponent1",
        element: <MyComponent1 />,
        isPublic: false,
    },
    {
        path: "/mycomponent2",
        element: <MyComponent2 />,
        isPublic: false,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
        isPublic: true,
    },
];

export default routeConfig;