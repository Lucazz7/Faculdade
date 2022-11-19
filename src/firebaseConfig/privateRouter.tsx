import { Navigate, Outlet } from "react-router-dom";



const ProtectedRoutes = () => {
    const userLocal = JSON.parse(localStorage.getItem('user'));

    // const isAuth = useAuth();
    return userLocal ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;