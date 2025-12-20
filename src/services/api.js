const BASE_URL = "http://localhost:3001";

export const api = {
  getUsers: () =>
    fetch(`${BASE_URL}/users`).then(res => res.json()),

  createUser: (user) =>
    fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    }).then(res => res.json()),

  getQueues: () =>
    fetch(`${BASE_URL}/queues`).then(res => res.json()),

  createTicket: (ticket) =>
    fetch(`${BASE_URL}/tickets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket)
    }).then(res => res.json()),

  updateTicket: (id, data) =>
    fetch(`${BASE_URL}/tickets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(res => res.json())
};
