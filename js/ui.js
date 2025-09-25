// UI Management - Complete Fixed Version with Working Modal Chart Tooltip
TechStock.UI = {
  watchlist: ["Apple", "Microsoft", "Alphabet"],
  filters: { search: '', sector: '', cap: '' },
  currentTheme: 'dark',

  init() {
    this.bindEvents();
    this.renderAll();
    this.initTheme();
  },

  bindEvents() {
    // Search with debouncing
    let searchTimeout;
    $('#searchInput').on('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.filters.search = e.target.value;
        this.renderTable();
      }, 300);
    });

    // Filters
    $('#sectorFilter, #capFilter').on('change', () => {
      this.filters.sector = $('#sectorFilter').val();
      this.filters.cap = $('#capFilter').val();
      this.renderTable();
    });

    // Chart controls
    $(document).on('click', '.ctrl-btn', (e) => {
      $('.ctrl-btn').removeClass('active');
      $(e.currentTarget).addClass('active');
      const type = $(e.currentTarget).data('type');
      TechStock.Charts.changeType(type);
    });

    // Refresh button
    $('#refreshBtn').on('click', () => {
      if (!TechStock.App.isUpdating) {
        TechStock.App.updateAll();
      }
    });

    // Export button
    $('#exportBtn').on('click', () => {
      this.exportData();
    });

    // Theme toggle
    $('#themeToggle').on('click', () => {
      this.toggleTheme();
    });

    // Modal close events
    $(document).on('click', '.modal-close', () => {
      this.closeModal();
    });

    $(document).on('click', '#stockModal', (e) => {
      if (e.target.id === 'stockModal') {
        this.closeModal();
      }
    });

    // Add to watchlist buttons
    $(document).on('click', '.btn-add', (e) => {
      e.stopPropagation();
      const row = $(e.target).closest('tr');
      const stockName = row.find('.company-name').text().trim();
      this.addToWatchlist(stockName);
    });

    // Remove from watchlist buttons  
    $(document).on('click', '.btn-remove', (e) => {
      e.stopPropagation();
      const item = $(e.target).closest('.watchlist-item');
      const stockName = item.find('h4').text().trim();
      this.removeFromWatchlist(stockName);
    });

    // Watchlist item clicks
    $(document).on('click', '.watchlist-item', (e) => {
      if ($(e.target).closest('.btn-remove').length) return;
      const stockName = $(e.currentTarget).find('h4').text().trim();
      this.showDetails(stockName);
    });
  },

  bindTableEvents() {
    $('#stockTableBody tr').off('click');
    
    $('#stockTableBody tr').on('click', function(e) {
      if ($(e.target).closest('.btn-add').length) {
        return;
      }
      
      const stockName = $(this).find('.company-name').text().trim();
      TechStock.UI.showDetails(stockName);
    });
  },

  closeModal() {
    $('#stockModal').removeClass('show').fadeOut();
  },

  initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.currentTheme = savedTheme;
    this.applyTheme();
  },

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme();
    localStorage.setItem('theme', this.currentTheme);
  },

  applyTheme() {
    const body = $('body');
    const icon = $('#themeToggle i');
    
    if (this.currentTheme === 'light') {
      body.removeClass('dark-theme').addClass('light-theme');
      icon.removeClass('fa-palette fa-sun').addClass('fa-moon');
      
      document.documentElement.style.setProperty('--bg-primary', '#ffffff');
      document.documentElement.style.setProperty('--bg-secondary', '#f8f9fa');
      document.documentElement.style.setProperty('--bg-tertiary', '#e9ecef');
      document.documentElement.style.setProperty('--bg-panel', '#ffffff');
      document.documentElement.style.setProperty('--text-primary', '#212529');
      document.documentElement.style.setProperty('--text-secondary', '#6c757d');
      document.documentElement.style.setProperty('--border-color', '#dee2e6');
    } else {
      body.removeClass('light-theme').addClass('dark-theme');
      icon.removeClass('fa-moon').addClass('fa-palette');
      
      document.documentElement.style.setProperty('--bg-primary', '#0a0e1a');
      document.documentElement.style.setProperty('--bg-secondary', '#1a1f35');
      document.documentElement.style.setProperty('--bg-tertiary', '#242b42');
      document.documentElement.style.setProperty('--bg-panel', '#1e2438');
      document.documentElement.style.setProperty('--text-primary', '#e6e8ef');
      document.documentElement.style.setProperty('--text-secondary', '#9ca3b4');
      document.documentElement.style.setProperty('--border-color', '#2d3748');
    }
  },

  renderAll() {
    this.renderMarketTicker();
    this.renderWatchlist();
    this.renderTable();
    this.renderCharts();
    this.updateStats();
  },

  renderMarketTicker() {
    const html = TechStock.Data.marketIndices.map(index => {
      const changeClass = index.change >= 0 ? 'positive' : 'negative';
      const icon = index.change >= 0 ? '▲' : '▼';
      
      return `
        <div class="ticker-item">
          <span class="ticker-name">${index.name}</span>
          <span class="ticker-price">$${index.value.toLocaleString()}</span>
          <span class="ticker-change ${changeClass}">
            ${icon} ${Math.abs(index.change)}
          </span>
        </div>
      `;
    }).join('');
    
    $('#marketTicker').html(html);
  },

  renderWatchlist() {
    if (this.watchlist.length === 0) {
      $('#watchlistItems').html(`
        <div class="empty-state">
          <i class="fas fa-star"></i>
          <p>Your watchlist is empty</p>
        </div>
      `);
      $('#portfolioValue').text('$0');
      return;
    }

    let totalValue = 0;
    const html = this.watchlist.map(name => {
      const data = TechStock.Data.stockData[name];
      const company = TechStock.Data.companies[name];
      
      if (!data || !company) return '';

      totalValue += data.price;
      const changeClass = data.change >= 0 ? 'positive' : 'negative';
      
      return `
        <div class="watchlist-item">
          <div class="stock-info">
            <h4>${name}</h4>
            <div class="stock-meta">${company.symbol} • ${company.sector}</div>
          </div>
          <div class="stock-data">
            <div class="stock-price">$${data.price.toFixed(2)}</div>
            <div class="stock-change ${changeClass}">
              ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)}
            </div>
          </div>
          <button class="btn-remove">
            <i class="fas fa-times"></i>
          </button>
        </div>
      `;
    }).join('');

    $('#watchlistItems').html(html);
    $('#portfolioValue').text(`$${totalValue.toLocaleString()}`);
  },

  renderTable() {
    const { search, sector, cap } = this.filters;
    let stocks = Object.entries(TechStock.Data.companies);
    
    if (search) {
      const term = search.toLowerCase();
      stocks = stocks.filter(([name, info]) =>
        name.toLowerCase().includes(term) ||
        info.symbol.toLowerCase().includes(term) ||
        info.sector.toLowerCase().includes(term)
      );
    }
    
    if (sector) {
      stocks = stocks.filter(([, info]) => info.sector === sector);
    }

    if (cap) {
      stocks = stocks.filter(([, info]) => {
        const marketCap = info.marketCap;
        switch (cap) {
          case 'large': return marketCap.includes('T') || parseInt(marketCap) >= 500;
          case 'mid': return !marketCap.includes('T') && parseInt(marketCap) >= 50 && parseInt(marketCap) < 500;
          case 'small': return !marketCap.includes('T') && parseInt(marketCap) < 50;
          default: return true;
        }
      });
    }

    const html = stocks.map(([name, company]) => {
      const data = TechStock.Data.stockData[name];
      if (!data) return '';

      const changeClass = data.change >= 0 ? 'positive' : 'negative';
      const inWatchlist = this.watchlist.includes(name);

      return `
        <tr class="stock-row" data-stock="${name}">
          <td>
            <div class="company-name">${name}</div>
            <div class="company-symbol">${company.symbol} • ${company.sector}</div>
          </td>
          <td class="price-cell">$${data.price.toFixed(2)}</td>
          <td class="change-cell ${changeClass}">
            ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)}
            <br><small>(${data.changePercent})</small>
          </td>
          <td class="volume-cell">${(data.volume / 1000000).toFixed(1)}M</td>
          <td>${company.marketCap}</td>
          <td>
            <button class="btn-add ${inWatchlist ? 'disabled' : ''}" 
                    ${inWatchlist ? 'disabled' : ''}>
              <i class="fas ${inWatchlist ? 'fa-check' : 'fa-plus'}"></i>
              ${inWatchlist ? 'Added' : 'Add'}
            </button>
          </td>
        </tr>
      `;
    }).join('');

    $('#stockTableBody').html(html);
    $('#stockCount').text(stocks.length);
    
    setTimeout(() => {
      this.bindTableEvents();
    }, 100);
  },

  renderCharts() {
    if (this.watchlist.length === 0) {
      $('#chartsGrid').html(`
        <div class="empty-state">
          <i class="fas fa-chart-line"></i>
          <p>Add stocks to see live charts</p>
        </div>
      `);
      return;
    }

    const html = this.watchlist.map(name => {
      const data = TechStock.Data.stockData[name];
      const company = TechStock.Data.companies[name];
      
      if (!data || !company) return '';

      const changeClass = data.change >= 0 ? 'positive' : 'negative';

      return `
        <div class="chart-card fade-in">
          <div class="chart-header">
            <div>
              <h4 class="chart-title">${name}</h4>
              <div class="chart-symbol">${company.symbol} • ${company.sector}</div>
            </div>
            <div>
              <div class="chart-price">$${data.price.toFixed(2)}</div>
              <div class="chart-change ${changeClass}">
                ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} (${data.changePercent})
              </div>
            </div>
          </div>
          <div class="chart-container">
            <canvas id="chart-${name}"></canvas>
          </div>
        </div>
      `;
    }).join('');

    $('#chartsGrid').html(html);

    setTimeout(() => {
      this.watchlist.forEach(name => {
        TechStock.Charts.create(name, `chart-${name}`);
      });
    }, 150);
  },

  updateStats() {
    let total = 0, gainers = 0, losers = 0, totalVol = 0;
    
    Object.values(TechStock.Data.stockData).forEach(data => {
      if (data && typeof data.change === 'number') {
        total++;
        if (data.change > 0) gainers++;
        if (data.change < 0) losers++;
        totalVol += data.volume || 0;
      }
    });

    const avgVol = total > 0 ? Math.round(totalVol / total / 1000000) : 0;

    $('#totalStocks').text(total);
    $('#gainers').text(gainers);
    $('#losers').text(losers);
    $('#avgVol').text(avgVol + 'M');
  },

  addToWatchlist(name) {
    if (!this.watchlist.includes(name)) {
      this.watchlist.push(name);
      this.renderWatchlist();
      this.renderTable();
      this.renderCharts();
    }
  },

  removeFromWatchlist(name) {
    const index = this.watchlist.indexOf(name);
    if (index > -1) {
      this.watchlist.splice(index, 1);
      TechStock.Charts.destroy(name);
      this.renderWatchlist();
      this.renderTable();
      this.renderCharts();
    }
  },

  showDetails(stockName) {
    const company = TechStock.Data.companies[stockName];
    const data = TechStock.Data.stockData[stockName];
    
    if (!company || !data) {
      alert('Stock data not found for: ' + stockName);
      return;
    }

    const changeClass = data.change >= 0 ? 'positive' : 'negative';
    const changeIcon = data.change >= 0 ? '▲' : '▼';
    const inWatchlist = this.watchlist.includes(stockName);

    $('#modalTitle').html(`${stockName} (${company.symbol}) - Stock Details`);

    const modalContent = `
      <div class="stock-details-container">
        <div class="price-overview">
          <div class="current-price">
            <h2>$${data.price.toFixed(2)}</h2>
            <div class="price-change ${changeClass}">
              ${changeIcon} ${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} (${data.changePercent})
            </div>
          </div>
        </div>

        <div class="details-grid">
          <div class="chart-section">
            <h3><i class="fas fa-chart-line"></i> Price Chart</h3>
            <div class="modal-chart-container">
              <canvas id="modalDetailChart"></canvas>
            </div>
          </div>

          <div class="info-section">
            <div class="metrics-grid">
              <div class="metric-card">
                <div class="metric-label">Volume</div>
                <div class="metric-value">${(data.volume || 0).toLocaleString()}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">Market Cap</div>
                <div class="metric-value">${company.marketCap}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">P/E Ratio</div>
                <div class="metric-value">${company.pe}</div>
              </div>
              <div class="metric-card">
                <div class="metric-label">Sector</div>
                <div class="metric-value">${company.sector}</div>
              </div>
            </div>

            <div class="company-info">
              <h3><i class="fas fa-building"></i> Company Information</h3>
              <div class="info-grid">
                <div class="info-row">
                  <span class="info-label">CEO:</span>
                  <span class="info-value">${company.ceo}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Founded:</span>
                  <span class="info-value">${company.founded}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Employees:</span>
                  <span class="info-value">${company.employees}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Last Updated:</span>
                  <span class="info-value">${data.lastUpdated.toLocaleTimeString()}</span>
                </div>
              </div>
              
              <div class="company-description">
                <h4>About ${stockName}</h4>
                <p>${company.description}</p>
              </div>
            </div>

            <div class="modal-actions">
              <button class="btn-action ${inWatchlist ? 'btn-remove-modal' : 'btn-add-modal'}" 
                      onclick="TechStock.UI.${inWatchlist ? 'removeFromWatchlist' : 'addToWatchlist'}('${stockName}'); TechStock.UI.closeModal();">
                <i class="fas ${inWatchlist ? 'fa-star' : 'fa-plus'}"></i>
                ${inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    
    $('#modalBody').html(modalContent);
    $('#stockModal').addClass('show').show();
    
    setTimeout(() => {
      this.createModalChart(stockName, data);
    }, 200);
  },

  // FIXED: Modal chart with working tooltip
  createModalChart(name, data) {
    const canvas = document.getElementById('modalDetailChart');
    if (!canvas || !data.history) return;
    
    const ctx = canvas.getContext('2d');
    const color = data.change >= 0 ? '#10b981' : '#ef4444';
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 250);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '00');
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.history.map(h => h.time),
        datasets: [{
          label: `${name} Price`,
          data: data.history.map(h => h.price),
          borderColor: color,
          backgroundColor: gradient,
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 2, // CHANGED: Show points for better hover
          pointHoverRadius: 8, // INCREASED: Bigger hover area
          pointBackgroundColor: color,
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3
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
          intersect: false, // IMPORTANT: Allow hover anywhere on vertical line
          mode: 'index'     // IMPORTANT: Show tooltip for nearest point
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true, // ENSURE it's enabled
            backgroundColor: 'rgba(26, 31, 53, 0.95)',
            titleColor: '#e6e8ef',
            bodyColor: '#e6e8ef',
            borderColor: color,
            borderWidth: 2,
            cornerRadius: 8,
            displayColors: false,
            padding: 12,
            titleFont: {
              family: 'Inter',
              size: 14,
              weight: '600'
            },
            bodyFont: {
              family: 'JetBrains Mono',
              size: 13,
              weight: '500'
            },
            callbacks: {
              title: function(context) {
                return `${name} - ${context[0].label}`;
              },
              label: function(context) {
                return `Price: $${context.parsed.y.toFixed(2)}`;
              },
              afterLabel: function(context) {
                // Add volume if available
                const historyItem = data.history[context.dataIndex];
                if (historyItem && historyItem.volume) {
                  return `Volume: ${(historyItem.volume / 1000000).toFixed(1)}M`;
                }
                return '';
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            grid: { 
              color: '#2d3748', 
              drawBorder: false 
            },
            ticks: { 
              color: '#6b7280', 
              font: { family: 'JetBrains Mono', size: 10 }
            }
          },
          y: {
            display: true,
            beginAtZero: false,
            grid: { 
              color: '#2d3748', 
              drawBorder: false 
            },
            ticks: {
              color: '#6b7280',
              font: { family: 'JetBrains Mono', size: 10 },
              callback: function(value) {
                return '$' + value.toFixed(0);
              }
            }
          }
        },
        onHover: function(event, elements) {
          // Change cursor to pointer when hovering over data points
          event.native.target.style.cursor = elements.length > 0 ? 'pointer' : 'default';
        }
      }
    });
  },

  exportData() {
    const data = [['Company', 'Symbol', 'Sector', 'Price', 'Change', '%Change', 'Volume', 'Market Cap', 'P/E', 'CEO']];
    
    Object.entries(TechStock.Data.companies).forEach(([name, company]) => {
      const stockData = TechStock.Data.stockData[name];
      if (stockData) {
        data.push([
          name, company.symbol, company.sector, stockData.price.toFixed(2),
          stockData.change.toFixed(2), stockData.changePercent, stockData.volume || 0, 
          company.marketCap, company.pe, company.ceo
        ]);
      }
    });

    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `techstock-data-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  },

  showLoading(message = 'Loading...') {
    $('#loadingText').text(message);
    $('#loadingScreen').show();
  },

  hideLoading() {
    $('#loadingScreen').fadeOut();
  }
};
