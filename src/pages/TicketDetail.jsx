import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [solutionNote, setSolutionNote] = useState("");

  const loadTicket = async () => {
    const res = await api.get(`/tickets/${id}/`);
    setTicket(res.data);
    setStatus(res.data.status);
    setSolutionNote(res.data.solution_note || "");
  };

  const assignToMe = async () => {
    await api.post(`/tickets/${id}/assign_to_me/`);
    loadTicket();
  };

  const updateStatus = async () => {
    await api.post(`/tickets/${id}/update_status/`, {
      status,
      solution_note: solutionNote,
    });

    alert("Durum güncellendi.");
    loadTicket();
  };

  useEffect(() => {
    loadTicket();
  }, []);

  if (!ticket) return <p>Yükleniyor...</p>;

  return (
    <div>
      <h2>{ticket.ticket_no} - {ticket.title}</h2>

      <p><b>Talep eden:</b> {ticket.created_by_name}</p>
      <p><b>Tür:</b> {ticket.request_type}</p>
      <p><b>Öncelik:</b> {ticket.priority}</p>
      <p><b>Durum:</b> {ticket.status}</p>
      <p><b>Açıklama:</b> {ticket.description}</p>
      <p><b>Atanan:</b> {ticket.assigned_to_name || "Henüz atanmadı"}</p>

      <button onClick={assignToMe}>Üstüme Al</button>

      <hr />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="OPEN">Açık</option>
        <option value="IN_PROGRESS">İşlemde</option>
        <option value="WAITING">Beklemede</option>
        <option value="RESOLVED">Çözüldü</option>
        <option value="CLOSED">Kapandı</option>
      </select>

      <textarea
        placeholder="Çözüm notu"
        value={solutionNote}
        onChange={(e) => setSolutionNote(e.target.value)}
      />

      <button onClick={updateStatus}>Durumu Güncelle</button>
    </div>
  );
}

export default TicketDetail;