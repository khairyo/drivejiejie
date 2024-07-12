import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const user = localStorage.getItem("access_token");
    return user ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes;