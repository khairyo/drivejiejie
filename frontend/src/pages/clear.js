import { Navigate } from "react-router-dom";

export function Clear() {
    localStorage.clear();
    return <Navigate to='/login' />
}