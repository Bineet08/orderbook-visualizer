'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useOrderBookStore } from '@/store/orderBookStore';
import type { Trade, ConnectionStatus } from '@/types';

export const useBinanceSocket = (symbol: string) => {
  const { updateBids, updateAsks, reset } = useOrderBookStore();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('connecting');
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const depthWsRef = useRef<WebSocket | null>(null);
  const tradesWsRef = useRef<WebSocket | null>(null);
  const isUnmountedRef = useRef(false);

  const connect = useCallback(() => {
    try {
      //Depth WebSocket
      const depthWs = new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@depth@100ms`
      );
      depthWsRef.current = depthWs;

      depthWs.onopen = () => {
        console.log('Depth WebSocket connected');
        setConnectionStatus('connected');
      };

      depthWs.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.b && data.a) {
            updateBids(data.b);
            updateAsks(data.a);
          }
        } catch (e) {
          console.error('Depth message parse error:', e);
        }
      };

      depthWs.onerror = (error) => {
        console.error('Depth WebSocket error:', error);
        if (!isUnmountedRef.current) setConnectionStatus('disconnected');
      };

      depthWs.onclose = () => {
        console.log('Depth WebSocket closed');
        if (!isUnmountedRef.current) {
          setConnectionStatus('disconnected');
          if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = setTimeout(() => connect(), 3000);
        }
      };

      //Trades WebSocket
      const tradesWs = new WebSocket(
        `wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@aggTrade`
      );
      tradesWsRef.current = tradesWs;

      tradesWs.onopen = () => {
        console.log('Trades WebSocket connected');
      };

      tradesWs.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          const newTrade: Trade = {
            id: data.a.toString(),
            price: data.p,
            quantity: data.q,
            time: data.T,
            isBuyerMaker: data.m,
          };
          setTrades((prev) => [newTrade, ...prev].slice(0, 50));
        } catch (e) {
          console.error('Trade message parse error:', e);
        }
      };

      tradesWs.onerror = (error) => {
        console.error('Trades WebSocket error:', error);
      };

      tradesWs.onclose = () => {
        console.log('Trades WebSocket closed');
      };
    } catch (error) {
      console.error('Connection error:', error);
      setConnectionStatus('disconnected');
      reconnectTimeoutRef.current = setTimeout(() => connect(), 3000);
    }
  }, [symbol, updateBids, updateAsks]);

  useEffect(() => {
    // mark mounted before connecting
    isUnmountedRef.current = false;
    connect();

    return () => {
      isUnmountedRef.current = true;

      if (depthWsRef.current) {
        depthWsRef.current.onclose = null as unknown as () => void;
        depthWsRef.current.close();
      }

      if (tradesWsRef.current) {
        tradesWsRef.current.onclose = null as unknown as () => void;
        tradesWsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      reset();
    };
  }, [connect, reset]);

  return { trades, connectionStatus };
};
