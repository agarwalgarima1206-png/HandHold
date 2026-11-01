import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HeartHandshake, LayoutDashboard, UserRound, Target, CalendarDays, MessageCircle, Star, Settings, Bell, GraduationCap, BookOpen, ShieldCheck, Pencil, CheckCircle2, ChevronRight, LockKeyhole, Mail, Smartphone, LogOut, Save, X } from "lucide-react";

const STORAGE_KEY = "handhold_student_profile";
const initialProfile = {
  fullName: "Student",
  email: "",
  phone: "",
  college: "",
  course: "B.Tech",
  semester: "",
  bio: "",
  careerGoal: "",
  interests: [],
  guidance: [],
  availability: [],
};
const interestOptions = ["Software Development", "Cloud & DevOps", "Artificial Intelligence", "Data Science", "Cybersecurity", "Web Development", "Communication", "Placement Preparation"];
const guidanceOptions = ["Career Planning", "Technical Skills", "Internship Guidance", "Resume & LinkedIn", "Interview Preparation", "Higher Studies"];
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function readProfile(locationState) {
  if (locationState?.studentProfile) return { ...initialProfile, ...locationState.studentProfile };
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? { ...initialProfile, ...JSON.parse(saved) } : initialProfile;
  } catch {
    return initialProfile;
  }
}

