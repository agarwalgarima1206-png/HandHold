import { useState } from "react";
import {
  LayoutDashboard,
  UserRound,
  Target,
  CalendarDays,
  MessageCircle,
  Star,
  Bell,
  ChevronRight,
  HeartHandshake,
  Clock3,
  ArrowUpRight,
  X,
  Send,
  CheckCircle2,
} from "lucide-react";

function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const [meetingForm, setMeetingForm] = useState({
    purpose: "",
    date: "",
    time: "",
    message: "",
  });

  const handleMeetingSubmit = (e) => {
    e.preventDefault();

    console.log("Meeting request:", meetingForm);

    // Backend integration will happen here later.
    setRequestSent(true);
  };

  const closeMeetingModal = () => {
    setShowMeetingModal(false);
    setRequestSent(false);

    setMeetingForm({
      purpose: "",
      date: "",
      time: "",
      message: "",
    });
  };

  return (
    <div className="student-dashboard">

      {/* ================= SIDEBAR ================= */}
      <aside className="student-sidebar">

        <div className="student-sidebar-brand">
          <div className="student-sidebar-logo">
            <HeartHandshake size={21} />
          </div>

          <div>
            <h2>HandHold</h2>
            <span>Student Space</span>
          </div>
        </div>

        <nav className="student-nav">

          <a
            href="/student/dashboard"
            className="student-nav-item active"
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </a>

          <a
            href="/student/mentor"
            className="student-nav-item"
          >
            <UserRound size={19} />
            <span>My Mentor</span>
          </a>

          <a
            href="/student/goals"
            className="student-nav-item"
          >
            <Target size={19} />
            <span>Goals & Progress</span>
          </a>

          <a
            href="/student/meetings"
            className="student-nav-item"
          >
            <CalendarDays size={19} />
            <span>Meetings</span>
          </a>

          <a
            href="/student/messages"
            className="student-nav-item"
          >
            <MessageCircle size={19} />
            <span>Messages</span>
          </a>

          <a
            href="/student/feedback"
            className="student-nav-item"
          >
            <Star size={19} />
            <span>Feedback</span>
          </a>

        </nav>

        <div className="student-sidebar-footer">
          <div className="sidebar-help-card">
            <span>Need guidance?</span>
            <p>
              Connect with your mentor and keep your journey moving.
            </p>
          </div>
        </div>

      </aside>


      {/* ================= MAIN ================= */}
      <main className="student-main">

        {/* TOP BAR */}
        <header className="student-topbar">

          <div>
            <span className="topbar-label">Student Space</span>
            <h1>Dashboard</h1>
          </div>

          <div className="student-topbar-actions">

            {/* Notifications */}
            <div className="notification-wrapper">

              <button
                className="notification-button"
                onClick={() =>
                  setShowNotifications(!showNotifications)
                }
                aria-label="Notifications"
              >
                <Bell size={20} />
              </button>

              <span className="notification-dot"></span>

              {showNotifications && (
                <div className="notification-dropdown">

                  <div className="notification-header">
                    <div>
                      <h3>Notifications</h3>
                      <span>Your latest updates</span>
                    </div>

                    <button
                      onClick={() => setShowNotifications(false)}
                      className="notification-close"
                    >
                      <X size={17} />
                    </button>
                  </div>

                  <div className="notification-empty">
                    <div className="notification-empty-icon">
                      <Bell size={20} />
                    </div>

                    <h4>No new notifications</h4>

                    <p>
                      Meeting updates, mentor activity and reminders
                      will appear here.
                    </p>
                  </div>

                </div>
              )}

            </div>


            {/* Profile */}
            <div className="student-profile">

              <div className="student-avatar">
                S
              </div>

              <div className="student-profile-info">
                <strong>Student</strong>
                <span>Mentee</span>
              </div>

            </div>

          </div>

        </header>


        {/* CONTENT */}
        <div className="student-content">

          {/* ================= WELCOME ================= */}
          <section className="student-welcome">

            <div>
              <span className="welcome-eyebrow">
                YOUR MENTORING JOURNEY
              </span>

              <h2>
                Welcome back! 👋
              </h2>

              <p>
                Stay connected with your mentor, work towards your
                goals, and keep moving forward.
              </p>
            </div>

            <div className="welcome-decoration">
              <HeartHandshake size={42} />
            </div>

          </section>


          {/* ================= SUMMARY CARDS ================= */}
          <section className="dashboard-summary-grid">

            {/* Mentor */}
            <div className="dashboard-summary-card">

              <div className="summary-card-top">
                <div className="summary-icon mentor-icon">
                  <UserRound size={20} />
                </div>

                <span className="summary-status pending">
                  Pending
                </span>
              </div>

              <h3>My Mentor</h3>

              <p>
                Your mentor connection will appear here.
              </p>

              <a href="/student/mentor" className="summary-link">
                View mentor
                <ArrowUpRight size={15} />
              </a>

            </div>


            {/* Goals */}
            <div className="dashboard-summary-card">

              <div className="summary-card-top">
                <div className="summary-icon goal-icon">
                  <Target size={20} />
                </div>

                <span className="summary-status neutral">
                  Getting started
                </span>
              </div>

              <h3>My Goals</h3>

              <p>
                Create goals and track your progress over time.
              </p>

              <a href="/student/goals" className="summary-link">
                View goals
                <ArrowUpRight size={15} />
              </a>

            </div>


            {/* Meetings */}
            <div className="dashboard-summary-card">

              <div className="summary-card-top">
                <div className="summary-icon meeting-icon">
                  <CalendarDays size={20} />
                </div>

                <span className="summary-status neutral">
                  No meetings
                </span>
              </div>

              <h3>Meetings</h3>

              <p>
                Your upcoming mentor meetings will appear here.
              </p>

              <button
                className="summary-link button-link"
                onClick={() => setShowMeetingModal(true)}
              >
                Request meeting
                <ArrowUpRight size={15} />
              </button>

            </div>

          </section>


          {/* ================= MAIN GRID ================= */}
          <section className="dashboard-main-grid">

            {/* Mentor Connection */}
            <div className="dashboard-panel mentor-panel">

              <div className="panel-header">

                <div>
                  <span className="panel-eyebrow">
                    CONNECTION
                  </span>

                  <h3>Mentor Connection</h3>
                </div>

                <UserRound size={20} />

              </div>


              <div className="mentor-empty-state">

                <div className="mentor-empty-icon">
                  <HeartHandshake size={28} />
                </div>

                <h4>Mentor assignment pending</h4>

                <p>
                  Once a mentor is assigned to you, you’ll be able
                  to view their profile, communicate and schedule
                  meetings from here.
                </p>

                <a
                  href="/student/mentor"
                  className="secondary-action"
                >
                  Go to My Mentor
                  <ChevronRight size={16} />
                </a>

              </div>

            </div>


            {/* Upcoming Meeting */}
            <div className="dashboard-panel">

              <div className="panel-header">

                <div>
                  <span className="panel-eyebrow">
                    SCHEDULE
                  </span>

                  <h3>Upcoming Meeting</h3>
                </div>

                <Clock3 size={20} />

              </div>


              <div className="meeting-empty-state">

                <CalendarDays size={30} />

                <h4>No upcoming meetings</h4>

                <p>
                  Request a meeting with your mentor when you
                  need guidance.
                </p>

                <button
                  className="primary-small-button"
                  onClick={() => setShowMeetingModal(true)}
                >
                  Request Meeting
                </button>

              </div>

            </div>

          </section>


          {/* ================= LOWER GRID ================= */}
          <section className="dashboard-bottom-grid">

            {/* Goals */}
            <div className="dashboard-panel progress-panel">

              <div className="panel-header">

                <div>
                  <span className="panel-eyebrow">
                    YOUR DEVELOPMENT
                  </span>

                  <h3>Goals & Progress</h3>
                </div>

                <Target size={20} />

              </div>


              <div className="progress-empty-state">

                <div className="progress-empty-icon">
                  <Target size={25} />
                </div>

                <div>
                  <h4>No goals added yet</h4>

                  <p>
                    Set your first goal and track your progress
                    with your mentor.
                  </p>
                </div>

              </div>

              <a
                href="/student/goals"
                className="panel-footer-link"
              >
                Manage goals
                <ChevronRight size={16} />
              </a>

            </div>


            {/* Messages */}
            <div className="dashboard-panel">

              <div className="panel-header">

                <div>
                  <span className="panel-eyebrow">
                    COMMUNICATION
                  </span>

                  <h3>Recent Messages</h3>
                </div>

                <MessageCircle size={20} />

              </div>


              <div className="message-empty-state">

                <div className="message-empty-icon">
                  <MessageCircle size={24} />
                </div>

                <h4>No messages yet</h4>

                <p>
                  Your conversations with mentors will appear here.
                </p>

              </div>

              <a
                href="/student/messages"
                className="panel-footer-link"
              >
                Open messages
                <ChevronRight size={16} />
              </a>

            </div>

          </section>


          {/* ================= QUICK ACTIONS ================= */}
          <section className="quick-actions-section">

            <div className="quick-actions-heading">
              <div>
                <span className="panel-eyebrow">
                  QUICK ACTIONS
                </span>

                <h3>What would you like to do?</h3>
              </div>
            </div>


            <div className="quick-actions-grid">

              <a
                href="/student/mentor"
                className="quick-action-card"
              >
                <div className="quick-action-icon">
                  <UserRound size={20} />
                </div>

                <div>
                  <strong>My Mentor</strong>
                  <span>View your mentor connection</span>
                </div>

                <ChevronRight size={17} />
              </a>


              <button
                className="quick-action-card"
                onClick={() => setShowMeetingModal(true)}
              >
                <div className="quick-action-icon">
                  <CalendarDays size={20} />
                </div>

                <div>
                  <strong>Request Meeting</strong>
                  <span>Ask for a mentoring session</span>
                </div>

                <ChevronRight size={17} />
              </button>


              <a
                href="/student/messages"
                className="quick-action-card"
              >
                <div className="quick-action-icon">
                  <MessageCircle size={20} />
                </div>

                <div>
                  <strong>Messages</strong>
                  <span>Continue a conversation</span>
                </div>

                <ChevronRight size={17} />
              </a>

            </div>

          </section>

        </div>

      </main>


      {/* ================= MEETING MODAL ================= */}
      {showMeetingModal && (
        <div
          className="meeting-modal-overlay"
          onClick={closeMeetingModal}
        >

          <div
            className="meeting-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="modal-close"
              onClick={closeMeetingModal}
            >
              <X size={20} />
            </button>


            {!requestSent ? (
              <>
                <div className="modal-icon">
                  <CalendarDays size={23} />
                </div>

                <span className="modal-eyebrow">
                  MENTORING SESSION
                </span>

                <h2>Request a Meeting</h2>

                <p>
                  Choose a preferred time and tell your mentor
                  what you would like to discuss.
                </p>


                <form
                  onSubmit={handleMeetingSubmit}
                  className="meeting-form"
                >

                  <label>
                    Purpose

                    <select
                      required
                      value={meetingForm.purpose}
                      onChange={(e) =>
                        setMeetingForm({
                          ...meetingForm,
                          purpose: e.target.value,
                        })
                      }
                    >
                      <option value="">
                        Select purpose
                      </option>

                      <option value="Academic guidance">
                        Academic guidance
                      </option>

                      <option value="Career guidance">
                        Career guidance
                      </option>

                      <option value="Technical guidance">
                        Technical guidance
                      </option>

                      <option value="Project guidance">
                        Project guidance
                      </option>

                      <option value="Placement preparation">
                        Placement preparation
                      </option>
                    </select>

                  </label>


                  <div className="meeting-form-row">

                    <label>
                      Preferred Date

                      <input
                        type="date"
                        required
                        value={meetingForm.date}
                        onChange={(e) =>
                          setMeetingForm({
                            ...meetingForm,
                            date: e.target.value,
                          })
                        }
                      />
                    </label>


                    <label>
                      Preferred Time

                      <input
                        type="time"
                        required
                        value={meetingForm.time}
                        onChange={(e) =>
                          setMeetingForm({
                            ...meetingForm,
                            time: e.target.value,
                          })
                        }
                      />
                    </label>

                  </div>


                  <label>
                    Message

                    <textarea
                      rows="4"
                      placeholder="What would you like to discuss?"
                      value={meetingForm.message}
                      onChange={(e) =>
                        setMeetingForm({
                          ...meetingForm,
                          message: e.target.value,
                        })
                      }
                    />
                  </label>


                  <button
                    type="submit"
                    className="modal-submit-button"
                  >
                    <Send size={17} />
                    Send Meeting Request
                  </button>

                </form>
              </>
            ) : (

              <div className="request-success">

                <div className="success-icon">
                  <CheckCircle2 size={32} />
                </div>

                <h2>Request Submitted</h2>

                <p>
                  Your meeting request has been recorded.
                  Once the backend is connected, your mentor
                  will receive this request and you'll be
                  notified when they respond.
                </p>

                <button
                  className="primary-small-button"
                  onClick={closeMeetingModal}
                >
                  Done
                </button>

              </div>

            )}

          </div>

        </div>
      )}

    </div>
  );
}

export default Dashboard;