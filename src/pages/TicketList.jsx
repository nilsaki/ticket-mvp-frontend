import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  const loadTickets = async () => {
    const res = await api.get("/tickets/");
    setTickets(res.data);
  };

  useEffect(() => {
    loadTickets();
    const interval = setInterval(loadTickets, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredTickets = tickets.filter((ticket) => {
    const text = `${ticket.ticket_no} ${ticket.title} ${ticket.category} ${ticket.description}`
      .toLowerCase();

    const matchesSearch = text.includes(search.toLowerCase());
    const matchesType =
      typeFilter === "ALL" || ticket.request_type === typeFilter;
    const matchesStatus =
      statusFilter === "ALL" || ticket.status === statusFilter;
    const matchesPriority =
      priorityFilter === "ALL" || ticket.priority === priorityFilter;

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === "OPEN").length;
  const inProgress = tickets.filter((t) => t.status === "IN_PROGRESS").length;
  const closed = tickets.filter((t) =>
    ["RESOLVED", "CLOSED"].includes(t.status)
  ).length;

  const statusLabel = {
  OPEN: "Açık",
  IN_PROGRESS: "İşlemde",
  WAITING: "Beklemede",
  RESOLVED: "Çözüldü",
  CLOSED: "Kapandı",
  };

  const priorityLabel = {
    LOW: "Düşük",
    MEDIUM: "Orta",
    HIGH: "Yüksek",
    CRITICAL: "Kritik",
  };

  const typeLabel = {
    IT: "IT",
    ATOLYE: "Atölye",
  };

  const priorityClass = (priority) => {
    if (priority === "CRITICAL") return "ticket-card critical";
    if (priority === "HIGH") return "ticket-card high";
    return "ticket-card";
  };

  return (
    <>
      <Navbar />

      <div className="page">
        <div className="header">
          <div>
            <h1>Ticket Dashboard</h1>
            <p className="login-subtitle">
              IT ve Atölye taleplerinin canlı takip ekranı
            </p>
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

        <div className="filter-card">
          <input
            className="input filter-input"
            placeholder="Ticket ara: başlık, kategori, açıklama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="select filter-select"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="ALL">Tüm Türler</option>
            <option value="IT">IT</option>
            <option value="ATOLYE">Atölye</option>
          </select>

          <select
            className="select filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">Tüm Durumlar</option>
            <option value="OPEN">Açık</option>
            <option value="IN_PROGRESS">İşlemde</option>
            <option value="WAITING">Beklemede</option>
            <option value="RESOLVED">Çözüldü</option>
            <option value="CLOSED">Kapandı</option>
          </select>

          <select
            className="select filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="ALL">Tüm Öncelikler</option>
            <option value="LOW">Düşük</option>
            <option value="MEDIUM">Orta</option>
            <option value="HIGH">Yüksek</option>
            <option value="CRITICAL">Kritik</option>
          </select>
        </div>

        <div className="ticket-grid">
          {filteredTickets.map((ticket) => (
            <div key={ticket.id} className={priorityClass(ticket.priority)}>
              <div className="ticket-top">
                <div>
                  <div className="ticket-no">{ticket.ticket_no}</div>
                  <h3 className="ticket-title">{ticket.title}</h3>

                  <div className="badge-row">
                    <span className="badge">{typeLabel[ticket.request_type]}</span>

                    <span
                      className={
                        ticket.priority === "CRITICAL"
                          ? "badge badge-critical"
                          : ticket.priority === "HIGH"
                          ? "badge badge-high"
                          : "badge"
                      }
                    >
                      {priorityLabel[ticket.priority]}
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
                      {statusLabel[ticket.status]}
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

          {filteredTickets.length === 0 && (
            <div className="card">
              Bu filtrelere uygun ticket bulunamadı.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TicketList;