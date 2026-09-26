import React, { useCallback, useEffect, useRef, useState } from 'react';
import quotes from '../data/quotes';
import SplitText from '../component/SplitText';

const HOLD_AFTER_ANIMATION = 5000;

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Home() {
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));
  const timeoutRef = useRef(null);

  // Show the next quote once the current one has fully animated in and been readable for a while
  const handleAnimationComplete = useCallback(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, HOLD_AFTER_ANIMATION);
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const currentQuote = quotes[quoteIndex];

  return (
    <section className="container">
      <div className="hero">
        <div className="hero-quote-container">
          <SplitText
            key={quoteIndex}
            text={`"${currentQuote.text}"`}
            tag="div"
            className="hero-quote"
            delay={50}
            duration={1.25}
            ease="power3.out"
            splitType="chars"
            from={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
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
