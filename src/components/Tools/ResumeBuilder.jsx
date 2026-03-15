import React, { useState, useRef } from 'react';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    fullName: 'Jane Doe',
    jobTitle: 'Senior Software Engineer',
    email: 'jane.doe@example.com',
    phone: '+1 234 567 890',
    location: 'San Francisco, CA',
    summary: 'Experienced software engineer with a passion for building scalable web applications and leading cross-functional teams. Expert in React, Node.js, and cloud architecture.',
    skills: 'React, Node.js, TypeScript, AWS, Docker, GraphQL, System Design',
    experience: 'Senior Software Engineer | TechCorp (2020 - Present)\n- Led the migration of microservices to AWS, reducing latency by 30%.\n- Mentored 5 junior developers and improved code quality through rigorous PR reviews.\n\nSoftware Engineer | StartupInc (2018 - 2020)\n- Developed a real-time analytics dashboard using React and D3.js.\n- Automated CI/CD pipelines, increasing deployment frequency by 50%.',
    education: 'B.S. in Computer Science | University of Technology (2014 - 2018)\nSumma Cum Laude, Dean\'s List for 4 consecutive years.',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setFormData({
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      summary: '',
      skills: '',
      experience: '',
      education: '',
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-builder-tool">
      <div className="tool-grid">
        <div className="form-section card">
          <h3 className="section-title">Resume Details</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g. Jane Doe"
              />
            </div>
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. jane@example.com"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="e.g. +1 234 567 890"
              />
            </div>
            <div className="form-group full-width">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. San Francisco, CA"
              />
            </div>
            <div className="form-group full-width">
              <label>Professional Summary</label>
              <textarea
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                rows="3"
                placeholder="Briefly describe your professional background..."
              ></textarea>
            </div>
            <div className="form-group full-width">
              <label>Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, Design"
              />
            </div>
            <div className="form-group full-width">
              <label>Experience</label>
              <textarea
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                rows="6"
                placeholder="Job Title | Company (Date) - Key achievements..."
              ></textarea>
            </div>
            <div className="form-group full-width">
              <label>Education</label>
              <textarea
                name="education"
                value={formData.education}
                onChange={handleChange}
                rows="4"
                placeholder="Degree | Institution (Date) - Honors..."
              ></textarea>
            </div>
          </div>
          <div className="form-actions">
            <button className="btn btn-outline" onClick={handleClear}>Clear Form</button>
            <button className="btn btn-primary" onClick={handlePrint}>Print / Download PDF</button>
          </div>
        </div>

        <div className="preview-section">
          <div className="resume-preview" id="resume-to-print">
            <div className="resume-header">
              <h1>{formData.fullName || 'Name Placeholder'}</h1>
              <p className="job-title">{formData.jobTitle || 'Job Title Placeholder'}</p>
              <div className="contact-info">
                <span>{formData.email}</span>
                {formData.phone && <span> • {formData.phone}</span>}
                {formData.location && <span> • {formData.location}</span>}
              </div>
            </div>

            <div className="resume-body">
              {formData.summary && (
                <section>
                  <h2>Professional Summary</h2>
                  <p>{formData.summary}</p>
                </section>
              )}

              {formData.skills && (
                <section>
                  <h2>Skills</h2>
                  <div className="skills-tags">
                    {formData.skills.split(',').map((skill, i) => (
                      <span key={i} className="skill-tag">{skill.trim()}</span>
                    ))}
                  </div>
                </section>
              )}

              {formData.experience && (
                <section>
                  <h2>Professional Experience</h2>
                  <div className="multiline-text">{formData.experience}</div>
                </section>
              )}

              {formData.education && (
                <section>
                  <h2>Education</h2>
                  <div className="multiline-text">{formData.education}</div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
