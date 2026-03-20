import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import AdminHeader from "../../components/admin-header";
import "./common-layout.css";

function CommonLayout() {
  return (
    <div className="common-layout-container">
      <AdminHeader variant="topbar" />
      <div className="common-layout-body">
        <div className="common-layout-sidebar">
          <Sidebar />
        </div>

        <div className="common-layout-content-container">
          <AdminHeader variant="page" />
          <div className="common-layout-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonLayout;