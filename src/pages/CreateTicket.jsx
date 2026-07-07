import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function CreateTicket() {
  const [form, setForm] = useState({
    request_type: "IT",
    category: "",
    title: "",
    description: "",
    priority: "MEDIUM",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createTicket = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/tickets/", form);
      setMessage("Talep başarıyla oluşturuldu. Listeye yönlendiriliyorsun...");

      setTimeout(() => {
        window.location.href = "/tickets";
      }, 900);
    } catch {
      setMessage("Talep oluşturulamadı. Lütfen alanları kontrol et.");
    }
  };

  return (
  <>
  <Navbar />
    <div className="page">
      <div className="form-wrapper">
        <div className="header">
          <div>
            <h1>Yeni Talep Oluştur</h1>
            <p className="login-subtitle">
              IT veya Atölye ekibine iletilecek talep bilgilerini gir.
            </p>
          </div>

          <a className="btn btn-secondary" href="/tickets">
            Listeye Dön
          </a>
        </div>

        <div className="card">
          <form onSubmit={createTicket}>
            <label>Talep Türü</label>
            <select
              className="select"
              name="request_type"
              value={form.request_type}
              onChange={handleChange}
            >
              <option value="IT">IT</option>
              <option value="ATOLYE">Atölye</option>
            </select>

            <label>Kategori</label>
            <input
              className="input"
              name="category"
              placeholder="Örn: Yazıcı, internet, makine arızası"
              value={form.category}
              onChange={handleChange}
            />

            <label>Başlık</label>
            <input
              className="input"
              name="title"
              placeholder="Talebi kısa ve net yaz"
              value={form.title}
              onChange={handleChange}
            />

            <label>Açıklama</label>
            <textarea
              className="textarea"
              name="description"
              placeholder="Sorunu detaylı şekilde açıkla"
              value={form.description}
              onChange={handleChange}
            />

            <label>Öncelik</label>
            <select
              className="select"
              name="priority"
              value={form.priority}
              onChange={handleChange}
            >
              <option value="LOW">Düşük</option>
              <option value="MEDIUM">Orta</option>
              <option value="HIGH">Yüksek</option>
              <option value="CRITICAL">Kritik</option>
            </select>

            <button className="btn btn-primary" type="submit">
              Talep Oluştur
            </button>

            {message && <p className="message">{message}</p>}
          </form>
        </div>
      </div>
</div>
</>
);
}

export default CreateTicket;