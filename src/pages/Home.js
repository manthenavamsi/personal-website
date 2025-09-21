import React, { useEffect, useState } from 'react';

function Home() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    "Although, inventors posses with an exceptional ability to solve problems, but it all starts with a keen observation",
    // Add more quotes here if needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <section className="container">
      <div className="hero">
        <div className="hero-quote">
          "{quotes[quoteIndex]}"
        </div>
        <div className="hero-image">
          <div className="philosopher-placeholder">
            <div className="philosopher-text">श्री कृष्ण</div>
            <div className="philosopher-subtitle">Greatest Indian Philosopher</div>
            <div className="consciousness-text">Highest State of Consciousness</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
