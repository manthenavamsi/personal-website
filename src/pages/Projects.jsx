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
                      {project.linkGroups && project.linkGroups.map((group, groupIndex) => (
                        <div key={groupIndex} className="project-link-group">
                          <span className="link-group-name">{group.name}</span>
                          <div className="link-group-icons">
                            {group.links.map((linkItem, linkIndex) => (
                              <a
                                key={linkIndex}
                                href={linkItem.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-icon-link"
                                title={linkItem.icon === 'github' ? 'GitHub' : 'NPM'}
                              >
                                {linkItem.icon === 'github' && <FaGithub />}
                                {linkItem.icon === 'npm' && <FaNpm />}
                              </a>
                            ))}
                          </div>
                        </div>
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
