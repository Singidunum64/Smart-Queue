import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import MyTicket from "./pages/MyTicket";
import ProtectedRoute from "./components/ProtectedRoute";
import NotAuthorized from "./pages/NotAuthorized";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <>
      <Navbar />

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
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </>
  );
}

export default App;
