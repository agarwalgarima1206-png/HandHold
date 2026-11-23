import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  GraduationCap,
  BriefcaseBusiness,
  MapPin,
  Code2,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  BarChart3,
  Target,
  CheckCircle2,
} from "lucide-react";

import { saveAlumniProfile } from "../../services/alumniService";

function Onboarding() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    experience: "",
    expertise: [],
    bio: "",
    linkedinUrl: "",
    location: "",
  });

  const expertiseOptions = [
    ["Software Development", Code2],
    ["AI / Machine Learning", BrainCircuit],
    ["Data Science", BarChart3],
    ["Cloud / DevOps", Cloud],
    ["Cybersecurity", ShieldCheck],
    ["Career & Placement", BriefcaseBusiness],
    ["Product Management", Target],
    ["Other", GraduationCap],
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const toggleExpertise = (value) => {
    setFormData((prev) => ({
      ...prev,
      expertise: prev.expertise.includes(value)
        ? prev.expertise.filter((item) => item !== value)
        : [...prev.expertise, value],
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.company.trim()) {
      setError("Please enter your company or organization.");
      return;
    }

    if (!formData.jobTitle.trim()) {
      setError("Please enter your current job title.");
      return;
    }

    if (formData.expertise.length === 0) {
      setError("Please select at least one area of expertise.");
      return;
    }

    if (
      formData.linkedinUrl.trim() &&
      !/^https?:\/\/.+/i.test(formData.linkedinUrl.trim())
    ) {
      setError("Please enter a valid LinkedIn URL starting with http:// or https://.");
      return;
    }

    try {
      setLoading(true);

      await saveAlumniProfile({
        company: formData.company.trim(),
        jobTitle: formData.jobTitle.trim(),
        experience: formData.experience.trim(),
        expertise: formData.expertise,
        bio: formData.bio.trim(),
        linkedinUrl: formData.linkedinUrl.trim(),
        location: formData.location.trim(),
      });

      navigate("/alumni/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.message || "Unable to save your profile. Please try again."
      );
    } finally {
      setLoading(false);
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
            <span>Share your experience, shape a future</span>
          </div>
        </div>

        <span className="onboarding-step">
          Alumni Profile
        </span>
      </header>

      {/* PROGRESS */}
      <div className="onboarding-progress">
        <div
          className="onboarding-progress-fill"
          style={{ width: "100%" }}
        />
      </div>

      {/* CONTENT */}
      <main className="onboarding-container">
        <div className="onboarding-intro">
          <span className="onboarding-label">
            WELCOME TO THE ALUMNI COMMUNITY
          </span>

          <h1>
            Your experience can
            <br />
            <span>inspire someone's journey.</span>
          </h1>

          <p>
            Tell us about your professional journey and the areas
            where you can guide students.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* PROFESSIONAL DETAILS */}
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <div className="onboarding-card-icon">
                <BriefcaseBusiness size={20} />
              </div>

              <div>
                <h3>Professional details</h3>
                <p>
                  Tell us about your current professional role.
                </p>
              </div>
            </div>

            <div className="onboarding-form-grid">
              <div className="onboarding-field">
                <label>Company / Organization *</label>

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g. Google"
                  required
                />
              </div>

              <div className="onboarding-field">
                <label>Current Job Title *</label>

                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="e.g. Software Engineer"
                  required
                />
              </div>

              <div className="onboarding-field">
                <label>Work Experience</label>

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 3 years"
                />
              </div>

              <div className="onboarding-field">
                <label>Location</label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Bengaluru, India"
                />
              </div>

              <div className="onboarding-field full">
                <label>LinkedIn Profile</label>

                <input
                  type="url"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  placeholder="https://www.linkedin.com/in/your-profile"
                />
              </div>
            </div>
          </section>

          {/* EXPERTISE */}
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <div className="onboarding-card-icon">
                <Target size={20} />
              </div>

              <div>
                <h3>Your expertise</h3>
                <p>
                  Select the areas where you can guide students.
                </p>
              </div>
            </div>

            <div className="selection-section">
              <label>Select your areas of expertise *</label>

              <div className="selection-grid">
                {expertiseOptions.map(([item, Icon]) => (
                  <button
                    type="button"
                    key={item}
                    className={`selection-option ${
                      formData.expertise.includes(item)
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => toggleExpertise(item)}
                  >
                    <Icon size={19} />

                    <span>{item}</span>

                    {formData.expertise.includes(item) && (
                      <CheckCircle2 size={17} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* BIO */}
          <section className="onboarding-card">
            <div className="onboarding-card-header">
              <div className="onboarding-card-icon">
                <GraduationCap size={20} />
              </div>

              <div>
                <h3>About your journey</h3>
                <p>
                  Introduce yourself to students who may connect with you.
                </p>
              </div>
            </div>

            <div className="onboarding-field full">
              <label>Professional Bio</label>

              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Share your experience, achievements, career journey, and how you can help students..."
                rows={5}
              />
            </div>
          </section>

          {/* ERROR */}
          {error && (
            <p
              role="alert"
              style={{
                color: "#dc2626",
                marginTop: "15px",
                fontSize: "14px",
              }}
            >
              {error}
            </p>
          )}

          {/* ACTION */}
          <div className="onboarding-actions">
            <button
              type="submit"
              className="onboarding-next"
              disabled={loading}
            >
              {loading ? "Saving..." : "Complete Alumni Profile"}

              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default Onboarding;