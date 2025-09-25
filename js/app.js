// Main Application
TechStock.App = {
  isUpdating: false,

  async init() {
    try {
      TechStock.UI.showLoading('Initializing Terminal...');
      
      // Initialize modules
      TechStock.Data.init();
      TechStock.Charts.init();
      TechStock.UI.init();
      
      TechStock.UI.hideLoading();
      
      // Start background updates
      setTimeout(() => this.updateAll(), 3000);
      setInterval(() => {
        if (!this.isUpdating) this.updateAll();
      }, TechStock.UPDATE_INTERVAL);
      
    } catch (error) {
      console.error('App initialization failed:', error);
      TechStock.UI.hideLoading();
    }
  },

  async updateAll() {
    if (this.isUpdating) return;
    
    this.isUpdating = true;
    $('#marketStatus').text('UPDATING');
    
    try {
      let completed = 0;
      const total = Object.keys(TechStock.Data.companies).length;
      
      for (const [name, company] of Object.entries(TechStock.Data.companies)) {
        await TechStock.Data.fetchStock(name, company.symbol);
        completed++;
        
        // Update UI progressively
        if (TechStock.UI.watchlist.includes(name)) {
          TechStock.Charts.update(name);
        }
        
        if (completed % 3 === 0) {
          TechStock.UI.renderWatchlist();
          TechStock.UI.renderTable();
          TechStock.UI.updateStats();
        }
        
        // Rate limiting
        if (completed < total) {
          await this.sleep(TechStock.API_DELAY);
        }
      }
      
      // Final render
      TechStock.UI.renderAll();
      TechStock.Data.cache();
      
      $('#marketStatus').text('LIVE');
      
    } catch (error) {
      console.error('Update failed:', error);
      $('#marketStatus').text('ERROR');
    } finally {
      this.isUpdating = false;
    }
  },

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

// Initialize app when DOM is ready
$(document).ready(() => {
  TechStock.App.init();
});
