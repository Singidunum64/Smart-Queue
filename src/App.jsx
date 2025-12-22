import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import MyTicket from "./pages/MyTicket";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div>
      {/* privremena navigacija */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/my-ticket">My Ticket</Link> |{" "}
        <Link to="/admin">Admin</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* user ruta */}
        <Route
          path="/my-ticket"
          element={
            <ProtectedRoute role="user">
              <MyTicket />
            </ProtectedRoute>
          }
        />

        {/* admin ruta */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
