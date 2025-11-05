'use client';

import React from 'react';
import type { Trade } from '@/types';

interface TradeRowProps {
  trade: Trade;
  isNew: boolean;
}

export const TradeRow = React.memo<TradeRowProps>(({ trade, isNew }) => {
  const isBuy = !trade.isBuyerMaker;

  return (
    <div
      className={`flex justify-between px-3 py-1 text-xs font-mono transition-all duration-300 ${
        isNew ? (isBuy ? 'bg-green-500/20' : 'bg-red-500/20') : ''
      }`}
    >
      <span className={isBuy ? 'text-green-400' : 'text-red-400'}>
        {parseFloat(trade.price).toFixed(2)}
      </span>
      <span className="text-gray-300">
        {parseFloat(trade.quantity).toFixed(5)}
      </span>
      <span className="text-gray-500">
        {new Date(trade.time).toLocaleTimeString()}
      </span>
    </div>
  );
});

TradeRow.displayName = 'TradeRow';