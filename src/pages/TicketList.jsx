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
    const interval = setInterval(loadTickets, 10000);
    return () => clearInterval(interval);
  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "OPEN").length;
  const inProgress = tickets.filter((t) => t.status === "IN_PROGRESS").length;
  const closed = tickets.filter((t) => ["RESOLVED", "CLOSED"].includes(t.status)).length;

  const priorityClass = (priority) => {
    if (priority === "CRITICAL") return "ticket-card critical";
    if (priority === "HIGH") return "ticket-card high";
    return "ticket-card";
  };

  return (
    <div className="page">
      <div className="header">
        <div>
          <h1>Ticket Dashboard</h1>
          <p className="login-subtitle">IT ve Atölye taleplerinin canlı takip ekranı</p>
        </div>

        <a className="btn btn-primary" href="/create-ticket">
          Yeni Talep Oluştur
        </a>
      </div>

      <div className="dashboard-grid">
        <div className="stat-card">
          <div className="stat-number">{total}</div>
          <div className="stat-label">Toplam Talep</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{open}</div>
          <div className="stat-label">Açık</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{inProgress}</div>
          <div className="stat-label">İşlemde</div>
        </div>

        <div className="stat-card">
          <div className="stat-number">{closed}</div>
          <div className="stat-label">Çözülen/Kapanan</div>
        </div>
      </div>

      <div className="ticket-grid">
        {tickets.map((ticket) => (
          <div key={ticket.id} className={priorityClass(ticket.priority)}>
            <div className="ticket-top">
              <div>
                <div className="ticket-no">{ticket.ticket_no}</div>
                <h3 className="ticket-title">{ticket.title}</h3>

                <div className="badge-row">
                  <span className="badge">{ticket.request_type}</span>
                  <span
                    className={
                      ticket.priority === "CRITICAL"
                        ? "badge badge-critical"
                        : ticket.priority === "HIGH"
                        ? "badge badge-high"
                        : "badge"
                    }
                  >
                    {ticket.priority}
                  </span>
                  <span
                    className={
                      ticket.status === "OPEN"
                        ? "badge badge-open"
                        : ["RESOLVED", "CLOSED"].includes(ticket.status)
                        ? "badge badge-success"
                        : "badge"
                    }
                  >
                    {ticket.status}
                  </span>
                  <span className="badge">
                    {ticket.assigned_to_name || "Havuzda"}
                  </span>
                </div>
              </div>

              <a className="btn btn-secondary" href={`/tickets/${ticket.id}`}>
                Detay
              </a>
            </div>
          </div>
        ))}

        {tickets.length === 0 && (
          <div className="card">
            Henüz ticket bulunmuyor. Yeni talep oluşturarak başlayabilirsin.
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketList;