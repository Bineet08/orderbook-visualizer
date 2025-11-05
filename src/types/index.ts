export interface Trade {
    id: string;
    price: string;
    quantity: string;
    time: number;
    isBuyerMaker: boolean;
  }
  
  export interface OrderBookLevel {
    price: string;
    quantity: string;
  }
  
  export interface ProcessedOrderBookLevel {
    price: string;
    quantity: string;
    total: number;
  }
  
  export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected';