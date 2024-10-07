import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/views/Home";
import Navbar from "./components/Navbar";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import { AuthContextProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <div className="h-[100vh]">
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  );
}
