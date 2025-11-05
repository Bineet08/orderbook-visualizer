'use client';

import React from 'react';
import type { ConnectionStatus } from '@/types';

interface HeaderProps {
  symbol: string;
  setSymbol: (symbol: string) => void;
  connectionStatus: ConnectionStatus;
}

export const Header: React.FC<HeaderProps> = ({
  symbol,
  setSymbol,
  connectionStatus,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Order Book Visualizer
        </h1>
        <p className="text-gray-400 mt-1">Real-time Binance market data</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected'
                ? 'bg-green-500'
                : connectionStatus === 'connecting'
                ? 'bg-yellow-500 animate-pulse'
                : 'bg-red-500'
            }`}
          />
          <span className="text-sm text-gray-400 capitalize">
            {connectionStatus}
          </span>
        </div>
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
        >
          <option value="btcusdt">BTC/USDT</option>
          <option value="ethusdt">ETH/USDT</option>
          <option value="bnbusdt">BNB/USDT</option>
          <option value="solusdt">SOL/USDT</option>
        </select>
      </div>
    </div>
  );
};