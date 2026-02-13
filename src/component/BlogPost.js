import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaMedium } from 'react-icons/fa';
import ComparisonChart from './ComparisonChart';


function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartVisible, setChartVisible] = useState(false);
  const [visibleBars, setVisibleBars] = useState([]);

  // Refs for sections that trigger chart animations
  const sectionRefs = useRef({});
  const lastScrollY = useRef(0);
  const hasShownChart = useRef(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        // Validate id is a positive integer to prevent path traversal (CWE-22)
        if (!/^\d+$/.test(id)) {
          setPost(null);
          setLoading(false);
          return;
        }
        const postModule = await import(`../blog-posts/post${id}.js`);
        setPost(postModule.default);
      } catch (error) {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  // Set up IntersectionObserver for chart animations with reverse support
  useEffect(() => {
    if (!post || !post.hasChart) return;

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0.1
    };

    const handleIntersection = (entries) => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      lastScrollY.current = currentScrollY;

      entries.forEach((entry) => {
        const sectionId = entry.target.dataset.sectionId;

        if (entry.isIntersecting) {
          // Show chart when entering trigger zone
          if (sectionId === 'chart-trigger-start') {
            setChartVisible(true);
            hasShownChart.current = true;
          }

          // Add bars progressively
          if (sectionId === 'speed-section') {
            setVisibleBars(prev => prev.includes('speed') ? prev : [...prev, 'speed']);
          }
          if (sectionId === 'reasoning-section') {
            setVisibleBars(prev => prev.includes('reasoning') ? prev : [...prev, 'reasoning']);
          }
          if (sectionId === 'creativity-section') {
            setVisibleBars(prev => prev.includes('creativity') ? prev : [...prev, 'creativity']);
          }
        } else if (!isScrollingDown && hasShownChart.current) {
          // Scrolling back UP - remove bars in reverse order
          const rect = entry.target.getBoundingClientRect();
          const isBelowViewport = rect.top > window.innerHeight * 0.5;

          if (isBelowViewport) {
            // Remove bars in reverse order as user scrolls up
            if (sectionId === 'creativity-section') {
              setVisibleBars(prev => prev.filter(b => b !== 'creativity'));
            }
            if (sectionId === 'reasoning-section') {
              setVisibleBars(prev => prev.filter(b => b !== 'reasoning'));
            }
            if (sectionId === 'speed-section') {
              setVisibleBars(prev => prev.filter(b => b !== 'speed'));
            }
            // Hide chart completely when scrolling back up past the start trigger
            if (sectionId === 'chart-trigger-start') {
              setChartVisible(false);
              setVisibleBars([]);
              hasShownChart.current = false;
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all sections with IDs
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [post]);

  const setSectionRef = useCallback((id) => (el) => {
    if (el) sectionRefs.current[id] = el;
  }, []);

  if (loading) {
    return <div className="blog-post-loading">Loading...</div>;
  }

  if (!post) {
    return <div className="blog-post-loading">Blog post not found</div>;
  }

  // Render structured content
  const renderContent = () => {
    // If post has sections (structured content)
    if (post.sections) {
      return post.sections.map((section, index) => {
        if (section.type === 'paragraph') {
          return (
            <p
              key={index}
              ref={section.id ? setSectionRef(section.id) : null}
              data-section-id={section.id || null}
              className={section.id ? 'tracked-section' : ''}
            >
              {section.content}
            </p>
          );
        }
        return null;
      });
    }

    // Fallback for simple content
    return <p>{post.content}</p>;
  };

  return (
    <div className="container blog-post-container">
      <div className="blog-post-navigation">
        <Link to="/blog" className="back-to-blogs-btn">
          <FaArrowLeft /> Back to Blogs
        </Link>
      </div>

      <div className={`blog-post-layout ${post.hasChart ? 'with-chart' : ''}`}>
        <article className="blog-post">
          <header className="blog-post-header">
            <h1>{post.title}</h1>
            <div className="blog-post-meta">
              <span className="blog-post-date">{post.date}</span>
              {post.mediumUrl && (
                <a href={post.mediumUrl} target="_blank" rel="noopener noreferrer" className="medium-link">
                  <FaMedium /> Read on Medium
                </a>
              )}
            </div>
          </header>


          <div className="blog-post-content">
            {renderContent()}
          </div>
        </article>

        {post.hasChart && (
          <ComparisonChart
            visibleBars={visibleBars}
            isVisible={chartVisible}
          />
        )}
      </div>

      <div className="blog-post-navigation">
        <Link to="/blog" className="back-to-blogs-btn-bottom">
          <FaArrowLeft /> Back to Blogs
        </Link>
      </div>
    </div>
  );
}

export default BlogPost;
