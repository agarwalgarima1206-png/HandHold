
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AccountSwitcher from "./components/AccountSwitcher";

// Common pages
import Landing from "./pages/Landing/Landing";
import Auth from "./pages/Auth/Auth";

// Student pages
import Onboarding from "./pages/Student/Onboarding";
import Dashboard from "./pages/Student/Dashboard";
import MyMentor from "./pages/Student/MyMentor";
import GoalsProgress from "./pages/Student/GoalsProgress";
import Meetings from "./pages/Student/Meetings";
import Messages from "./pages/Student/Messages";
import Feedback from "./pages/Student/Feedback";
import ProfileSettings from "./pages/Student/ProfileSettings";

// Mentor pages
import MentorDashboard from "./pages/Mentor/Dashboard";
import MyStudents from "./pages/Mentor/MyStudents";
import StudentDetails from "./pages/Mentor/StudentDetails";
import MentorMeetings from "./pages/Mentor/Meetings";

function App() {
  return (
    <BrowserRouter>
      <AccountSwitcher />

      <Routes>
        {/* Common routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />

        {/* Student onboarding */}
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/student/onboarding" element={<Onboarding />} />

        {/* Student dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student/dashboard" element={<Dashboard />} />

        {/* Student portal */}
        <Route path="/student/mentor" element={<MyMentor />} />
        <Route path="/student/goals" element={<GoalsProgress />} />
        <Route path="/student/meetings" element={<Meetings />} />
        <Route path="/student/messages" element={<Messages />} />
        <Route path="/student/feedback" element={<Feedback />} />
        <Route path="/student/profile" element={<ProfileSettings />} />

        <Route
          path="/student/settings"
          element={<Navigate to="/student/profile" replace />}
        />

        {/* Mentor portal */}
        <Route path="/mentor/dashboard" element={<MentorDashboard />} />
        <Route path="/mentor/students" element={<MyStudents />} />
        <Route path="/mentor/meetings" element={<MentorMeetings />} />
        <Route
          path="/mentor/students/:studentId"
          element={<StudentDetails />}
        />

        {/* Unknown route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
