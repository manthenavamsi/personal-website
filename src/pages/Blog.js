import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaThLarge, FaList } from 'react-icons/fa';

function Blog() {
  const [viewMode, setViewMode] = useState('tiles'); // 'tiles' or 'list'
  
  // Mock blog data - replace with your actual data
  const blogPosts = [
    {
      id: 1,
      title: "Title of the blog 1",
      description: "Short description of this blog, Short description of this blog, Short description of this blog.",
      date: "April 10, 2025",
      image: "Image"
    },
    {
      id: 2,
      title: "Title of the blog 2",
      description: "Short description of this blog, Short description of this blog, Short description of this blog.",
      date: "April 8, 2025",
      image: "Image"
    },
    {
      id: 3,
      title: "Title of the blog 3",
      description: "Short description of this blog, Short description of this blog, Short description of this blog.",
      date: "April 5, 2025",
      image: "Image"
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
            <div className="blog-image">{post.image}</div>
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
