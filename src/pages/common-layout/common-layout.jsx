import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import AdminHeader from "../../components/admin-header";
import "./common-layout.css";

function CommonLayout() {
  return (
    <div className="common-layout-container">
      <AdminHeader variant="topbar" />
      <div className="common-layout-body">
        <Sidebar />
        <div className="common-layout-content">
          <AdminHeader variant="page" />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default CommonLayout;