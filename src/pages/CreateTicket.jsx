import { useState } from "react";
import api from "../api/axios";

function CreateTicket() {
  const [form, setForm] = useState({
    request_type: "IT",
    category: "",
    title: "",
    description: "",
    priority: "MEDIUM",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createTicket = async (e) => {
    e.preventDefault();

    await api.post("/tickets/", form);

    alert("Talebiniz oluşturuldu.");
    window.location.href = "/tickets";
  };

  return (
    <form onSubmit={createTicket}>
      <h2>Yeni Talep Oluştur</h2>

      <select name="request_type" value={form.request_type} onChange={handleChange}>
        <option value="IT">IT</option>
        <option value="ATOLYE">Atölye</option>
      </select>

      <input
        name="category"
        placeholder="Kategori"
        value={form.category}
        onChange={handleChange}
      />

      <input
        name="title"
        placeholder="Başlık"
        value={form.title}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Açıklama"
        value={form.description}
        onChange={handleChange}
      />

      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="LOW">Düşük</option>
        <option value="MEDIUM">Orta</option>
        <option value="HIGH">Yüksek</option>
        <option value="CRITICAL">Kritik</option>
      </select>

      <button type="submit">Talep Oluştur</button>
    </form>
  );
}

export default CreateTicket;