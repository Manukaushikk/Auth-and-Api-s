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

// Component map to easily reference components by name
const componentMap = {
    MyComponent1: <MyComponent1 />,
    MyComponent2: <MyComponent2 />,
};

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
        path: "/dashboard/:component", // Dynamic route
        element: <DynamicComponent />, // Component to render based on the dynamic route
        isPublic: false,
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />,
        isPublic: true,
    },
];

// Dynamic component rendering based on route parameter
const DynamicComponent = ({ component }) => {
    const ComponentToRender = componentMap[component]; // Get the component based on the URL parameter

    if (!ComponentToRender) {
        return <Unauthorized />; // Render Unauthorized if component not found
    }

    return ComponentToRender; // Render the found component
};

export default routeConfig;