export default function ProfileSettings() {
  const location = useLocation();
  const [profile, setProfile] = useState(() => readProfile(location.state));
  const [draft, setDraft] = useState(profile);
  const [activeTab, setActiveTab] = useState("personal");
  const [editing, setEditing] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const initials = useMemo(() => (profile.fullName || "S").trim().split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase(), [profile.fullName]);

  useEffect(() => {
    if (location.state?.studentProfile) {
      const next = { ...initialProfile, ...location.state.studentProfile };
      setProfile(next); setDraft(next);
    }
  }, [location.state]);

  const update = (field, value) => setDraft((prev) => ({ ...prev, [field]: value }));
  const toggleArray = (field, value) => update(field, (draft[field] || []).includes(value) ? draft[field].filter((item) => item !== value) : [...(draft[field] || []), value]);
  const startEdit = () => { setDraft(profile); setEditing(true); setSavedMessage(""); };
  const cancelEdit = () => { setDraft(profile); setEditing(false); };
  const saveProfile = (event) => {
    event.preventDefault();
    const next = { ...draft, fullName: draft.fullName.trim() || "Student" };
    setProfile(next); setDraft(next); setEditing(false); setSavedMessage("Your profile has been saved on this device.");
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* storage may be unavailable */ }
    window.setTimeout(() => setSavedMessage(""), 3500);
  };

  const navItems = [
    ["Dashboard", "/student/dashboard", LayoutDashboard], ["My Mentor", "/student/mentor", UserRound],
    ["Goals & Progress", "/student/goals", Target], ["Meetings", "/student/meetings", CalendarDays],
    ["Messages", "/student/messages", MessageCircle], ["Feedback", "/student/feedback", Star],
  ];

  return (
    <div className="student-dashboard profile-settings-page">
      <aside className="student-sidebar">
        <div className="student-sidebar-brand"><div className="student-sidebar-logo"><HeartHandshake size={21}/></div><div><h2>HandHold</h2><span>Student Space</span></div></div>
        <div className="profile-sidebar-user"><div className="profile-sidebar-avatar">{initials}</div><div><strong>{profile.fullName || "Student"}</strong><span>Student</span></div></div>
        <p className="profile-sidebar-label">MENU</p>
        <nav className="student-nav">{navItems.map(([label, href, Icon]) => <Link key={href} to={href} className="student-nav-item"><Icon size={19}/><span>{label}</span></Link>)}</nav>
        <p className="profile-sidebar-label profile-account-label">ACCOUNT</p>
        <Link to="/student/profile" className="student-nav-item active"><Settings size={19}/><span>Profile & Settings</span></Link>
        <div className="profile-sidebar-help"><ShieldCheck size={22}/><h4>Your profile matters</h4><p>Keep your information updated to get relevant mentoring guidance.</p><button onClick={startEdit}>Edit Profile</button></div>
        <div className="profile-sidebar-footer">HandHold <span>Student Community</span></div>
      </aside>

      <main className="student-main profile-main">
        <header className="profile-topbar"><div><h2>Profile & Settings</h2><p>Manage your personal information and preferences.</p></div><div className="profile-topbar-actions"><button className="profile-notification" aria-label="Notifications"><Bell size={19}/></button><div className="profile-topbar-avatar">{initials}</div></div></header>
        <div className="profile-page-content">
          <div className="profile-breadcrumb"><Link to="/student/dashboard">Dashboard</Link><ChevronRight size={15}/><span>Profile & Settings</span></div>
          <div className="profile-heading-row"><div><h1>My Profile</h1><p>Your personal space to manage your learning journey and career preferences.</p></div><button className="profile-primary-outline" onClick={editing ? cancelEdit : startEdit}>{editing ? <X size={17}/> : <Pencil size={17}/>} {editing ? "Cancel editing" : "Edit Profile"}</button></div>
          {savedMessage && <div className="profile-success"><CheckCircle2 size={18}/>{savedMessage}</div>}

          <section className="profile-hero">
            <div className="profile-hero-cover"/>
            <div className="profile-hero-body"><div className="profile-big-avatar">{initials}<span><Smartphone size={14}/></span></div><div className="profile-hero-details"><div className="profile-name-line"><h2>{profile.fullName || "Student"}</h2><span className="profile-role-pill"><GraduationCap size={14}/> Student</span></div><p>{profile.course || "Course not added"}{profile.semester ? ` • Semester ${profile.semester}` : ""}</p><div className="profile-college-line"><BookOpen size={16}/>{profile.college || "College not added"}</div></div><div className="profile-status-card"><span>Profile status</span><strong><CheckCircle2 size={16}/> {profile.fullName && profile.college && profile.email ? "Profile details added" : "Complete your profile"}</strong><p>Keep your profile up to date.</p></div></div>
          </section>

          <div className="profile-tabs" role="tablist"><button className={activeTab === "personal" ? "active" : ""} onClick={() => setActiveTab("personal")}><UserRound size={17}/> Personal Profile</button><button className={activeTab === "learning" ? "active" : ""} onClick={() => setActiveTab("learning")}><Target size={17}/> Learning Preferences</button><button className={activeTab === "account" ? "active" : ""} onClick={() => setActiveTab("account")}><Settings size={17}/> Account Settings</button></div>

          {activeTab !== "account" ? <form onSubmit={saveProfile}>
            {activeTab === "personal" ? <section className="profile-panel"><div className="profile-panel-heading"><div><h3>Personal Information</h3><p>Your basic details and educational background.</p></div><UserRound size={20}/></div>
              <div className="profile-form-grid">
                <label>Full Name<input value={draft.fullName || ""} disabled={!editing} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter your full name"/></label>
                <label>Email Address<input type="email" value={draft.email || ""} disabled={!editing} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com"/></label>
                <label>Phone Number<input type="tel" value={draft.phone || ""} disabled={!editing} onChange={(e) => update("phone", e.target.value)} placeholder="Add phone number"/></label>
                <label>College / University<input value={draft.college || ""} disabled={!editing} onChange={(e) => update("college", e.target.value)} placeholder="Enter your college"/></label>
                <label>Course / Degree<select value={draft.course || ""} disabled={!editing} onChange={(e) => update("course", e.target.value)}><option value="">Select course</option>{["B.Tech", "BCA", "MCA", "B.Sc", "M.Sc", "BBA", "MBA", "Other"].map((v) => <option key={v}>{v}</option>)}</select></label>
                <label>Current Semester<select value={draft.semester || ""} disabled={!editing} onChange={(e) => update("semester", e.target.value)}><option value="">Select semester</option>{Array.from({length: 8}, (_, i) => <option key={i+1} value={String(i+1)}>{i+1}{[1,2,3].includes((i+1)%10) ? ([11,12,13].includes(i+1) ? "th" : [1,2,3][(i)%3] === i+1 ? "st" : "") : "th"} Semester</option>)}</select></label>
                <label className="profile-full-field">Short Bio<textarea value={draft.bio || ""} disabled={!editing} onChange={(e) => update("bio", e.target.value)} placeholder="Tell your mentor a little about yourself, your interests and aspirations." rows={4}/></label>
              </div>
            </section> : <section className="profile-panel"><div className="profile-panel-heading"><div><h3>Learning Preferences</h3><p>Help us understand your goals and the guidance you are looking for.</p></div><Target size={20}/></div>
              <div className="profile-form-grid"><label className="profile-full-field">Career / Learning Goal<input value={draft.careerGoal || ""} disabled={!editing} onChange={(e) => update("careerGoal", e.target.value)} placeholder="e.g. Prepare for a software engineering internship"/></label>
                <div className="profile-full-field"><span className="profile-field-label">Areas of Interest</span><p className="profile-field-help">Choose topics you want to explore.</p><div className="profile-chip-grid">{interestOptions.map((item) => <button type="button" key={item} disabled={!editing} className={`profile-chip ${(draft.interests || []).includes(item) ? "selected" : ""}`} onClick={() => toggleArray("interests", item)}>{item}</button>)}</div></div>
                <div className="profile-full-field"><span className="profile-field-label">Guidance Needed</span><p className="profile-field-help">Select areas where a mentor could support you.</p><div className="profile-chip-grid">{guidanceOptions.map((item) => <button type="button" key={item} disabled={!editing} className={`profile-chip ${(draft.guidance || []).includes(item) ? "selected" : ""}`} onClick={() => toggleArray("guidance", item)}>{item}</button>)}</div></div>
                <div className="profile-full-field"><span className="profile-field-label">Availability</span><p className="profile-field-help">Select days when you are usually available for mentoring.</p><div className="profile-chip-grid">{days.map((item) => <button type="button" key={item} disabled={!editing} className={`profile-chip ${(draft.availability || []).includes(item) ? "selected" : ""}`} onClick={() => toggleArray("availability", item)}>{item}</button>)}</div></div>
              </div>
            </section>}
            {editing && <div className="profile-form-actions"><button type="button" className="profile-secondary-button" onClick={cancelEdit}>Cancel</button><button type="submit" className="profile-save-button"><Save size={17}/> Save Changes</button></div>}
          </form> : <section className="profile-panel"><div className="profile-panel-heading"><div><h3>Account Settings</h3><p>Manage account-related information and privacy.</p></div><LockKeyhole size={20}/></div>
            <div className="profile-account-row"><div className="profile-account-icon"><Mail size={20}/></div><div className="profile-account-copy"><h4>Email address</h4><p>{profile.email || "Add your email in Personal Profile."}</p></div><span className="profile-status-tag">{profile.email ? "Added" : "Not added"}</span></div>
            <div className="profile-account-row"><div className="profile-account-icon"><ShieldCheck size={20}/></div><div className="profile-account-copy"><h4>Privacy & data</h4><p>Your profile is stored locally in this demo. Backend account controls will be connected later.</p></div><span className="profile-status-tag">Demo</span></div>
            <div className="profile-account-row"><div className="profile-account-icon"><LogOut size={20}/></div><div className="profile-account-copy"><h4>Sign out</h4><p>Return to the sign-in page.</p></div><Link className="profile-link-button" to="/auth">Sign out</Link></div>
          </section>}
          <footer className="profile-page-footer"><span>© 2026 HandHold Student Community</span><span>Built for your growth and guidance.</span></footer>
        </div>
      </main>
    </div>
  );
}
