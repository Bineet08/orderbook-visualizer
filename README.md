# Real-Time Order Book Visualizer

A high-performance, real-time stock order book visualizer built with Next.js, TypeScript, and Binance WebSocket API.

**[View Live Application](https://orderbook-visualizer-vercel.vercel.app/)**

## 🚀 Features

- **Real-time Order Book**: Live bid/ask updates with depth visualization
- **Recent Trades**: 50 most recent trades with flash highlighting
- **Multiple Trading Pairs**: Switch between BTC/USDT, ETH/USDT, BNB/USDT, SOL/USDT
- **Performance Optimized**: Uses Zustand for state management and React.memo for optimal rendering
- **Auto-reconnection**: Automatic WebSocket reconnection on disconnect

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **API**: Binance WebSocket API

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Bineet08/orderbook-visualizer
cd orderbook-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
orderbook-visualizer/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Main page
│   │   └── globals.css      # Global styles
│   ├── components/          # React components
│   │   ├── OrderBook/       # Order book components
│   │   ├── RecentTrades/    # Trade list components
│   │   └── Header/          # Header component
│   ├── hooks/               # Custom hooks
│   │   └── useBinanceSocket.ts
│   ├── store/               # Zustand stores
│   │   └── orderBookStore.ts
│   └── types/               # TypeScript types
│       └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 🎯 Design Decisions

### State Management: Zustand
- Minimal boilerplate compared to Redux
- Excellent performance for high-frequency updates
- Small bundle size (~1KB)

### Data Structure: Map for Order Book
- O(1) time complexity for price level updates
- Efficient handling of thousands of price levels
- Easy to add/remove/update individual levels

### Performance Optimizations
1. **React.memo**: All list components memoized to prevent unnecessary re-renders
2. **useMemo**: Computed values (sorted lists, totals, spread) cached
3. **Sliced displays**: Only show top 15 levels to reduce DOM operations
4. **Batched updates**: WebSocket updates processed efficiently

### WebSocket Management
- Separate connections for depth and trades
- Auto-reconnection with 3-second delay
- Proper cleanup on unmount
- Connection status indicator

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel will auto-detect Next.js and deploy

### Build for Production

```bash
npm run build
npm start
```

## 📚 API Documentation

This project uses the Binance WebSocket API:

- **Depth Stream**: `wss://stream.binance.com:9443/ws/{symbol}@depth@100ms`
- **Aggregate Trades**: `wss://stream.binance.com:9443/ws/{symbol}@aggTrade`

Documentation: [https://binance-docs.github.io/apidocs/spot/en/](https://binance-docs.github.io/apidocs/spot/en/)

## 🎓 Performance Features

- **Efficient Updates**: Map-based data structure for O(1) price level updates
- **Memoization**: React.memo on all list components
- **Computed Values**: useMemo for sorted data and calculations
- **Minimal Re-renders**: Zustand ensures only affected components update
- **Optimized Display**: Limited to top 15 levels to reduce DOM operations


## 👨‍💻 Author

Bineet Gupta
```

---

## 🎯 Quick Setup Commands

```bash
# Create project (if starting from scratch)
npx create-next-app@latest orderbook-visualizer --typescript --tailwind --app

# Navigate to project
cd orderbook-visualizer

# Install Zustand
npm install zustand

# Run development server
npm run dev
```

## ✅ Checklist

- [ ] Copy all 18 files to their respective locations
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Test with multiple trading pairs
- [ ] Deploy to Vercel
- [ ] Submit assignment

Your application will be running at `http://localhost:3000`
