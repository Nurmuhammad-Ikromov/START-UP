// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem("key"); 

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
