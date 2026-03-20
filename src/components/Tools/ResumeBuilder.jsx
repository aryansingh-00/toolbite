import React, { useState, useEffect } from 'react';
import './ResumeBuilder.css';
import { RESUME_PRESETS } from '../../data/resumePresets';

const ResumeBuilder = () => {
  const [currentCategory, setCurrentCategory] = useState('standard'); // Default category
  const [formData, setFormData] = useState(() => {
    // Initial check on mount
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get('template') || 'standard';
    const templateIdFromUrl = params.get('sample');

    const presetsForCategory = RESUME_PRESETS[categoryFromUrl] || RESUME_PRESETS.standard;

    if (templateIdFromUrl) {
      const selectedPreset = presetsForCategory.find(p => p.id === templateIdFromUrl);
      if (selectedPreset) {
        return selectedPreset.formData;
      }
    }
    // Default to the first preset in the current category
    return presetsForCategory[0].formData;
  });

  // Listen for changes if the user navigates without full reload
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get('template') || 'standard';
    const templateIdFromUrl = params.get('sample');

    setCurrentCategory(categoryFromUrl); // Update category state

    const presetsForCategory = RESUME_PRESETS[categoryFromUrl] || RESUME_PRESETS.standard;

    if (templateIdFromUrl) {
      const selectedPreset = presetsForCategory.find(p => p.id === templateIdFromUrl);
      if (selectedPreset) {
        setFormData(selectedPreset.formData);
      } else {
        setFormData(presetsForCategory[0].formData);
      }
    } else {
      setFormData(presetsForCategory[0].formData);
    }
  }, [window.location.search]);

  const handlePresetChange = (e) => {
    const presetId = e.target.value;
    const presets = RESUME_PRESETS[currentCategory] || RESUME_PRESETS.standard;
    const selected = presets.find(p => p.id === presetId);
    if (selected) {
      setFormData(selected.formData);
    }
  };

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
          <div className="section-header-flex">
            <h3 className="section-title">Resume Details</h3>
            <div className="template-selector">
              <label>Choose Sample:</label>
              <select onChange={handlePresetChange} className="preset-select">
                {(RESUME_PRESETS[currentCategory] || RESUME_PRESETS.standard).map(preset => (
                  <option key={preset.id} value={preset.id}>{preset.name}</option>
                ))}
              </select>
            </div>
          </div>
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
            <div className="download-container">
              <button className="btn btn-primary" onClick={handlePrint}>Print / Download PDF</button>
              <p className="download-hint">Note: In the print window, select <strong>"Save as PDF"</strong> as the destination.</p>
            </div>
          </div>
        </div>

        <div className="preview-section">
          <div className="resume-preview" id="resume-to-print">
            <div className="resume-header">
              <h1>{formData.fullName || 'Name Placeholder'}</h1>
              <p className="job-title">{formData.jobTitle || 'Job Title Placeholder'}</p>
              <div className="contact-info">
                {formData.email && <span><i className="contact-icon">✉️</i> {formData.email}</span>}
                {formData.phone && <span><i className="contact-icon">📞</i> {formData.phone}</span>}
                {formData.location && <span><i className="contact-icon">📍</i> {formData.location}</span>}
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
