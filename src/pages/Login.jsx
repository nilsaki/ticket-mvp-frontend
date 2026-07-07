import { useState } from "react";
import api from "../api/axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/auth/login/", { username, password });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      window.location.href = "/tickets";
    } catch {
      setMessage("Giriş başarısız. Kullanıcı adı veya şifre hatalı.");
    }
  };

  const register = async () => {
    setMessage("");

    try {
      await api.post("/register/", {
        username,
        password,
        role: "USER",
      });

      setMessage("Kullanıcı oluşturuldu. Şimdi giriş yapabilirsin.");
    } catch {
      setMessage("Kayıt başarısız. Kullanıcı zaten var olabilir.");
    }
  };

  return (
    <div className="login-page">
      <div className="card login-card">
        <h1 className="login-title">Ticket Management</h1>
        <p className="login-subtitle">
          IT ve Atölye taleplerinizi tek merkezden yönetin.
        </p>

        <form onSubmit={login}>
          <label>Kullanıcı Adı</label>
          <input
            className="input"
            placeholder="Örn: nilsu"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>Şifre</label>
          <input
            className="input"
            placeholder="Şifrenizi girin"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="actions">
            <button className="btn btn-primary" type="submit">
              Giriş Yap
            </button>

            <button className="btn btn-secondary" type="button" onClick={register}>
              Demo Kayıt
            </button>
          </div>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login; 