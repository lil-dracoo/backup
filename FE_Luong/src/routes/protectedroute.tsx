import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const ProtectedRoute = (props: any) => {
    const auth = useAuth();
    
    if (!auth) {
        return <div>Loading...</div>;
    }
    
    if (!auth.user) {
        return <Navigate to="/login" />;
    }
    
    return props.children;
}

export default ProtectedRoute;