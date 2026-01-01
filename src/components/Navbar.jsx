import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>

        {user && user.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        {user && user.role === "user" && (
          <Link to="/my-ticket">My Ticket</Link>
        )}
      </div>

      <div className="nav-right">
        <span className="nav-status">
          {user ? `Ulogovan: ${user.name}` : "Niste ulogovani"}
        </span>

        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
