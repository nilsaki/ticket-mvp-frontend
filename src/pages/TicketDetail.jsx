import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [solutionNote, setSolutionNote] = useState("");
  const [message, setMessage] = useState("");

  const loadTicket = async () => {
    const res = await api.get(`/tickets/${id}/`);
    setTicket(res.data);
    setStatus(res.data.status);
    setSolutionNote(res.data.solution_note || "");
  };

  const assignToMe = async () => {
    setMessage("");

    try {
      await api.post(`/tickets/${id}/assign_to_me/`);
      setMessage("Ticket başarıyla üstüne alındı.");
      loadTicket();
    } catch {
      setMessage("Atama işlemi başarısız oldu.");
    }
  };

  const updateStatus = async () => {
    setMessage("");

    try {
      await api.post(`/tickets/${id}/update_status/`, {
        status,
        solution_note: solutionNote,
      });

      setMessage("Durum başarıyla güncellendi.");
      loadTicket();
    } catch {
      setMessage("Durum güncellenemedi.");
    }
  };

  useEffect(() => {
    loadTicket();
  }, []);

  if (!ticket) {
    return (
      <div className="page">
        <div className="card">Yükleniyor...</div>
      </div>
    );
  }

  return (
  <>
  <Navbar />
    <div className="page">
      <div className="header">
        <div>
          <h1>{ticket.ticket_no}</h1>
          <p className="login-subtitle">{ticket.title}</p>
        </div>

        <a className="btn btn-secondary" href="/tickets">
          Listeye Dön
        </a>
      </div>

      <div className="detail-layout">
        <div className="card">
          <h2>Talep Detayı</h2>

          <div className="field-label">Talep Eden</div>
          <div className="field-value">{ticket.created_by_name}</div>

          <div className="field-label">Tür</div>
          <div className="field-value">{ticket.request_type}</div>

          <div className="field-label">Kategori</div>
          <div className="field-value">{ticket.category || "-"}</div>

          <div className="field-label">Öncelik</div>
          <div className="field-value">{ticket.priority}</div>

          <div className="field-label">Durum</div>
          <div className="field-value">{ticket.status}</div>

          <div className="field-label">Atanan</div>
          <div className="field-value">
            {ticket.assigned_to_name || "Henüz atanmadı"}
          </div>

          <div className="field-label">Açıklama</div>
          <div className="field-value">{ticket.description}</div>
        </div>

        <div className="card">
          <h2>İşlem Paneli</h2>

          <button className="btn btn-secondary" onClick={assignToMe}>
            Üstüme Al
          </button>

          <hr />

          <label>Yeni Durum</label>
          <select
            className="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="OPEN">Açık</option>
            <option value="IN_PROGRESS">İşlemde</option>
            <option value="WAITING">Beklemede</option>
            <option value="RESOLVED">Çözüldü</option>
            <option value="CLOSED">Kapandı</option>
          </select>

          <label>Çözüm Notu</label>
          <textarea
            className="textarea"
            placeholder="Yapılan işlem veya çözüm notunu yaz"
            value={solutionNote}
            onChange={(e) => setSolutionNote(e.target.value)}
          />

          <button className="btn btn-primary" onClick={updateStatus}>
            Durumu Güncelle
          </button>

          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
    </>
    );
}

export default TicketDetail;