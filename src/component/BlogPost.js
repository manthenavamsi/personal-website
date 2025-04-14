import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   console.log("BlogPost component mounted with id:", id);
    const fetchBlogPost = async () => {
      try {
        // Dynamic import based on ID
        const postModule = await import(`../blog-posts/post${id}.js`);
        setPost(postModule.default);
      } catch (error) {
        console.error("Failed to load blog post:", error);
        console.error("Stack:", error.stack);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost(); 
  }, [id]);

  if (loading) {
    return <div className="blog-post-loading">Loading...</div>;
  }

  if (!post) {
    return <div className="blog-post-loading">Blog post not found</div>;
  }

  return (
    <div className="container blog-post-container">
      <div className="blog-post-navigation">
        <Link to="/blog" className="back-to-blogs-btn">
          <FaArrowLeft /> Back to Blogs
        </Link>
      </div>

      <article className="blog-post">
        <header className="blog-post-header">
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <span className="blog-post-date">{post.date}</span>
          </div>
        </header>

        <div className="blog-post-featured-image">
          <div className="blog-image">{post.image}</div>
        </div>

        <div className="blog-post-content">
          <p>{post.content}</p>
        </div>
      </article>

      <div className="blog-post-navigation">
        <Link to="/blog" className="back-to-blogs-btn-bottom">
          <FaArrowLeft /> Back to Blogs
        </Link>
      </div>
    </div>
  );
}

export default BlogPost;
