import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/views/Home";
import Navbar from "./components/Navbar";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Topic from "./components/views/Topic";
import { AuthContextProvider } from "./contexts/AuthContext";
import CreateDiscussion from "./components/views/CreateDiscussion";
import Discussion from "./components/views/Discussion";

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
            <Route path="/topic/:topicId" element={<Topic />} />
            <Route
              path="/topic/:topicId/create-discussion"
              element={<CreateDiscussion />}
            />
            <Route
              path="/topic/:topicId/discussion/:discussionId"
              element={<Discussion />}
            />
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  );
}
