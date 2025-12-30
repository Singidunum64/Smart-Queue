import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/">Home</Link>

      {user && user.role === "admin" && (
        <>
          {" | "}
          <Link to="/admin">Admin</Link>
        </>
      )}

      {user && user.role === "user" && (
        <>
          {" | "}
          <Link to="/my-ticket">My Ticket</Link>
        </>
      )}

      <span style={{ marginLeft: "20px" }}>
        {user ? `Ulogovan: ${user.name} (${user.role})` : "Niste ulogovani"}
      </span>

      {user ? (
        <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
          Logout
        </button>
      ) : (
        <>
          {" | "}
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
