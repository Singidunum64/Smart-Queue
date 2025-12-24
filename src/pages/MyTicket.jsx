import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

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
    return <p>Nemate aktivan broj.</p>;
  }

  return (
    <div>
      <h2>Moj broj u redu</h2>
      <p><strong>Redni broj:</strong> {ticket.number}</p>
      <p><strong>Status:</strong> {ticket.status}</p>
    </div>
  );
};

export default MyTicket;
