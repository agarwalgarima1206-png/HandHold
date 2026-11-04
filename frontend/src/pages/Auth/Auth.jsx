
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  UserRound,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { login, signup } from "../../services/authService";

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isLogin && password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        email: email.trim().toLowerCase(),
        password,
      };

      let result;

      if (isLogin) {
        result = await login(userData);
      } else {
        result = await signup({
          ...userData,
          name: name.trim(),
          role: role.toUpperCase(),
        });
      }

      const user = result.user;

      if (user.role === "MENTOR") {
        navigate("/mentor/dashboard", { replace: true });
      } else if (isLogin) {
        navigate("/student/dashboard", { replace: true });
      } else {
        navigate("/onboarding", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-info">
        <div className="auth-brand">
          <div className="auth-logo">♡</div>
          <div>
            <h2>HandHold</h2>
            <span>Guidance that moves you forward</span>
          </div>
        </div>

        <div className="auth-info-content">
          <span className="auth-label">MENTORING PLATFORM</span>

          <h1>
            Build the right
            <br />
            <span>connection.</span>
          </h1>

          <p>
            Connect with mentors, work towards meaningful goals and
            keep your academic and career journey organised.
          </p>

          <div className="auth-benefits">
            <div className="auth-benefit">
              <div className="benefit-icon">
                <GraduationCap size={18} />
              </div>
              <div>
                <strong>Student-focused</strong>
                <span>Guidance designed around your goals.</span>
              </div>
            </div>

            <div className="auth-benefit">
              <div className="benefit-icon">
                <UserRound size={18} />
              </div>
              <div>
                <strong>Mentor connection</strong>
                <span>Stay connected with the right mentor.</span>
              </div>
            </div>

            <div className="auth-benefit">
              <div className="benefit-icon">
                <ShieldCheck size={18} />
              </div>
              <div>
                <strong>Structured journey</strong>
                <span>Goals, meetings and progress in one place.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-footer">© 2026 HandHold</div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-card">
          <div className="auth-form-header">
            <span className="auth-mobile-brand">HandHold</span>

            <h2>{isLogin ? "Welcome back" : "Create your account"}</h2>

            <p>
              {isLogin
                ? "Log in to continue your mentoring journey."
                : "Start your mentoring journey with HandHold."}
            </p>
          </div>

          <div className="role-section">
            <label>I am a</label>

            <div className="role-options">
              <button
                type="button"
                className={`role-option ${role === "student" ? "active" : ""}`}
                onClick={() => setRole("student")}
              >
                <GraduationCap size={18} />
                <div>
                  <strong>Student</strong>
                  <span>Looking for guidance</span>
                </div>
              </button>

              <button
                type="button"
                className={`role-option ${role === "mentor" ? "active" : ""}`}
                onClick={() => setRole("mentor")}
              >
                <UserRound size={18} />
                <div>
                  <strong>Mentor</strong>
                  <span>Ready to guide</span>
                </div>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="password-label">
                <label htmlFor="password">Password</label>
                {isLogin && (
                  <button type="button" className="forgot-password">
                    Forgot password?
                  </button>
                )}
              </div>

              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm password</label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {isLogin && (
              <label className="remember-option">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
            )}

            {error && (
              <p role="alert" className="auth-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : isLogin
                  ? "Log In"
                  : "Create Account"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="auth-switch">
            <span>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? "Create account" : "Log in"}
            </button>
          </div>

          <div className="auth-note">
            <CheckCircle2 size={15} />
            <span>
              Your mentoring activities stay organised in one place.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
