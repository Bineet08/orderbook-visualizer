import { create } from 'zustand';

interface OrderBookStore {
  bids: Map<string, string>;
  asks: Map<string, string>;
  updateBids: (updates: [string, string][]) => void;
  updateAsks: (updates: [string, string][]) => void;
  reset: () => void;
}

export const useOrderBookStore = create<OrderBookStore>((set) => ({
  bids: new Map(),
  asks: new Map(),
  updateBids: (updates) =>
    set((state) => {
      const newBids = new Map(state.bids);
      updates.forEach(([price, quantity]) => {
        if (quantity === '0.00000000' || parseFloat(quantity) === 0) {
          newBids.delete(price);
        } else {
          newBids.set(price, quantity);
        }
      });
      return { bids: newBids };
    }),
  updateAsks: (updates) =>
    set((state) => {
      const newAsks = new Map(state.asks);
      updates.forEach(([price, quantity]) => {
        if (quantity === '0.00000000' || parseFloat(quantity) === 0) {
          newAsks.delete(price);
        } else {
          newAsks.set(price, quantity);
        }
      });
      return { asks: newAsks };
    }),
  reset: () => set({ bids: new Map(), asks: new Map() }),
}));