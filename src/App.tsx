import Sidebar from "@components/layout/Sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
