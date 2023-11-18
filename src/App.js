import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import AdminDashboard from "./components/DashBoard/AdminDashboard"

function App() {
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Login />} />
     <Route path="/admin/:id" element={<AdminDashboard />} />
     </Routes>
    </div>
  );
}

export default App;
