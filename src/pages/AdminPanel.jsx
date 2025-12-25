import { useEffect, useState } from "react";

const AdminPanel = () => {
  const [queues, setQueues] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [newQueue, setNewQueue] = useState("");

  useEffect(() => {
    fetchQueues();
    fetchTickets();
  }, []);

  const fetchQueues = async () => {
    const res = await fetch("http://localhost:3001/queues");
    const data = await res.json();
    setQueues(data);
  };

  const fetchTickets = async () => {
    const res = await fetch("http://localhost:3001/tickets");
    const data = await res.json();
    setTickets(data);
  };

  const addQueue = async () => {
    if (!newQueue) return;

    await fetch("http://localhost:3001/queues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newQueue }),
    });

    setNewQueue("");
    fetchQueues();
  };

  const deleteQueue = async (id) => {
    await fetch(`http://localhost:3001/queues/${id}`, {
      method: "DELETE",
    });

    fetchQueues();
  };

  const callNext = async (queueId) => {
    const waiting = tickets
      .filter((t) => t.queueId === queueId && t.status === "waiting")
      .sort((a, b) => a.number - b.number);

    if (waiting.length === 0) {
      alert("Nema korisnika u redu.");
      return;
    }

    const next = waiting[0];

    await fetch(`http://localhost:3001/tickets/${next.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "called" }),
    });

    fetchTickets();
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <h3>Novi red</h3>
      <input
        value={newQueue}
        onChange={(e) => setNewQueue(e.target.value)}
      />
      <button onClick={addQueue}>Dodaj red</button>

      <h3>Postojeći redovi</h3>
      <ul>
        {queues.map((q) => (
          <li key={q.id}>
            <strong>{q.name}</strong>
            <button onClick={() => callNext(q.id)}>Pozovi sledećeg</button>
            <button onClick={() => deleteQueue(q.id)}>Obriši</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;

