import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/ticket.css";

const MyTicket = () => {
  const { user } = useAuth();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:3001/tickets?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setTicket(data[data.length - 1]);
        }
      });
  }, [user]);

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
