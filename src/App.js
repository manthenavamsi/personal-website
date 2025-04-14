import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import Bio from './pages/Bio'; // Rename import from About to Bio
import Blog from './pages/Blog';
import BlogPost from './component/BlogPost';
import Contact from './pages/Contact';
import './assets/css/styles.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} /> {/* This route is crucial */}
          <Route path="/bio" element={<Bio />} /> {/* Change path from /about to /bio */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
