import React from 'react';

function ComparisonChart({ visibleBars, isVisible }) {
  // Bar data: percentage heights (0-100)
  const categories = [
    { name: 'Speed', human: 15, machine: 95, id: 'speed' },
    { name: 'Reasoning', human: 95, machine: 95, id: 'reasoning' },
    { name: 'Creativity', human: 95, machine: 10, id: 'creativity' }
  ];

  return (
    <div className={`comparison-chart-container ${isVisible ? 'visible' : ''}`}>
      <div className="chart-with-legend">
        <div className="chart-area">
          {/* Y-axis line */}
          <div className="y-axis-line" />

          {/* Bars area */}
          <div className="bars-area">
            {categories.map((cat) => {
              const isBarVisible = visibleBars.includes(cat.id);
              return (
                <div key={cat.id} className="bar-group">
                  <div className="bars-pair">
                    <div
                      className={`bar bar-machine ${isBarVisible ? 'animate' : ''}`}
                      style={{ '--target-height': `${cat.machine}%` }}
                    />
                    <div
                      className={`bar bar-human ${isBarVisible ? 'animate' : ''}`}
                      style={{ '--target-height': `${cat.human}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-axis line */}
          <div className="x-axis-line" />

          {/* Labels below x-axis */}
          <div className="x-axis-labels">
            {categories.map((cat) => (
              <span key={cat.id} className="bar-label">{cat.name}</span>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot human" />
            <span className="legend-text">Humans</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot machine" />
            <span className="legend-text">Machines</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparisonChart;
