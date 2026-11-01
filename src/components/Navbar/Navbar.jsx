import { HeartHandshake } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <div className="logo-icon">
          <HeartHandshake size={22} />
        </div>

        <div>
          <h2>HandHold</h2>
          <span>Guidance that moves you forward</span>
        </div>
      </div>

      <div className="navbar-actions">
        <button className="nav-login">
          Log In
        </button>

        <button className="primary-button">
          Get Started
        </button>
      </div>

    </nav>
  );
}

export default Navbar;