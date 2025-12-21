import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      role: "user"
    };

    await api.createUser(newUser);
    navigate("/login");
  };

  return (
    <div>
      <h2>Registracija</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Ime"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registruj se</button>
      </form>
    </div>
  );
};

export default Register;
