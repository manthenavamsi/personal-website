import React, { useEffect, useState } from 'react';
import quotes from '../data/quotes';

function Home() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[quoteIndex];

  return (
    <section className="container">
      <div className="hero">
        <div className="hero-quote-container">
          <div className="hero-quote">
            "{currentQuote.text}"
          </div>
          {currentQuote.author && (
            <div className="quote-author">
              — {currentQuote.author}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Home;
