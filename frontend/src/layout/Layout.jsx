import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1">
        <TopBar />
        <div className="container-fluid mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
