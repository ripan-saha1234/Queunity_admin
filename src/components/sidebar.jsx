import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/sidebar.css";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const topItems = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Dashboard",
        route: "/dashboard",
        icon: "/dashboard_icon.svg",
      },
      { id: "cms", label: "CMS", route: "/cms", icon: "/cms_icon.svg" },
      {
        id: "staffs",
        label: "Staffs",
        route: "/staffs",
        icon: "/staffs_icon.svg",
      },
      {
        id: "reports",
        label: "Reports",
        route: "/reports",
        icon: "/reports_icon.svg",
      },
    ],
    [],
  );

  const speakUpItems = useMemo(
    () => [
      { id: "schools", label: "Schools", route: "/schools", icon: "/common_icon.svg" },
      { id: "offense", label: "Offense", route: "/offense", icon: "/common_icon.svg" },
      { id: "cases", label: "Cases", route: "/cases", icon: "/common_icon.svg" },
    ],
    [],
  );

  const communityItems = useMemo(
    () => [
      { id: "charity", label: "Charity", route: "/charity", icon: "/common_icon.svg" },
      { id: "tutors", label: "Tutors", route: "/tutors", icon: "/common_icon.svg" },
    ],
    [],
  );

  const allItems = useMemo(() => [...topItems, ...speakUpItems, ...communityItems], [
    topItems,
    speakUpItems,
    communityItems,
  ]);

  const [selectedButton, setSelectedButton] = useState("");

  useEffect(() => {
    const matched = allItems.find((item) => location.pathname.startsWith(item.route));
    setSelectedButton(matched ? matched.id : "");
  }, [location.pathname, allItems]);

  const logoutUser = async () => {
    try {
      const tokenItem = localStorage.getItem("industrytuner admin token");
      if (!tokenItem) return false;

      let token;
      try {
        token = JSON.parse(tokenItem);
      } catch (parseError) {
        token = tokenItem;
      }

      if (typeof token !== "string") return false;

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      const data = await response.json();
      return data.success === true;
    } catch (error) {
      console.log("error ----> logoutUser", error);
      return false;
    }
  };

  const handleNavClick = (route) => {
    navigate(route);
  };

  return (

    <aside className="sidebar-nav">
      <div className="sidebar-menu">
        {topItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.route)}
            className={selectedButton === item.id ? "sidebar-button-active" : ""}
          >
            <img src={item.icon} alt="" />
            {item.label}
          </button>
        ))}

        <div className="sidebar-section-title">SPEAK UP</div>
        {speakUpItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.route)}
            className={selectedButton === item.id ? "sidebar-button-active" : ""}
          >
            <img src={item.icon} alt="" />
            {item.label}
          </button>
        ))}

        <div className="sidebar-section-title">COMMUNITY</div>
        {communityItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.route)}
            className={selectedButton === item.id ? "sidebar-button-active" : ""}
          >
            <img src={item.icon} alt="" />
            {item.label}
          </button>
        ))}
      </div>

      <button
        onClick={async () => {
          try {
            await logoutUser();
          } catch (error) {
            console.log("Logout API error:", error);
          } finally {
            localStorage.removeItem("industrytuner admin token");
            localStorage.removeItem("industrytuner admin user");
            navigate("/auth");
          }
        }}
        className="sidebar-button-logout"
      >
        <img
          src="/common_icon.svg"
          alt="" />
        Logout
      </button>
    </aside>

  );
}

export default Sidebar;