import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/home.css";

const Home = () => {
  const [queues, setQueues] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch("http://localhost:3001/queues")
      .then((res) => res.json())
      .then((data) => setQueues(data));
  }, []);

  const takeTicket = async (queueId) => {
    if (!user) return;

    const res = await fetch(
      `http://localhost:3001/tickets?queueId=${queueId}`
    );
    const tickets = await res.json();

    const nextNumber = tickets.length + 1;

    const newTicket = {
      queueId,
      userId: user.id,
      number: nextNumber,
      status: "waiting",
    };

    await fetch("http://localhost:3001/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTicket),
    });

    alert(`Vaš broj u redu je ${nextNumber}`);
  };

  return (
    <div className="container">
      <h2>Dostupni redovi</h2>

      {!user && <p>Uloguj se da bi uzeo broj.</p>}

      <div className="queue-list">
        {queues.map((queue) => (
          <div className="queue-card" key={queue.id}>
            <strong>{queue.name}</strong>

            {user && user.role === "user" && (
              <button onClick={() => takeTicket(queue.id)}>
                Uzmi broj
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
