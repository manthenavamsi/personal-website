import React from 'react';
import { FaExternalLinkAlt, FaGithub, FaNpm } from 'react-icons/fa';
import projects from '../data/projects';

function Projects() {
  return (
    <section className="container">
      <div className="projects-container">
        <h1 className="projects-title">Projects</h1>

        <div className="projects-list">
          {projects.map(project => (
            <div key={project.id} className="project-item">
              <div className="project-content-wrapper">
                {project.imageUrl && (
                  <div className="project-image">
                    <img src={project.imageUrl} alt={project.title} />
                  </div>
                )}

                <div className="project-details">
                  <div className="project-header">
                    <h2 className="project-title">{project.title}</h2>
                    <span className="project-type">{project.type}</span>
                  </div>

                  <p className="project-description">{project.description}</p>

                  <div className="project-footer">
                    <span className="project-date">{project.date}</span>
                    <div className="project-links">
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          View Project <FaExternalLinkAlt />
                        </a>
                      )}
                      {project.links && project.links.map((linkItem, index) => (
                        <a
                          key={index}
                          href={linkItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                        >
                          {linkItem.icon === 'github' && <FaGithub />}
                          {linkItem.icon === 'npm' && <FaNpm />}
                          {linkItem.icon === 'external' && <FaExternalLinkAlt />}
                          {' '}{linkItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
