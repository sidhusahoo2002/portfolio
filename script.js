const { useEffect, useMemo, useState } = React;

function App() {
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll("[data-story-card]"));
    if (!cards.length) return;

    const setActive = (index) => {
      cards.forEach((card, i) => {
        if (i === index) {
          card.classList.add("is-active");
        } else {
          card.classList.remove("is-active");
        }
      });
      const progress = ((index + 1) / cards.length) * 100;
      document.documentElement.style.setProperty(
        "--story-progress",
        `${progress}%`,
      );
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index =
              Number(entry.target.getAttribute("data-story-card")) || 0;
            setActive(index);
          }
        });
      },
      { threshold: 0.55 },
    );

    cards.forEach((card) => observer.observe(card));
    setActive(0);

    return () => observer.disconnect();
  }, []);

  const roles = useMemo(
    () => ["Full Stack Development", "ML Enthusiast", "Software Development"],
    [],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending..." });

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send");
      }

      setStatus({
        type: "success",
        message: "Message sent. I will get back to you soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus({
        type: "error",
        message: err.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="page">
      <div className="grid-overlay" aria-hidden="true"></div>

      <nav className="nav">
        <div className="nav-inner">
          <div className="brand">Siddheswar Sahoo</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#work">Projects</a>
            <a href="#skills">Skills</a>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div>
          <h1>Building intelligent, human-first digital products.</h1>
          <p>
            I am a student developer focused on practical HealthTech tools and
            real-time systems. I care about clarity, performance, and a UX that
            feels precise.
          </p>
          <div className="hero-actions">
            <a
              className="btn btn-primary"
              href="mailto:sidhusahoo2002@gmail.com"
            >
              Hire Me
            </a>
            <a
              className="btn btn-ghost"
              href="Siddheswar_Sahoo_Resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Download Resume
            </a>
            <a
              href="https://github.com/sidhusahoo2002"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <img
                src="https://cdn.jsdelivr.net/gh///icons/github/github-original-wordmark.svg"
                alt="GitHub Profile"
                width="28"
                height="28"
                
              />
            </a>
          </div>
          <div className="card-grid" style={{ marginTop: "28px" }}>
            {roles.map((role) => (
              <div className="card reveal" data-reveal key={role}>
                <span className="tag">Focus</span>
                <h3>{role}</h3>
                <p>
                  Shipping projects with fast iterations and clean engineering.
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-card reveal" data-reveal>
          <img src="profile.jpg" alt="Siddheswar Sahoo" />
          <div style={{ marginTop: "16px" }}>
            <h3 style={{ margin: 0 }}>Currently open to:</h3>
            <p style={{ color: "var(--muted)" }}>
              Internship roles, freelance builds, and product prototypes.
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="split">
          <div>
            <h2>About</h2>
            <p>
              I design and build web applications with a strong backend
              foundation. My projects blend data, UX, and practical system
              thinking.
            </p>
          </div>
          <div className="list reveal" data-reveal>
            <div className="list-item">
              <span>HealthTech Primary Diagnosis</span>
              <span className="tag">Web App</span>
            </div>
            <div className="list-item">
              <span>Weather Reporting Platform</span>
              <span className="tag">Full Stack</span>
            </div>
            <div className="list-item">
              <span>Java, Node, MongoDB</span>
              <span className="tag">Core Stack</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <h2>Projects</h2>
        <p>Selected builds with measurable outcomes and live data.</p>
        <div className="story-section">
          <div className="story-layout">
            <div className="story-rail reveal" data-reveal>
              <h3>Project Timeline</h3>
              <p>Scroll to reveal context, impact, and stack choices.</p>
              <div className="story-indicator">
                <span></span>
              </div>
              <div className="story-tag">Live progress</div>
            </div>
          </div>

          {/* New Project Add */}
          <div className="story-cards">
            <div className="story-card" data-story-card="0">
              <h4>Lung Cancer Diagonosis</h4>
              <p>Lung Cancer Diagonosis from Medical Images</p>
              <a href="https://lungcareai.streamlit.app/">Live Link</a>
              <div className="story-meta">
                <span>Challenge: fast triage UX</span>
                <span>Outcome: real-time decision flow</span>
              </div>
            </div>
            <div className="story-cards">
              <div className="story-card" data-story-card="0">
                <h4>HealthTech Primary Diagnosis</h4>
                <p>
                  Symptom-based diagnostic assistant with doctor
                  recommendations.
                </p>
                <div className="story-meta">
                  <span>Challenge: fast triage UX</span>
                  <span>Outcome: real-time decision flow</span>
                </div>
              </div>
              <div className="story-card" data-story-card="1">
                <h4>Weather Reporting App</h4>
                <p>Live weather dashboards with realtime API integration.</p>
                <div className="story-meta">
                  <span>Challenge: data freshness</span>
                  <span>Outcome: accurate daily forecasts</span>
                </div>
              </div>
              <div className="story-card" data-story-card="2">
                <h4>Portfolio 2.0</h4>
                <p>
                  Modern UI and full-stack contact flow with email delivery.
                </p>
                <div className="story-meta">
                  <span>Challenge: brand clarity</span>
                  <span>Outcome: premium perception</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="skills">
        <h2>Skills</h2>
        <p>Focused stack for building fast and reliable products.</p>
        <div className="card-grid">
          <div className="card reveal" data-reveal>
            <h3>Frontend</h3>
            <p>React, JavaScript, HTML, CSS, Bootstrap</p>
          </div>
          <div className="card reveal" data-reveal>
            <h3>Backend</h3>
            <p>Node.js, Express, Spring Boot, REST APIs</p>
          </div>
          <div className="card reveal" data-reveal>
            <h3>Data</h3>
            <p>MongoDB, MySQL, Cloud deployment</p>
          </div>
        </div>
      </section>

      {/* <section className="section" id="contact">
        <div className="contact reveal" data-reveal>
          <h2>Contact</h2>
          <p>Send a short brief and I will respond within 24-48 hours.</p>
          <form className="form-grid" onSubmit={handleSubmit}>
            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
            <input
              className="input"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
            <textarea
              className="input"
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Project details"
              required
            />
            <button className="btn btn-primary" type="submit" disabled={status.type === 'loading'}>
              {status.type === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
            {status.message && (
              <div style={{ color: status.type === 'error' ? '#ff7a7a' : '#2ee59d' }}>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </section> */}

      <footer className="footer">
        <div>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/siddheswar-sahoo-54ba0a271/"
            target="_blank"
            rel="noreferrer"
          >
            Siddheswar Sahoo
          </a>
        </div>
        <div>© 2026 Siddheswar Sahoo. All rights reserved.</div>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
