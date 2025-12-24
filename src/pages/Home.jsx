import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

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
    <div>
      <h1>Dostupni redovi</h1>

      {!user && <p>Uloguj se da bi uzeo broj.</p>}

      <ul>
        {queues.map((queue) => (
          <li key={queue.id}>
            <strong>{queue.name}</strong>

            {user && user.role === "user" && (
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => takeTicket(queue.id)}
              >
                Uzmi broj
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
