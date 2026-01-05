import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/ticket.css";

const MyTicket = () => {
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const notifiedRef = useRef(false);

  const fetchTicket = async () => {
    const res = await fetch(
      `http://localhost:3001/tickets?userId=${user.id}`
    );
    const data = await res.json();

    if (data.length > 0) {
      setTicket(data[data.length - 1]);
    } else {
      setTicket(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;

    fetchTicket();

    const interval = setInterval(async () => {
      const res = await fetch(
        `http://localhost:3001/tickets?userId=${user.id}`
      );
      const data = await res.json();

      if (data.length === 0) return;

      const latest = data[data.length - 1];
      setTicket(latest);

      if (latest.status === "called" && !notifiedRef.current) {
        alert("Pozvani ste! Molimo priđite šalteru.");
        notifiedRef.current = true;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  if (loading) {
    return (
      <div className="container">
        <p className="empty-message">Učitavanje...</p>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="container">
        <p className="empty-message">Nemate aktivan broj.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="ticket-card">
        <h2>Moj broj u redu</h2>

        <div className="ticket-info">
          <p>
            <strong>Redni broj:</strong> {ticket.number}
          </p>
          <p>
            <strong>Status:</strong> {ticket.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyTicket;
