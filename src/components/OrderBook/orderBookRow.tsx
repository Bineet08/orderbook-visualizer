'use client';

import React from 'react';

interface OrderBookRowProps{
  price: string;
  quantity: string;
  total: number;
  maxTotal: number;
  isBid: boolean;
}

export const OrderBookRow = React.memo<OrderBookRowProps>(
  ({ price, quantity, total, maxTotal, isBid }) => {
    const percentage = (total / maxTotal) * 100;

    return (
      <div className="relative h-6 flex items-center text-xs font-mono">
        <div
          className={`absolute inset-0 ${
            isBid ? 'bg-green-500/10' : 'bg-red-500/10'
          }`}
          style={{
            width: `${percentage}%`,
            right: isBid ? 0 : 'auto',
            left: isBid ? 'auto' : 0,
          }}
        />
        <div className="relative z-10 flex justify-between w-full px-2">
          <span className={isBid ? 'text-green-400' : 'text-red-400'}>
           {parseFloat(price).toFixed(2)}
          </span>
          <span className="text-gray-300">
           {parseFloat(quantity).toFixed(5)}
          </span>
          <span className="text-gray-400">{total.toFixed(5)}</span>
        </div>
      </div>
    );
  }
);

OrderBookRow.displayName = 'OrderBookRow';