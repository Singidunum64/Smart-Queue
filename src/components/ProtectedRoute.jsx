import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  // nije ulogovan
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ulogovan, ali nema odgovarajuću rolu
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
