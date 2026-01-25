import React from 'react';

function ComparisonChart({ visibleBars, isVisible }) {
  // Bar data: values out of 10 for humans vs machines
  const categories = [
    { name: 'Speed', human: 2, machine: 10, id: 'speed' },
    { name: 'Reasoning', human: 10, machine: 10, id: 'reasoning' },
    { name: 'Creativity', human: 10, machine: 1, id: 'creativity' }
  ];

  const maxValue = 10;
  const yAxisLabels = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  if (!isVisible) return null;

  const renderChart = (title, dataKey) => (
    <div className="chart-panel">
      <h4 className="chart-title">{title}</h4>
      <div className="chart-area">
        {/* Y-axis */}
        <div className="y-axis">
          {yAxisLabels.map(label => (
            <span key={label} className="y-axis-label">{label}</span>
          ))}
        </div>

        {/* Chart grid and bars */}
        <div className="chart-grid">
          {/* Grid lines */}
          <div className="grid-lines">
            {yAxisLabels.map(label => (
              <div key={label} className="grid-line" />
            ))}
          </div>

          {/* Bars */}
          <div className="bars-row">
            {categories.map((cat) => {
              const value = dataKey === 'human' ? cat.human : cat.machine;
              const heightPercent = (value / maxValue) * 100;
              const isBarVisible = visibleBars.includes(cat.id);

              return (
                <div key={cat.id} className="bar-column">
                  <div className="bar-wrapper">
                    <div
                      className={`vertical-bar ${isBarVisible ? 'animate' : ''}`}
                      style={{ '--target-height': `${heightPercent}%` }}
                    />
                  </div>
                  <span className="bar-label">{cat.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`comparison-chart-container ${isVisible ? 'visible' : ''}`}>
      <div className="charts-wrapper">
        {renderChart('Humans', 'human')}
        {renderChart('Computers', 'machine')}
      </div>
    </div>
  );
}

export default ComparisonChart;
