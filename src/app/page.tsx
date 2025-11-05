'use client';

import { useState } from 'react';
import { useBinanceSocket } from '@/hooks/useBinanceSocket';
import { OrderBook } from '@/components/OrderBook/OrderBook';
import { RecentTrades } from '@/components/RecentTrades/RecentTrades';
import { Header } from '@/components/Header/Header';

export default function Home() {
  const [symbol, setSymbol] = useState('btcusdt');
  const { trades, connectionStatus } = useBinanceSocket(symbol);

  return (
    <main className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-7xl mx-auto">
        <Header
          symbol={symbol}
          setSymbol={setSymbol}
          connectionStatus={connectionStatus}
        />
        <div className="flex gap-4">
          <OrderBook />
          <RecentTrades trades={trades} />
        </div>
      </div>
    </main>
  );
}