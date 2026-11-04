
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { saveStudentProfile } from "../../services/studentService";

function Onboarding() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    setError("");

    if (step === 1) {
      if (
        !formData.name.trim() ||
        !formData.college.trim() ||
        !formData.course.trim() ||
        !formData.semester
      ) {
        setError("Please complete all academic details.");
        return;
      }
    }

    if (step === 2) {
      if (
        formData.guidance.length === 0 ||
        formData.interests.length === 0
      ) {
        setError("Please select at least one guidance area and interest.");
        return;
      }
    }

    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!formData.goal.trim() || !formData.mentoringArea) {
      setError("Please enter your goal and select a mentoring preference.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await saveStudentProfile({
        college: formData.college.trim(),
        course: formData.course.trim(),
        semester: formData.semester,
        guidance: formData.guidance,
        interests: formData.interests,
        goal: formData.goal.trim(),
        mentoringArea: formData.mentoringArea,
      });

      navigate("/student/dashboard");
    } catch (err) {
      setError(err.message || "Unable to save your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const previousStep = () => {
    setError("");
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="onboarding-page">
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

        <span className="onboarding-step">Step {step} of 3</span>
      </header>

      <div className="onboarding-progress">
        <div
          className="onboarding-progress-fill"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <main className="onboarding-container">
        <div className="onboarding-intro">
          <span className="onboarding-label">LET'S GET STARTED</span>

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
                  {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={String(n)}>
                      {n}{["st", "nd", "rd"][n - 1] || "th"} Semester
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <div className="onboarding-card-icon">
                <Target size={20} />
              </div>

              <div>
                <h3>Your interests</h3>
                <p>Select the areas where you would like guidance.</p>
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
                      formData.guidance.includes(item) ? "selected" : ""
                    }`}
                    onClick={() => toggleSelection("guidance", item)}
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
                      formData.interests.includes(item) ? "selected" : ""
                    }`}
                    onClick={() => toggleSelection("interests", item)}
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

        {step === 3 && (
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <div className="onboarding-card-icon">
                <Target size={20} />
              </div>

              <div>
                <h3>Your goals</h3>
                <p>Tell us what you want to achieve with mentoring.</p>
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
                      formData.mentoringArea === item ? "selected" : ""
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        mentoringArea: item,
                      }))
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

        {error && (
          <p role="alert" style={{ color: "#d94848", marginTop: "16px" }}>
            {error}
          </p>
        )}

        <div className="onboarding-actions">
          <button
            type="button"
            className="onboarding-back"
            onClick={previousStep}
            disabled={step === 1 || loading}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            type="button"
            className="onboarding-next"
            onClick={nextStep}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : step === 3
                ? "Complete Profile"
                : "Continue"}

            {!loading && <ArrowRight size={18} />}
          </button>
        </div>
      </main>
    </div>
  );
}

export default Onboarding;
