import { Outlet, Navigate } from "react-router-dom";
import { useAppProvider } from "../context/Context";

const GuestRoutes = () => {
  const { user } = useAppProvider();
  return !user ? <Outlet /> : <Navigate to="/" />;
};

export default GuestRoutes;
