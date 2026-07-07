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
      const res = await api.post("/auth/login/", {
        username,
        password,
      });

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      window.location.href = "/tickets";
    } catch (err) {
      setMessage("Giriş başarısız. Kullanıcı yok veya şifre yanlış.");
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
    } catch (err) {
      setMessage("Kayıt başarısız. Kullanıcı zaten var olabilir.");
    }
  };

  return (
    <form onSubmit={login}>
      <h2>Giriş Yap</h2>

      <input
        placeholder="Kullanıcı adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        placeholder="Şifre"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Giriş</button>
      <button type="button" onClick={register}>
        Kayıt Ol
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default Login;