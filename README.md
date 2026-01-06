# Queue Management System

This application is a simple queue and ticket management system designed to handle users and administrators in a structured and intuitive way. It allows users to take a ticket in a queue and track their status, while administrators manage queues and control the flow of service.

---

## Overview

The system is based on two distinct roles:

- **User**
- **Administrator**

Each role has its own permissions and interface, while sharing a common navigation structure and consistent visual styling.

The frontend communicates with a REST API backend running locally on `http://localhost:3001`.

---

## User Features

### Registration and Login
Users can register and log into the system. Once authenticated, the user session is stored using a global authentication context.

### Home Page (Queues)
On the Home page, users can view all available queues. For each queue, a logged-in user can take a ticket, receiving a sequential number and entering a waiting state.

If the user is not logged in, the interface clearly indicates that login is required to take a ticket.

### My Ticket
On the **MyTicket** page, the user can see:
- their ticket number
- the current ticket status (`waiting`, `called`)

The application periodically checks the ticket status. When an administrator calls the ticket, the user receives a notification informing them that they have been called.

If the user does not have an active ticket, a clear informational message is displayed.

---

## Administrator Features

### Admin Panel
The administrator has access to a dedicated admin panel that allows:

- creating new queues
- viewing existing queues
- deleting queues
- calling the next user in a queue

### Ticket Management
When calling the next user:
- the system selects the ticket with the lowest number that is still in `waiting` status
- the ticket status is updated to `called`

This ensures a fair and predictable queue flow.

---

## Notifications and Data Refresh

- User ticket data is periodically refreshed
- Users are notified when their ticket is called
- The interface avoids duplicate alerts and incorrect messages during data loading

---

## Navigation and Authentication State

The navigation bar adapts dynamically based on authentication state:

- unauthenticated users see login and register options
- authenticated users see their name displayed on the top right side
- user roles are not explicitly shown to avoid unnecessary clutter

Logout functionality is available at all times when logged in.

---

## Styling and UI

All styling is organized inside a centralized `styles` folder.

- Login and Register pages share a clean and consistent design
- Home, MyTicket, and AdminPanel pages use card-based layouts
- Action buttons are visually separated and appropriately sized
- Spacing, typography, and layout are designed for clarity and a professional appearance

---

## Technologies Used

- React
- React Hooks (`useState`, `useEffect`, `useContext`)
- Context API for authentication
- Fetch API for backend communication
- CSS

---

## Running the Application

1. Start the backend server on `http://localhost:3001`
2. Start the frontend application
3. Open the application in a web browser