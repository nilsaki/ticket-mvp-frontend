function Navbar() {
  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">Ticket Management</div>

      <div className="navbar-links">
        <a href="/tickets">Dashboard</a>
        <a href="/create-ticket">Yeni Talep</a>
        <button onClick={logout}>Çıkış</button>
      </div>
    </div>
  );
}

export default Navbar;
