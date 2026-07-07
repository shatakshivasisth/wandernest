import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {

    const { user } = useAuth();

    // Wait until AuthContext initializes
    const savedUser = localStorage.getItem("user");

    if (!user && !savedUser) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;