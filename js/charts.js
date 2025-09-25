// Charts Management - Fixed Chart Type Switching
TechStock.Charts = {
  instances: {},
  currentType: 'line',

  init() {
    // Set Chart.js defaults for dark theme
    Chart.defaults.color = '#9ca3b4';
    Chart.defaults.borderColor = '#2d3748';
    Chart.defaults.backgroundColor = 'rgba(0, 212, 255, 0.1)';
    Chart.defaults.font = {
      family: 'JetBrains Mono'
    };
  },

  create(name, containerId) {
    const data = TechStock.Data.stockData[name];
    const company = TechStock.Data.companies[name];
    
    if (!data || !company || !data.history) return;

    const canvas = document.getElementById(containerId);
    if (!canvas) return;

    // Destroy existing chart
    if (this.instances[name]) {
      this.instances[name].destroy();
      delete this.instances[name];
    }

    const history = data.history.slice(-20);
    const color = data.change >= 0 ? '#10b981' : '#ef4444';
    const ctx = canvas.getContext('2d');
    
    // Create gradient for area charts
    let backgroundGradient = null;
    if (this.currentType === 'area') {
      backgroundGradient = ctx.createLinearGradient(0, 0, 0, 250);
      backgroundGradient.addColorStop(0, color + '40');
      backgroundGradient.addColorStop(1, color + '00');
    }
    
    const config = {
      type: this.currentType === 'area' ? 'line' : this.currentType,
      data: {
        labels: history.map(h => h.time),
        datasets: [{
          label: `${name} ($)`,
          data: history.map(h => h.price),
          borderColor: color,
          backgroundColor: this.currentType === 'area' ? backgroundGradient : 
                         this.currentType === 'bar' ? color + '80' : color + '20',
          borderWidth: this.currentType === 'bar' ? 0 : 2,
          fill: this.currentType === 'area',
          tension: this.currentType === 'line' || this.currentType === 'area' ? 0.4 : 0,
          pointRadius: this.currentType === 'bar' ? 0 : 1,
          pointHoverRadius: this.currentType === 'bar' ? 0 : 4,
          pointBackgroundColor: color,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 300,
          easing: 'easeInOutQuart'
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(26, 31, 53, 0.95)',
            titleColor: '#e6e8ef',
            bodyColor: '#e6e8ef',
            borderColor: '#374151',
            borderWidth: 1,
            cornerRadius: 6,
            displayColors: false,
            titleFont: {
              family: 'Inter',
              size: 12,
              weight: '600'
            },
            bodyFont: {
              family: 'JetBrains Mono',
              size: 11
            },
            callbacks: {
              title: (context) => {
                return `${name} - ${context[0].label}`;
              },
              label: (context) => {
                return `$${context.parsed.y.toFixed(2)}`;
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              color: '#2d3748',
              drawBorder: false,
              lineWidth: 1
            },
            ticks: {
              color: '#6b7280',
              font: {
                family: 'JetBrains Mono',
                size: 10
              },
              maxTicksLimit: 6
            }
          },
          y: {
            display: true,
            beginAtZero: false,
            grid: {
              color: '#2d3748',
              drawBorder: false,
              lineWidth: 1
            },
            ticks: {
              color: '#6b7280',
              font: {
                family: 'JetBrains Mono',
                size: 10
              },
              callback: (value) => '$' + value.toFixed(0)
            }
          }
        }
      }
    };

    try {
      this.instances[name] = new Chart(ctx, config);
    } catch (error) {
      console.error(`Failed to create chart for ${name}:`, error);
    }
  },

  update(name) {
    const chart = this.instances[name];
    const data = TechStock.Data.stockData[name];
    
    if (!chart || !data || !data.history) return;

    const history = data.history.slice(-20);
    const color = data.change >= 0 ? '#10b981' : '#ef4444';
    
    chart.data.labels = history.map(h => h.time);
    chart.data.datasets[0].data = history.map(h => h.price);
    chart.data.datasets[0].borderColor = color;
    chart.data.datasets[0].pointBackgroundColor = color;
    
    // Update background based on chart type
    const ctx = chart.ctx;
    if (this.currentType === 'area') {
      const gradient = ctx.createLinearGradient(0, 0, 0, 250);
      gradient.addColorStop(0, color + '40');
      gradient.addColorStop(1, color + '00');
      chart.data.datasets[0].backgroundColor = gradient;
    } else if (this.currentType === 'bar') {
      chart.data.datasets[0].backgroundColor = color + '80';
    } else {
      chart.data.datasets[0].backgroundColor = color + '20';
    }
    
    chart.update('none');
  },

  destroy(name) {
    if (this.instances[name]) {
      this.instances[name].destroy();
      delete this.instances[name];
    }
  },

  changeType(type) {
    console.log(`Changing chart type to: ${type}`);
    this.currentType = type;
    
    // Get current watchlist stocks
    const activeStocks = Object.keys(this.instances);
    
    // Destroy all existing charts
    activeStocks.forEach(name => {
      this.destroy(name);
    });
    
    // Recreate charts with new type
    setTimeout(() => {
      activeStocks.forEach(name => {
        const containerId = `chart-${name}`;
        if (document.getElementById(containerId)) {
          this.create(name, containerId);
        }
      });
    }, 100);
  }
};
