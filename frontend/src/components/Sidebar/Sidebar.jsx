import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "🏠" },
    { name: "Vehicles", path: "/vehicles", icon: "🚛" },
    { name: "Drivers", path: "/drivers", icon: "👨" },
    { name: "Trips", path: "/trips", icon: "🛣" },
    { name: "Maintenance", path: "/maintenance", icon: "🔧" },
    { name: "Expenses", path: "/expenses", icon: "💰" },
    { name: "Reports", path: "/reports", icon: "📊" },
    { name: "Profile", path: "/profile", icon: "👤" }
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <h2>TransitOps</h2>
      </div>

      <ul>
        {menu.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>
              <span>{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;