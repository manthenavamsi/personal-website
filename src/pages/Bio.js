import React, { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';

function Bio() {
  const jobExperience = [
    { name: 'Lead Security Engineer', years: 5.11, percentage: 33, color: '#f0544f' },
    { name: 'Lead Consultant', years: 4.11, percentage: 27, color: '#2CB67D' },
    { name: 'Head of IT & Security (Advisor)', years: 3.4, percentage: 22, color: '#4FC1D0' },
    { name: 'SOC Analyst', years: 2, percentage: 13, color: '#7F5AF0' },
    { name: 'Security Specialist', years: 1, percentage: 6, color: '#F7931E' }
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const PieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.percentage, 0);
    let cumulativePercentage = 0;

    const createPath = (percentage, startAngle, endAngle) => {
      const start = polarToCartesian(50, 50, 40, endAngle);
      const end = polarToCartesian(50, 50, 40, startAngle);
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      return [
        "M", 50, 50,
        "L", start.x, start.y,
        "A", 40, 40, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
      ].join(" ");
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };

    return (
      <div className="pie-chart-container">
        <div className="pie-chart-wrapper">
          <svg viewBox="0 0 100 100" className="pie-chart">
            {data.map((item, index) => {
              const percentage = (item.percentage / total) * 100;
              const startAngle = (cumulativePercentage / 100) * 360;
              const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
              cumulativePercentage += percentage;

              return (
                <path
                  key={index}
                  d={createPath(percentage, startAngle, endAngle)}
                  fill={item.color}
                  className={`pie-slice ${hoveredIndex === index ? 'highlighted' : ''} ${hoveredIndex !== null && hoveredIndex !== index ? 'dimmed' : ''}`}
                  data-tooltip={`${item.name}: ${item.percentage}%`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>
          <div className="pie-legend-vertical">
            {data.map((item, index) => (
              <div
                key={index}
                className={`legend-item-vertical ${hoveredIndex === index ? 'highlighted' : ''} ${hoveredIndex !== null && hoveredIndex !== index ? 'dimmed' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="legend-color"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="legend-text">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="container">
      <div className="bio-header">
        <h1 className="bio-title">Vamsi Manthena</h1>
        <p className="bio-subtitle">Cybersecurity Professional & Technical Leader</p>
        <div className="bio-social">
          <a
            href="https://www.linkedin.com/in/manthenavamsi/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-profile-link"
            aria-label="Visit Vamsi's LinkedIn Profile"
          >
            <FaLinkedin className="linkedin-profile-icon" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </div>

      <div className="about-section">
        <div className="about-text">
          <p className="professional-summary">
            Cybersecurity professional with 13+ years of experience designing, implementing, and governing enterprise-grade security solutions across healthcare, telecom, and AI-driven environments, with proven expertise in technical execution (cloud security, DevSecOps, vulnerability management, penetration testing), governance & compliance (HIPAA, PCI-DSS, GDPR, SOC2, NIST, ISO), and leadership (building security programs, managing teams, enabling regulatory certifications), delivering a track record of securing critical assets while enabling digital transformation and global business growth.
          </p>
        </div>
        <div className="about-chart">
          <PieChart data={jobExperience} />
        </div>
      </div>

      <div className="cv-section">

        {/* Experience */}
        <div className="cv-experience">
          <h2 className="section-title">Experience</h2>

          <div className="experience-item glass">
            <div className="experience-header">
              <h3 className="job-title">IT & Security Advisor and Freelancer</h3>
              <div className="company-period">
                <span className="company">FitPeo</span>
                <span className="period">May 2021 – Present</span>
              </div>
            </div>
            <ul className="achievements">
              <li>Built company's security & IT program from scratch, achieving HIPAA & SOC2 readiness</li>
              <li>Designed HIPAA-compliant cloud infrastructure and monitoring pipelines</li>
              <li>Embedded security into SDLC, cutting release vulnerabilities by 40%</li>
              <li>Led vulnerability management across hybrid environments</li>
              <li>Implemented vendor risk management and access governance</li>
            </ul>
            <div className="key-impact">
              <strong>Key Impact:</strong> Established scalable framework protecting patient data and enabling market expansion
            </div>
          </div>

          <div className="experience-item glass">
            <div className="experience-header">
              <h3 className="job-title">Lead Engineer</h3>
              <div className="company-period">
                <span className="company">Comcast</span>
                <span className="period">Sep 2019 – Present</span>
              </div>
            </div>
            <ul className="achievements">
              <li>Championed "Build Security In" initiative across thousands of applications</li>
              <li>Directed enterprise vulnerability management covering 10K+ assets</li>
              <li>Performed risk assessments for PCI-DSS, HIPAA, GDPR, SOX compliance</li>
              <li>Automated patching, scanning, and compliance checks with Python/Shell</li>
              <li>Built SIEM log correlation rules reducing detection time by 30%</li>
            </ul>
            <div className="key-impact">
              <strong>Key Impact:</strong> Elevated enterprise security posture through scalable detection and secure SDLC
            </div>
          </div>

          <div className="experience-item glass">
            <div className="experience-header">
              <h3 className="job-title">Lead Consultant, Risk Management</h3>
              <div className="company-period">
                <span className="company">Meditology Services</span>
                <span className="period">Oct 2015 – Sep 2019</span>
              </div>
            </div>
            <ul className="achievements">
              <li>Led risk assessments and audits (HIPAA, PCI-DSS, GDPR, SOC2) for healthcare and finance clients</li>
              <li>Conducted penetration testing and vulnerability assessments</li>
              <li>Built risk registries and remediation roadmaps</li>
              <li>Presented executive-level summaries to boards and C-levels</li>
              <li>Supported incident response investigations</li>
            </ul>
            <div className="key-impact">
              <strong>Key Impact:</strong> Enabled clients to maintain certifications and reduce systemic risks
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="cv-education glass">
          <h2 className="section-title">Education</h2>
          <div className="education-item">
            <h3>Master's - Cyber Security</h3>
            <p>Valparaiso University (2016)</p>
          </div>
          <div className="education-item">
            <h3>Master's - Computer Application</h3>
            <p>Acharya Nagarjuna University (2011)</p>
          </div>
          <div className="education-item">
            <h3>Bachelor of Arts - Economics</h3>
            <p>Acharya Nagarjuna University (2008)</p>
          </div>
        </div>

        {/* Technical Skills */}
        <div className="cv-skills glass">
          <h2 className="section-title">Technical Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h4>Regulatory & Frameworks</h4>
              <p>HIPAA, PCI-DSS, GDPR, CCPA, SOC2, NIST, ISO 27001, OWASP</p>
            </div>
            <div className="skill-category">
              <h4>Security Tools</h4>
              <p>SIEM (Splunk, SecureView), SOAR, EDR (McAfee, CrowdStrike, SentinelOne), IDS/IPS (CISCO Sourcefire)</p>
            </div>
            <div className="skill-category">
              <h4>DevSecOps</h4>
              <p>SAST (Snyk), SCA (Snyk, GitHub Dependabot), GitHub Security, Burp Suite</p>
            </div>
            <div className="skill-category">
              <h4>Cloud & Platforms</h4>
              <p>AWS, Azure, GCP, VMware, KVM, Containers, Linux, Windows, macOS</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="cv-certifications glass">
          <h2 className="section-title">Certifications</h2>
          <div className="certifications-list">
            <span className="certification">CISSP</span>
            <span className="certification">CEH</span>
            <span className="certification">ITIL</span>
            <span className="certification">CCSFP (HITRUST)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bio;
