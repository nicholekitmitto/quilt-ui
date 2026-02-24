import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ComponentsPage from "./pages/ComponentsPage";
import ComponentDetailPage from "./pages/ComponentDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/components" element={<ComponentsPage />}>
        <Route path=":key" element={<ComponentDetailPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
