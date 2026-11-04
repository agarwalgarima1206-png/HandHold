import { useLocation, useNavigate } from "react-router-dom";
import { LogOut, Repeat } from "lucide-react";
import { logout } from "../services/authService";

export default function AccountSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.pathname;

  // Public pages par button nahi dikhega
  const isAuthenticatedPage =
    (path.startsWith("/student/") && path !== "/student/onboarding") ||
    path.startsWith("/mentor/");

  if (!isAuthenticatedPage) return null;

  const handleSwitchAccount = () => {
    logout();
    navigate("/auth", { replace: true });
  };

  return (
    <button
      className="account-switcher"
      onClick={handleSwitchAccount}
      title="Switch Account"
    >
      <Repeat size={18} />
      <span>Switch Account</span>
      <LogOut size={16} />
    </button>
  );
}