import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaThLarge, FaList } from 'react-icons/fa';
import llmImage from '../assets/images/LLMs.jpg';

function Blog() {
  const [viewMode, setViewMode] = useState('list');

  const blogPosts = [
    {
      id: 4,
      title: "LLMs: A Big Leap for Machines and also a Long Road to Creativity",
      description: "Exploring how Large Language Models crossed a boundary humans speculated about for centuries, and why creativity remains our edge.",
      date: "January 24, 2026",
      image: llmImage
    }
  ];

  return (
    <section className="container">
      <div className="blog-header">
        <div className="view-options">
          <button
            className={`view-option ${viewMode === 'tiles' ? 'active' : ''}`}
            onClick={() => setViewMode('tiles')}
          >
            <FaThLarge /> Tiles
          </button>
          <button
            className={`view-option ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <FaList /> List
          </button>
        </div>
      </div>

      <div className={`blog-posts ${viewMode === 'list' ? 'list-view' : 'tile-view'}`}>
        {blogPosts.map(post => (
          <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
            <div className="blog-image">
              {typeof post.image === 'string' && !post.image.includes('/') ? (
                post.image
              ) : (
                <img src={post.image} alt={post.title} />
              )}
            </div>
            <div className="blog-content">
              <div className="blog-header">
                <h3>{post.title}</h3>
                <span className="blog-date">{post.date}</span>
              </div>
              <p className="blog-description">{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Blog;
