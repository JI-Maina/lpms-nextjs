import Layout from "@components/layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
