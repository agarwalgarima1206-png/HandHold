import {
  UserRoundSearch,
  Target,
  TrendingUp,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import heroIllustration from "../../assets/hero-illustration.png";

function Landing() {
  return (
    <div className="landing-page">

      {/* ================= NAVBAR ================= */}
      <Navbar />


      {/* ================= HERO ================= */}
      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            Mentoring platform for students
          </div>

          <h1>
            Your Growth.
            <br />
            Your Mentor.
            <br />
            <span>Your Journey.</span>
          </h1>

          <p>
            HandHold helps students connect with mentors, set meaningful
            goals, stay connected and build consistent progress throughout
            their academic and career journey.
          </p>

          <div className="hero-buttons">

            <button className="primary-button">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="secondary-button">
              Log In
            </button>

          </div>

          <div className="hero-note">
            <CheckCircle2 size={18} />

            <span>
              A structured space for students and mentors to grow together.
            </span>
          </div>

        </div>


        {/* ================= HERO ILLUSTRATION ================= */}
        <div className="hero-visual">

          <div className="hero-image-wrapper">

            <img
              src={heroIllustration}
              alt="Student and mentor discussing progress"
              className="hero-illustration"
            />

          </div>


          {/* Small conceptual card */}
          <div className="meeting-preview">

            <div className="meeting-icon">
              <CalendarDays size={19} />
            </div>

            <div>
              <span>Mentoring journey</span>

              <strong>
                Connect • Guide • Grow
              </strong>
            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}
      <section className="features-section">

        <div className="section-heading">

          <span className="section-label">
            CORE FEATURES
          </span>

          <h2>
            Everything you need for
            <br />
            better mentoring.
          </h2>

          <p>
            HandHold brings mentor discovery, goal setting, communication
            and progress tracking together in one platform.
          </p>

        </div>


        <div className="features-grid">

          <FeatureCard
            icon={<UserRoundSearch />}
            title="Find a Mentor"
            description="Explore mentors based on your interests, goals and area of development."
          />

          <FeatureCard
            icon={<Target />}
            title="Set Goals"
            description="Create clear academic and career goals and work on them with your mentor."
          />

          <FeatureCard
            icon={<TrendingUp />}
            title="Track Progress"
            description="Keep track of your goals, completed tasks and important milestones."
          />

          <FeatureCard
            icon={<MessageCircle />}
            title="Stay Connected"
            description="Communicate with your mentor, schedule meetings and receive guidance."
          />

        </div>

      </section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="how-section">

        <div className="section-heading center">

          <span className="section-label">
            HOW IT WORKS
          </span>

          <h2>
            Simple steps. Meaningful guidance.
          </h2>

          <p>
            From creating your profile to working towards your goals,
            HandHold keeps your mentoring journey organised.
          </p>

        </div>


        <div className="steps">

          <Step
            number="01"
            title="Create your profile"
            description="Add your academic background, interests, skills and goals."
          />

          <Step
            number="02"
            title="Connect with a mentor"
            description="Find or get assigned a mentor who can guide your journey."
          />

          <Step
            number="03"
            title="Set your goals"
            description="Define what you want to achieve and break it into manageable steps."
          />

          <Step
            number="04"
            title="Track and grow"
            description="Meet, communicate, review your progress and keep improving."
          />

        </div>

      </section>


      {/* ================= PLATFORM FLOW ================= */}
      <section className="platform-flow-section">

        <div className="section-heading center">

          <span className="section-label">
            ONE PLATFORM
          </span>

          <h2>
            From first connection to continuous growth.
          </h2>

          <p>
            Keep your mentoring activities organised in one place.
          </p>

        </div>


        <div className="platform-flow">

          <div className="flow-item">

            <UserRoundSearch size={21} />

            <span>
              Mentor
            </span>

            <strong>
              Connect
            </strong>

          </div>


          <ArrowRight
            className="flow-arrow"
            size={20}
          />


          <div className="flow-item">

            <Target size={21} />

            <span>
              Goals
            </span>

            <strong>
              Plan
            </strong>

          </div>


          <ArrowRight
            className="flow-arrow"
            size={20}
          />


          <div className="flow-item">

            <CalendarDays size={21} />

            <span>
              Meetings
            </span>

            <strong>
              Discuss
            </strong>

          </div>


          <ArrowRight
            className="flow-arrow"
            size={20}
          />


          <div className="flow-item">

            <TrendingUp size={21} />

            <span>
              Progress
            </span>

            <strong>
              Improve
            </strong>

          </div>

        </div>

      </section>


      {/* ================= CTA ================= */}
      <section className="final-cta">

        <div>

          <span className="section-label">
            START YOUR JOURNEY
          </span>

          <h2>
            Good guidance can
            <br />
            change your direction.
          </h2>

          <p>
            Build a meaningful connection with your mentor and turn
            your goals into consistent progress.
          </p>

        </div>


        <button className="primary-button">

          Get Started

          <ArrowRight size={18} />

        </button>

      </section>


      {/* ================= FOOTER ================= */}
      <footer>

        <div className="footer-brand">

          <strong>
            ♡ HandHold
          </strong>

          <span>
            Guidance that moves you forward
          </span>

        </div>


        <div className="footer-links">

          <span>Mentoring</span>
          <span>Goals</span>
          <span>Meetings</span>
          <span>Progress</span>

        </div>


        <span>
          © 2026 HandHold
        </span>

      </footer>

    </div>
  );
}


/* ================= FEATURE CARD ================= */

function FeatureCard({
  icon,
  title,
  description,
}) {
  return (
    <div className="feature-card">

      <div className="feature-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <div className="card-arrow">
        <ArrowRight size={17} />
      </div>

    </div>
  );
}


/* ================= STEP ================= */

function Step({
  number,
  title,
  description,
}) {
  return (
    <div className="step">

      <div className="step-number">
        {number}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

    </div>
  );
}


export default Landing;