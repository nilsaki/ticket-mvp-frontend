import { useEffect, useState } from "react";
import api from "../api/axios";

function TicketList() {
  const [tickets, setTickets] = useState([]);

  const loadTickets = async () => {
    const res = await api.get("/tickets/");
    setTickets(res.data);

    const hasCritical = res.data.some(
      (t) => t.status === "OPEN" && ["HIGH", "CRITICAL"].includes(t.priority)
    );

    if (hasCritical) {
      const audio = new Audio("/alert.mp3");
      audio.play().catch(() => {});
    }
  };

  useEffect(() => {
    loadTickets();

    const interval = setInterval(() => {
      loadTickets();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Ticket Listesi</h2>

      <a href="/create-ticket">Yeni Talep Oluştur</a>

      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            marginTop: "10px",
            background:
              ticket.priority === "CRITICAL"
                ? "#ffd6d6"
                : ticket.priority === "HIGH"
                ? "#fff0c2"
                : "white",
          }}
        >
          <h3>{ticket.ticket_no} - {ticket.title}</h3>
          <p>Tür: {ticket.request_type}</p>
          <p>Öncelik: {ticket.priority}</p>
          <p>Durum: {ticket.status}</p>
          <p>Atanan: {ticket.assigned_to_name || "Havuzda"}</p>

          <a href={`/tickets/${ticket.id}`}>Detay</a>
        </div>
      ))}
    </div>
  );
}

export default TicketList;