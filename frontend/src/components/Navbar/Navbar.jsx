import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">

      <div>

        <h2>Fleet Management Dashboard</h2>

        <p>Welcome to TransitOps AI</p>

      </div>

      <div className="nav-right">

        <button className="notify">

          🔔

        </button>

        <div className="profile">

          <img
            src="https://i.pravatar.cc/45"
            alt=""
          />

          <div>

            <h4>Admin</h4>

            <small>Fleet Manager</small>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;