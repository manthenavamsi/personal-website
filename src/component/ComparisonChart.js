import React, { useRef } from 'react';

function ComparisonChart({ visibleBars, isVisible }) {
  const chartRef = useRef(null);

  // Bar data: percentage values for humans vs machines
  const categories = [
    { name: 'Speed', human: 15, machine: 95, id: 'speed' },
    { name: 'Reasoning', human: 70, machine: 75, id: 'reasoning' },
    { name: 'Creativity', human: 95, machine: 25, id: 'creativity' }
  ];

  if (!isVisible) return null;

  return (
    <div className={`comparison-chart-container ${isVisible ? 'visible' : ''}`} ref={chartRef}>
      <div className="chart-wrapper">
        {/* Humans Chart */}
        <div className="chart-column">
          <h4 className="chart-title">Humans</h4>
          <div className="bars-container">
            {categories.map((cat, index) => (
              <div key={`human-${cat.id}`} className="bar-row">
                <span className="bar-label">{cat.name}</span>
                <div className="bar-track">
                  <div
                    className={`bar bar-human ${visibleBars.includes(cat.id) ? 'animate' : ''}`}
                    style={{
                      '--target-width': `${cat.human}%`,
                      transitionDelay: `${index * 0.15}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Machines Chart */}
        <div className="chart-column">
          <h4 className="chart-title">Machines</h4>
          <div className="bars-container">
            {categories.map((cat, index) => (
              <div key={`machine-${cat.id}`} className="bar-row">
                <span className="bar-label">{cat.name}</span>
                <div className="bar-track">
                  <div
                    className={`bar bar-machine ${visibleBars.includes(cat.id) ? 'animate' : ''}`}
                    style={{
                      '--target-width': `${cat.machine}%`,
                      transitionDelay: `${index * 0.15}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparisonChart;
