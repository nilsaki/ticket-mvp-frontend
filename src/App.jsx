import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TicketList from "./pages/TicketList";
import CreateTicket from "./pages/CreateTicket";
import TicketDetail from "./pages/TicketDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="/tickets/:id" element={<TicketDetail />} />
        <Route path="*" element={<Navigate to="/tickets" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;