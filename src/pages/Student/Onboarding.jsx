import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  BriefcaseBusiness,
  Code2,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  BarChart3,
  Target,
  CheckCircle2,
} from "lucide-react";

function Onboarding() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    college: "",
    course: "",
    semester: "",
    guidance: [],
    interests: [],
    goal: "",
    mentoringArea: "",
  });

  const toggleSelection = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value],
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log("Student onboarding data:", formData);

      // Backend connect hone ke baad:
      // API call yahan hogi
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="onboarding-page">

      {/* HEADER */}
      <header className="onboarding-header">

        <div className="onboarding-brand">
          <div className="onboarding-logo">
            <GraduationCap size={21} />
          </div>

          <div>
            <h2>HandHold</h2>
            <span>Guidance that moves you forward</span>
          </div>
        </div>

        <span className="onboarding-step">
          Step {step} of 3
        </span>

      </header>

      {/* PROGRESS */}
      <div className="onboarding-progress">
        <div
          className="onboarding-progress-fill"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      {/* CONTENT */}
      <main className="onboarding-container">

        <div className="onboarding-intro">

          <span className="onboarding-label">
            LET'S GET STARTED
          </span>

          <h1>
            Help us understand
            <br />
            <span>where you're headed.</span>
          </h1>

          <p>
            A few details will help us understand your goals and
            create a better mentoring experience for you.
          </p>

        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <section className="onboarding-card">

            <div className="onboarding-card-header">
              <div className="onboarding-card-icon">
                <GraduationCap size={20} />
              </div>

              <div>
                <h3>About you</h3>
                <p>Tell us a little about your academic background.</p>
              </div>
            </div>

            <div className="onboarding-form-grid">

              <div className="onboarding-field full">
                <label>Full name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="onboarding-field full">
                <label>College / University</label>

                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  placeholder="Enter your college or university"
                />
              </div>

              <div className="onboarding-field">
                <label>Course / Branch</label>

                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech CSE"
                />
              </div>

              <div className="onboarding-field">
                <label>Year / Semester</label>

                <select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option value="">Select your semester</option>
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">3rd Semester</option>
                  <option value="4">4th Semester</option>
                  <option value="5">5th Semester</option>
                  <option value="6">6th Semester</option>
                  <option value="7">7th Semester</option>
                  <option value="8">8th Semester</option>
                </select>
              </div>

            </div>

          </section>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <section className="onboarding-card">

            <div className="onboarding-card-header">
              <div className="onboarding-card-icon">
                <Target size={20} />
              </div>

              <div>
                <h3>Your interests</h3>
                <p>
                  Select the areas where you would like guidance.
                </p>
              </div>
            </div>

            <div className="selection-section">

              <label>What do you need guidance in?</label>

              <div className="selection-grid">

                {[
                  ["Academic", GraduationCap],
                  ["Career", BriefcaseBusiness],
                  ["Technical Skills", Code2],
                  ["Projects", Target],
                  ["Placement", BriefcaseBusiness],
                  ["Higher Studies", GraduationCap],
                ].map(([item, Icon]) => (
                  <button
                    type="button"
                    key={item}
                    className={`selection-option ${
                      formData.guidance.includes(item)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      toggleSelection("guidance", item)
                    }
                  >
                    <Icon size={19} />
                    <span>{item}</span>

                    {formData.guidance.includes(item) && (
                      <CheckCircle2 size={17} />
                    )}
                  </button>
                ))}

              </div>

            </div>

            <div className="selection-section">

              <label>What are you interested in?</label>

              <div className="selection-grid">

                {[
                  ["Software Development", Code2],
                  ["AI / ML", BrainCircuit],
                  ["Data", BarChart3],
                  ["Cloud / DevOps", Cloud],
                  ["Cybersecurity", ShieldCheck],
                  ["Other", Target],
                ].map(([item, Icon]) => (
                  <button
                    type="button"
                    key={item}
                    className={`selection-option ${
                      formData.interests.includes(item)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      toggleSelection("interests", item)
                    }
                  >
                    <Icon size={19} />
                    <span>{item}</span>

                    {formData.interests.includes(item) && (
                      <CheckCircle2 size={17} />
                    )}
                  </button>
                ))}

              </div>

            </div>

          </section>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <section className="onboarding-card">

            <div className="onboarding-card-header">
              <div className="onboarding-card-icon">
                <Target size={20} />
              </div>

              <div>
                <h3>Your goals</h3>
                <p>
                  Tell us what you want to achieve with mentoring.
                </p>
              </div>
            </div>

            <div className="onboarding-field full">

              <label>What's your short-term goal?</label>

              <textarea
                name="goal"
                value={formData.goal}
                onChange={handleChange}
                placeholder="For example: I want to prepare for placements, improve my technical skills, or build my first project..."
                rows="5"
              />

            </div>

            <div className="selection-section">

              <label>What kind of mentoring would help you most?</label>

              <div className="mentor-preference-grid">

                {[
                  "Career guidance",
                  "Technical guidance",
                  "Project guidance",
                  "Placement preparation",
                ].map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={`preference-option ${
                      formData.mentoringArea === item
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        mentoringArea: item,
                      })
                    }
                  >
                    <span>{item}</span>

                    {formData.mentoringArea === item && (
                      <CheckCircle2 size={17} />
                    )}
                  </button>
                ))}

              </div>

            </div>

          </section>
        )}

        {/* ACTIONS */}
        <div className="onboarding-actions">

          <button
            type="button"
            className="onboarding-back"
            onClick={previousStep}
            disabled={step === 1}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            type="button"
            className="onboarding-next"
            onClick={nextStep}
          >
            {step === 3 ? "Complete Profile" : "Continue"}

            <ArrowRight size={18} />
          </button>

        </div>

      </main>

    </div>
  );
}

export default Onboarding;