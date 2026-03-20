import React from 'react';
import './ResumeLanding.css';

const ResumeLanding = () => {
  const categories = [
    { title: "Free Resume Templates", desc: "Access 20+ professional designs.", icon: "📄", template: "standard" },
    { title: "Downloadable Templates", desc: "Edit and download in minutes.", icon: "📥", template: "modern" },
    { title: "CV Templates", desc: "Academic and research focused.", icon: "🎓", template: "cv" },
    { title: "Create Your Resume Online", desc: "Simple builder with live preview.", icon: "✍️", template: "builder" },
    { title: "Fast Free Resume", desc: "No signup required, finish in 5 mins.", icon: "⚡", template: "minimal" },
    { title: "Free Sample Resumes", desc: "Get inspiration from real examples.", icon: "💡", template: "sample" }
  ];

  const handleStart = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo(0, 0);
  };

  return (
    <div className="resume-hub">
      <div className="container">
        <header className="resume-hub-header">
          <h1 className="resume-hub-title">Free Resume Templates | Over 20 Free Templates</h1>
          <p className="resume-hub-meta">
            Over 20 Resume Templates to Create Your Resume in Minutes. Our Resumes Get You Hired! 
            Build Your Perfect Resume Today! Free Resume Builder Here.
          </p>
          <div className="resume-hub-info">
            <p><strong>Types:</strong> Industry-Specific Resumes, Job-Specific Resumes, Professional Resumes</p>
          </div>
          <div className="resume-hub-visitors">
            <span>
              <span className="rating-stars">★★★★★</span> 
              <strong>4.5/5</strong> (14K reviews)
            </span>
            <span><strong>Site visitors:</strong> Over 100K in the past month</span>
          </div>
        </header>

        <section className="hub-grid">
          {categories.map((cat, index) => (
            <a key={index} href={`/tools/resume-builder/create?template=${cat.template}`} className="hub-card" onClick={handleStart}>
              <div className="card-icon">{cat.icon}</div>
              <h3>{cat.title}</h3>
              <p>{cat.desc}</p>
              <span className="card-link">Start Building →</span>
            </a>
          ))}
        </section>
      </div>
    </div>
  );
};

export default ResumeLanding;
