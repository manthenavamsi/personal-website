import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

function Bio() {
  const capabilities = [
    "Cloud Security Architecture",
    "Security Engineering",
    "DevSecOps & Secure SDLC Implementation",
    "AI-Enabled Security Deployment",
    "Vulnerability Management & Penetration Testing",
    "Security Governance & Compliance",
    "Incident Response & Threat Detection",
    "Security Program Development & Planning",
    "Risk Assessment & Management",
    "Security Automation & Scripting",
    "SIEM & Log Analysis",
    "Vendor Risk Management",
    "Security Planning & Cross-Functional Collaboration",
    "Building Strong Self-Sufficient Teams",
    "Team Leadership & Mentoring"
  ];

  const workHistory = [
    {
      title: "Lead Engineer",
      company: "Comcast",
      period: "Sep 2019 – Present",
      summary: "Led enterprise-wide security enablement across Comcast's Global Technology Organization (GTO), empowering thousands of developers to build secure products at scale. Spearheaded DevSecOps transformation through threat modeling programs, security tooling integration, and developer education initiatives. Drove security product strategy, launching a software supply chain trust program and AI-powered developer assistance tools. Owned incident response operations and security automation across the application lifecycle.",
      tags: ["DevSecOps", "Threat Modeling", "Security Tooling", "Developer Education", "Incident Response", "Security Automation", "Supply Chain Security", "AI"]
    },
    {
      title: "Head of IT and Security",
      company: "FitPeo",
      period: "May 2021 – Dec 2025",
      summary: "Built and led the security and IT organization from inception at this healthcare technology company specializing in remote patient monitoring and chronic care management. Established core security functions including Governance, Risk & Compliance (GRC), Security Architecture & Engineering, Security Operations, and IT Operations. Achieved SOC2 attestation and implemented HIPAA compliance programs. Developed the DevSecOps practice, threat modeling methodology, incident response capabilities, and third-party risk management program. Managed cross-functional security strategy, budget planning, and an offshore operations team.",
      tags: ["GRC", "Security Architecture", "Security Operations", "IT Operations", "HIPAA", "SOC2", "DevSecOps", "Third-Party Risk", "Incident Response", "Team Leadership"]
    },
    {
      title: "Lead Security Consultant",
      company: "Meditology Services",
      period: "Oct 2015 – Sep 2019",
      summary: "Delivered security consulting services to healthcare organizations including hospitals, payers, and technology vendors. Led engagements across Security Assessments, Compliance Audits (HIPAA, NIST CSF, HITRUST, SOC2), and Offensive Security Testing. Provided executive-level advisory services and presented findings to CISO-level stakeholders. Managed a team of consultants across concurrent client engagements.",
      tags: ["Security Assessments", "Compliance Audits", "HIPAA", "HITRUST", "SOC2", "Penetration Testing", "Executive Advisory", "Team Leadership"]
    },
    {
      title: "Lab Assistant & Summer Intern",
      company: "Valparaiso University",
      period: "2014 – 2016",
      summary: "Managed IT infrastructure and security for the Computer Science department. Led a team to architect and deploy a CloudStack virtualization platform, enabling students to work across multiple operating system environments for academic projects.",
      tags: ["IT Infrastructure", "Virtualization", "CloudStack", "System Administration"]
    },
    {
      title: "Security Operations Analyst",
      company: "ValueLabs",
      period: "2012 – 2014",
      summary: "Operated within the Security Operations Center for pharmaceutical client Celgene. Focused on Threat Detection & Analysis, SIEM management, and Incident Response. Conducted network traffic analysis and developed detection rules to identify and block malicious activity.",
      tags: ["SOC", "Threat Detection", "SIEM", "Incident Response", "Network Analysis", "IDS/IPS"]
    }
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

      {/* Overview Section */}
      <div className="bio-section">
        <h2 className="bio-section-title">Overview</h2>
        <p className="bio-overview">
          Cybersecurity leader passionate about building security programs that enable business growth. I bring expertise across Security Architecture, Governance Risk & Compliance, DevSecOps, and Security Operations, with a track record of leading teams, driving compliance initiatives, and embedding security into engineering culture.
        </p>
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
              {job.summary && <p className="work-summary">{job.summary}</p>}
              {job.tags && (
                <div className="work-tags">
                  {job.tags.map((tag, idx) => (
                    <span key={idx} className="work-tag">{tag}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Education Section */}
      <div className="bio-section">
        <h2 className="bio-section-title">Education</h2>
        <p className="education-inline">
          Master's - Computer Applications | Cybersecurity
          <br />
          Bachelor's - Economics
        </p>
      </div>

      {/* Certifications Section */}
      <div className="bio-section bio-section-last">
        <h2 className="bio-section-title">Certifications</h2>
        <p className="certifications-inline">
          CISSP &nbsp;|&nbsp; CEH &nbsp;|&nbsp; ITILv4 &nbsp;|&nbsp; CCSFP (HITRUST Practitioner)
        </p>
      </div>
    </section>
  );
}

export default Bio;
