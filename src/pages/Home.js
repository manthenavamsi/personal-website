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
      </div>
    </section>
  );
}

export default Home;
