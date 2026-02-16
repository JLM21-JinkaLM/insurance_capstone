import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function AppShell({ children }) {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <TopBar />
        <div className="p-4 bg-light min-vh-100">
          {children}
        </div>
      </div>
    </div>
  );
}
