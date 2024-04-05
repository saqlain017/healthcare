import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import axios from "axios";

function App() {
  axios.defaults.baseURL = 'https://healthcare.reebaprogrammer.online/api';
  return (
    <Routes>
      <Route
        path="/dashboard/*"
        element={<Dashboard />}
      />
      <Route 
        path="/auth/*" 
        element={<Auth />} 
      />
      <Route path="*" element={<Navigate to="/dashboard/home" />} />
    </Routes>
  );
}

export default App;
