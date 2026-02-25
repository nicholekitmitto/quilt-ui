import { Outlet } from "react-router-dom";
import ComponentNav from "../components/ComponentNav";

export default function ComponentsPage() {
  return (
    <div style={{ display: "flex" }}>
      <ComponentNav />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
}
