import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

function Bio() {
  const capabilities = [
    "Cloud Security Architecture (AWS, Azure, GCP)",
    "DevSecOps & Secure SDLC Implementation",
    "Vulnerability Management & Penetration Testing",
    "Security Governance & Compliance (HIPAA, PCI-DSS, GDPR, SOC2, NIST, ISO 27001)",
    "Incident Response & Threat Detection",
    "Security Program Development",
    "Risk Assessment & Management",
    "Security Automation & Scripting (Python, Shell)",
    "SIEM & Log Analysis",
    "Vendor Risk Management",
    "Security Team Leadership & Mentoring"
  ];

  const workHistory = [
    {
      title: "IT & Security Advisor and Freelancer",
      company: "FitPeo",
      period: "May 2021 – Present",
      achievements: [
        "Built company's security & IT program from scratch, achieving HIPAA & SOC2 readiness",
        "Designed HIPAA-compliant cloud infrastructure and monitoring pipelines",
        "Embedded security into SDLC, cutting release vulnerabilities by 40%",
        "Led vulnerability management across hybrid environments",
        "Implemented vendor risk management and access governance"
      ],
      keyImpact: "Established scalable framework protecting patient data and enabling market expansion"
    },
    {
      title: "Lead Engineer",
      company: "Comcast",
      period: "Sep 2019 – Present",
      achievements: [
        "Championed 'Build Security In' initiative across thousands of applications",
        "Directed enterprise vulnerability management covering 10K+ assets",
        "Performed risk assessments for PCI-DSS, HIPAA, GDPR, SOX compliance",
        "Automated patching, scanning, and compliance checks with Python/Shell",
        "Built SIEM log correlation rules reducing detection time by 30%"
      ],
      keyImpact: "Elevated enterprise security posture through scalable detection and secure SDLC"
    },
    {
      title: "Lead Consultant, Risk Management",
      company: "Meditology Services",
      period: "Oct 2015 – Sep 2019",
      achievements: [
        "Led risk assessments and audits (HIPAA, PCI-DSS, GDPR, SOC2) for healthcare and finance clients",
        "Conducted penetration testing and vulnerability assessments",
        "Built risk registries and remediation roadmaps",
        "Presented executive-level summaries to boards and C-levels",
        "Supported incident response investigations"
      ],
      keyImpact: "Enabled clients to maintain certifications and reduce systemic risks"
    }
  ];

  const education = [
    {
      degree: "Master's - Cyber Security",
      institution: "Valparaiso University",
      year: "2016"
    },
    {
      degree: "Master's - Computer Application",
      institution: "Acharya Nagarjuna University",
      year: "2011"
    },
    {
      degree: "Bachelor of Arts - Economics",
      institution: "Acharya Nagarjuna University",
      year: "2008"
    }
  ];

  const certifications = [
    "CISSP (Certified Information Systems Security Professional)",
    "CEH (Certified Ethical Hacker)",
    "ITIL (Information Technology Infrastructure Library)",
    "CCSFP (HITRUST Certified CSF Practitioner)"
  ];

  return (
    <section className="container">
      {/* Centered Bio Header */}
      <div className="bio-header-centered">
        <h1 className="bio-name">Vamsi Manthena</h1>
        <p className="bio-title-text">Cybersecurity Professional & Technical Leader</p>
        <a
          href="https://www.linkedin.com/in/manthenavamsi/"
          target="_blank"
          rel="noopener noreferrer"
          className="bio-linkedin-link"
        >
          <FaLinkedin className="linkedin-icon" />
          <span>Connect on LinkedIn</span>
        </a>
      </div>

      {/* Capabilities Section */}
      <div className="bio-section">
        <h2 className="bio-section-title">Capabilities</h2>
        <div className="capabilities-grid">
          {capabilities.map((capability, index) => (
            <div key={index} className="capability-item">
              <span className="capability-bullet">▸</span>
              <span>{capability}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Work History Section */}
      <div className="bio-section">
        <h2 className="bio-section-title">Work History</h2>
        <div className="work-history-list">
          {workHistory.map((job, index) => (
            <div key={index} className="work-item">
              <div className="work-header">
                <h3 className="work-title">{job.title}</h3>
                <div className="work-company-period">
                  <span className="work-company">{job.company}</span>
                  <span className="work-period">{job.period}</span>
                </div>
              </div>
              <ul className="work-achievements">
                {job.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
              <div className="work-impact">
                <strong>Key Impact:</strong> {job.keyImpact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="bio-section">
        <h2 className="bio-section-title">Education</h2>
        <div className="education-list">
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3 className="education-degree">{edu.degree}</h3>
              <p className="education-details">
                {edu.institution} ({edu.year})
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div className="bio-section">
        <h2 className="bio-section-title">Certifications</h2>
        <div className="certifications-grid">
          {certifications.map((cert, index) => (
            <div key={index} className="certification-badge">
              {cert}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Bio;
