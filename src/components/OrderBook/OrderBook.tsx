'use client';

import React, { useMemo } from 'react';
import { useOrderBookStore } from '@/store/orderBookStore';
import { OrderBookRow } from './orderBookRow';

export const OrderBook = React.memo(() => {
  const { bids, asks } = useOrderBookStore();

  const sortedBids = useMemo(() => {
    const sorted = Array.from(bids.entries())
      .sort((a, b) => parseFloat(b[0]) - parseFloat(a[0]))
      .slice(0, 15);

    let cumulative = 0;
    return sorted.map(([price, quantity]) => {
      cumulative += parseFloat(quantity);
      return { price, quantity, total: cumulative };
    });
  }, [bids]);

  const sortedAsks = useMemo(() => {
    const sorted = Array.from(asks.entries())
      .sort((a, b) => parseFloat(a[0]) - parseFloat(b[0]))
      .slice(0, 15);

    let cumulative = 0;
    return sorted.map(([price, quantity]) => {
      cumulative += parseFloat(quantity);
      return { price, quantity, total: cumulative };
    });
  }, [asks]);

  const maxBidTotal = useMemo(
    () => Math.max(...sortedBids.map((b) => b.total), 0.01),
    [sortedBids]
  );

  const maxAskTotal = useMemo(
    () => Math.max(...sortedAsks.map((a) => a.total), 0.01),
    [sortedAsks]
  );

  const spread = useMemo(() => {
    if (sortedAsks.length === 0 || sortedBids.length === 0) return 0;
    return parseFloat(sortedAsks[0].price) - parseFloat(sortedBids[0].price);
  }, [sortedAsks, sortedBids]);

  return (
    <div className="flex-1 bg-gray-900 rounded-lg p-4">
      <h2 className="text-xl font-bold text-white mb-4">Order Book</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Bids */}
        <div>
          <div className="flex justify-between px-2 mb-2 text-xs text-gray-500 font-semibold">
            <span>Price</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          {sortedBids.map((bid) => (
            <OrderBookRow
              key={bid.price}
              price={bid.price}
              quantity={bid.quantity}
              total={bid.total}
              maxTotal={maxBidTotal}
              isBid={true}
            />
          ))}
        </div>

        {/* Asks */}
        <div>
          <div className="flex justify-between px-2 mb-2 text-xs text-gray-500 font-semibold">
            <span>Price</span>
            <span>Amount</span>
            <span>Total</span>
          </div>
          {sortedAsks.map((ask) => (
            <OrderBookRow
              key={ask.price}
              price={ask.price}
              quantity={ask.quantity}
              total={ask.total}
              maxTotal={maxAskTotal}
              isBid={false}
            />
          ))}
        </div>
      </div>

      {/* Spread */}
      <div className="mt-4 text-center">
        <div className="text-xs text-gray-500">Spread</div>
        <div className="text-lg font-bold text-yellow-400">
          ${spread.toFixed(2)}
        </div>
      </div>
    </div>
  );
});

OrderBook.displayName = 'OrderBook';