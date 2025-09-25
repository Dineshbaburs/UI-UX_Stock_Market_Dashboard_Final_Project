// Stock Data Management with More Diverse Companies
TechStock.Data = {
  companies: {
    // Technology
    "Apple": {
      symbol: "AAPL", sector: "Technology", marketCap: "3.0T", pe: 29.2,
      employees: "164,000", ceo: "Tim Cook", founded: "1976",
      description: "Apple Inc. designs and manufactures consumer electronics, software, and online services."
    },
    "Microsoft": {
      symbol: "MSFT", sector: "Technology", marketCap: "2.8T", pe: 28.1,
      employees: "228,000", ceo: "Satya Nadella", founded: "1975",
      description: "Microsoft Corporation develops and supports software, services, devices, and solutions."
    },
    "Alphabet": {
      symbol: "GOOGL", sector: "Technology", marketCap: "1.7T", pe: 23.4,
      employees: "183,323", ceo: "Sundar Pichai", founded: "1998",
      description: "Alphabet Inc. operates as a holding company for Google and other subsidiaries."
    },
    "NVIDIA": {
      symbol: "NVDA", sector: "Technology", marketCap: "1.2T", pe: 63.2,
      employees: "29,600", ceo: "Jensen Huang", founded: "1993",
      description: "NVIDIA Corporation operates as a computing company specializing in graphics processors."
    },
    "Meta": {
      symbol: "META", sector: "Technology", marketCap: "750B", pe: 24.7,
      employees: "67,317", ceo: "Mark Zuckerberg", founded: "2004",
      description: "Meta Platforms, Inc. develops products for connecting and sharing through mobile devices."
    },
    "Netflix": {
      symbol: "NFLX", sector: "Technology", marketCap: "180B", pe: 35.1,
      employees: "12,800", ceo: "Ted Sarandos", founded: "1997",
      description: "Netflix, Inc. provides entertainment services through streaming television series and films."
    },
    "Intel": {
      symbol: "INTC", sector: "Technology", marketCap: "150B", pe: 18.5,
      employees: "124,800", ceo: "Pat Gelsinger", founded: "1968",
      description: "Intel Corporation designs and manufactures microprocessors and other semiconductor components."
    },
    "Adobe": {
      symbol: "ADBE", sector: "Technology", marketCap: "220B", pe: 42.1,
      employees: "28,000", ceo: "Shantanu Narayen", founded: "1982",
      description: "Adobe Inc. provides digital media and marketing solutions worldwide."
    },

    // Healthcare
    "Johnson & Johnson": {
      symbol: "JNJ", sector: "Healthcare", marketCap: "420B", pe: 15.2,
      employees: "152,700", ceo: "Joaquin Duato", founded: "1886",
      description: "Johnson & Johnson researches and develops healthcare products worldwide."
    },
    "Pfizer": {
      symbol: "PFE", sector: "Healthcare", marketCap: "280B", pe: 12.8,
      employees: "83,000", ceo: "Albert Bourla", founded: "1849",
      description: "Pfizer Inc. discovers, develops, manufactures, and sells healthcare products worldwide."
    },
    "UnitedHealth": {
      symbol: "UNH", sector: "Healthcare", marketCap: "480B", pe: 22.4,
      employees: "400,000", ceo: "Andrew Witty", founded: "1977",
      description: "UnitedHealth Group provides healthcare coverage and services in the United States."
    },
    "Moderna": {
      symbol: "MRNA", sector: "Healthcare", marketCap: "45B", pe: 8.9,
      employees: "5,000", ceo: "Stéphane Bancel", founded: "2010",
      description: "Moderna, Inc. develops messenger RNA therapeutics and vaccines."
    },

    // Finance
    "JPMorgan Chase": {
      symbol: "JPM", sector: "Finance", marketCap: "450B", pe: 11.8,
      employees: "291,000", ceo: "Jamie Dimon", founded: "2000",
      description: "JPMorgan Chase & Co. operates as a financial services company worldwide."
    },
    "Bank of America": {
      symbol: "BAC", sector: "Finance", marketCap: "280B", pe: 13.2,
      employees: "217,000", ceo: "Brian Moynihan", founded: "1904",
      description: "Bank of America Corporation provides banking and financial products and services worldwide."
    },
    "Goldman Sachs": {
      symbol: "GS", sector: "Finance", marketCap: "120B", pe: 14.5,
      employees: "49,100", ceo: "David Solomon", founded: "1869",
      description: "The Goldman Sachs Group, Inc. provides investment banking, securities, and investment management services."
    },
    "Visa": {
      symbol: "V", sector: "Finance", marketCap: "520B", pe: 32.1,
      employees: "26,500", ceo: "Ryan McInerney", founded: "1958",
      description: "Visa Inc. operates as a payments technology company worldwide."
    },

    // Consumer
    "Amazon": {
      symbol: "AMZN", sector: "Consumer", marketCap: "1.5T", pe: 42.8,
      employees: "1,541,000", ceo: "Andy Jassy", founded: "1994",
      description: "Amazon.com, Inc. operates as an online retailer and cloud computing services provider."
    },
    "Tesla": {
      symbol: "TSLA", sector: "Consumer", marketCap: "800B", pe: 47.3,
      employees: "140,473", ceo: "Elon Musk", founded: "2003",
      description: "Tesla, Inc. designs, manufactures, and sells electric vehicles and energy storage systems."
    },
    "Coca-Cola": {
      symbol: "KO", sector: "Consumer", marketCap: "260B", pe: 24.8,
      employees: "82,500", ceo: "James Quincey", founded: "1892",
      description: "The Coca-Cola Company manufactures, markets, and sells non-alcoholic beverages worldwide."
    },
    "McDonald's": {
      symbol: "MCD", sector: "Consumer", marketCap: "200B", pe: 26.3,
      employees: "200,000", ceo: "Chris Kempczinski", founded: "1940",
      description: "McDonald's Corporation operates and franchises McDonald's restaurants worldwide."
    },
    "Nike": {
      symbol: "NKE", sector: "Consumer", marketCap: "180B", pe: 28.4,
      employees: "83,700", ceo: "John Donahoe", founded: "1964",
      description: "NIKE, Inc. designs, develops, markets, and sells athletic footwear, apparel, equipment, and accessories."
    },

    // Energy
    "ExxonMobil": {
      symbol: "XOM", sector: "Energy", marketCap: "380B", pe: 13.5,
      employees: "62,000", ceo: "Darren Woods", founded: "1999",
      description: "Exxon Mobil Corporation explores for and produces crude oil and natural gas."
    },
    "Chevron": {
      symbol: "CVX", sector: "Energy", marketCap: "320B", pe: 14.2,
      employees: "43,846", ceo: "Mike Wirth", founded: "1879",
      description: "Chevron Corporation engages in integrated energy, chemicals, and petroleum operations worldwide."
    },
    "ConocoPhillips": {
      symbol: "COP", sector: "Energy", marketCap: "140B", pe: 12.8,
      employees: "9,900", ceo: "Ryan Lance", founded: "2002",
      description: "ConocoPhillips explores for, produces, transports, and markets crude oil and natural gas."
    }
  },

  marketIndices: [
    { name: "S&P 500", symbol: "SPX", value: 4185.45, change: 23.14 },
    { name: "NASDAQ", symbol: "IXIC", value: 12847.23, change: -45.67 },
    { name: "DOW", symbol: "DJI", value: 33734.67, change: 156.78 },
    { name: "VIX", symbol: "VIX", value: 18.45, change: -2.34 }
  ],

  stockData: {},
  
  init() {
    this.loadCache() || this.generateDemo();
  },

  loadCache() {
    try {
      const cached = localStorage.getItem('stockData');
      if (cached) {
        const data = JSON.parse(cached);
        if (Date.now() - data.timestamp < TechStock.CACHE_DURATION) {
          this.stockData = data.stocks;
          return true;
        }
      }
    } catch (e) {
      console.log('No cache found');
    }
    return false;
  },

  generateDemo() {
    Object.keys(this.companies).forEach(name => {
      const basePrice = Math.random() * 200 + 100;
      const change = (Math.random() - 0.5) * 20;
      
      this.stockData[name] = {
        price: basePrice,
        change,
        changePercent: ((change / basePrice) * 100).toFixed(2) + '%',
        volume: Math.floor(Math.random() * 10000000) + 1000000,
        history: this.generateHistory(basePrice),
        lastUpdated: new Date()
      };
    });
  },

  generateHistory(basePrice) {
    const history = [];
    const now = Date.now();
    
    for (let i = TechStock.MAX_HISTORY; i >= 0; i--) {
      const timestamp = now - (i * 5 * 60 * 1000);
      const variation = (Math.random() - 0.5) * 10;
      const price = Math.max(10, basePrice + variation);
      
      history.push({
        timestamp,
        price,
        time: new Date(timestamp).toLocaleTimeString('en-US', { 
          hour: '2-digit', minute: '2-digit' 
        })
      });
    }
    
    return history;
  },

  async fetchStock(name, symbol) {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${TechStock.API_KEY}`
      );
      
      const data = await response.json();
      
      if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
        const quote = data["Global Quote"];
        this.updateStock(name, {
          price: parseFloat(quote["05. price"]),
          change: parseFloat(quote["09. change"]),
          changePercent: quote["10. change percent"],
          volume: parseInt(quote["06. volume"]) || 0,
          lastUpdated: new Date()
        });
        return true;
      }
    } catch (error) {
      console.log(`API error for ${name}:`, error);
      this.simulateUpdate(name);
    }
    return false;
  },

  updateStock(name, newData) {
    if (!this.stockData[name]) {
      this.stockData[name] = { history: [] };
    }
    
    Object.assign(this.stockData[name], newData);
    
    const history = this.stockData[name].history;
    history.push({
      timestamp: Date.now(),
      price: newData.price,
      time: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', minute: '2-digit' 
      })
    });
    
    if (history.length > TechStock.MAX_HISTORY) {
      history.shift();
    }
  },

  simulateUpdate(name) {
    const current = this.stockData[name];
    if (!current) return;
    
    const variation = (Math.random() - 0.5) * (current.price * 0.02);
    const newPrice = Math.max(10, current.price + variation);
    const change = newPrice - current.price;
    
    this.updateStock(name, {
      price: newPrice,
      change,
      changePercent: ((change / current.price) * 100).toFixed(2) + '%',
      volume: current.volume + Math.floor((Math.random() - 0.5) * 100000),
      lastUpdated: new Date()
    });
  },

  cache() {
    try {
      localStorage.setItem('stockData', JSON.stringify({
        timestamp: Date.now(),
        stocks: this.stockData
      }));
    } catch (e) {
      console.log('Cache failed');
    }
  }
};
