'use client';

import React, { useState, useEffect } from 'react';
import { TradeRow } from './TradeRow';
import type { Trade } from '@/types';

interface RecentTradesProps {
  trades: Trade[];
}

export const RecentTrades = React.memo<RecentTradesProps>(({ trades }) => {
  const [newTradeId, setNewTradeId] = useState<string | null>(null);

  useEffect(() => {
    if (trades.length > 0) {
      setNewTradeId(trades[0].id);
      const timeout = setTimeout(() => setNewTradeId(null), 300);
      return () => clearTimeout(timeout);
    }
  }, [trades]);

  return (
    <div className="w-80 bg-gray-900 rounded-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Recent Trades</h2>
      <div className="flex justify-between px-3 mb-2 text-xs text-gray-500 font-semibold">
        <span>Price</span>
        <span>Amount</span>
        <span>Time</span>
      </div>
      <div className="space-y-0.5 max-h-[600px] overflow-y-auto">
        {trades.map((trade) => (
          <TradeRow
            key={trade.id}
            trade={trade}
            isNew={trade.id === newTradeId}
          />
        ))}
      </div>
    </div>
  );
});

RecentTrades.displayName = 'RecentTrades';