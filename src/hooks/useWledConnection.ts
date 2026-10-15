import {useCallback, useEffect, useRef, useState} from 'react';

const RECONNECT_DELAY = 1000;

export function useWledConnection() {
  const socketRef = useRef<WebSocket | null>(null);
  const disposeRef = useRef<() => void>(() => {});
  const [status, setStatus] = useState({
    connecting: false,
    connected: false,
    error: false,
  });
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => () => disposeRef.current(), []);

  const connect = useCallback((ip: string) => {
    disposeRef.current();
    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let socket: WebSocket | null = null;

    disposeRef.current = () => {
      disposed = true;
      clearTimeout(timer);
      socket?.close();
      socketRef.current = null;
    };

    function scheduleReconnect() {
      if (disposed || timer !== undefined) return;
      timer = setTimeout(() => {
        timer = undefined;
        open();
      }, RECONNECT_DELAY);
    }

    function open() {
      if (disposed) return;
      setStatus((current) => ({
        ...current,
        connecting: true,
        connected: false,
      }));
      try {
        const currentSocket = new WebSocket(`ws://${ip}/ws`);
        socket = currentSocket;
        socketRef.current = currentSocket;
        const isCurrent = () => !disposed && socket === currentSocket;
        currentSocket.addEventListener('open', () => {
          if (isCurrent()) setStatus({connecting: false, connected: true, error: false});
        });
        currentSocket.addEventListener('message', (event) => {
          if (!isCurrent()) return;
          try {
            const data = JSON.parse(event.data);
            if (Number.isInteger(data?.info?.leds?.count)) setCount(data.info.leds.count);
            setStarted(true);
          } catch {
            // Ignore non-JSON messages; WLED can also stream binary live-view frames.
          }
        });
        currentSocket.addEventListener('error', () => {
          if (!isCurrent()) return;
          setStatus({connecting: false, connected: false, error: true});
          currentSocket.close();
          scheduleReconnect();
        });
        currentSocket.addEventListener('close', () => {
          if (!isCurrent()) return;
          setStatus((current) => ({
            ...current,
            connecting: false,
            connected: false,
          }));
          scheduleReconnect();
        });
      } catch {
        setStatus({connecting: false, connected: false, error: true});
        scheduleReconnect();
      }
    }
    open();
  }, []);

  const send = useCallback((command: unknown) => {
    const socket = socketRef.current;
    if (socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify(command));
  }, []);

  return {...status, count, started, connect, send};
}
