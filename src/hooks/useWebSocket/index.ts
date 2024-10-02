import { useEffect, useRef, useState } from 'react';

const useWebSocket = (url: string) => {
    const [isOpen, setIsOpen] = useState(false);
    const [lastMessage, setLastMessage] = useState<string | null>(null);

    const webSocketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(url);
        webSocketRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            setIsOpen(true); // Set WebSocket to open state
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setIsOpen(false);
        };

        ws.onmessage = (event) => {
            console.log('event data', event);
            setLastMessage(event.data);
          };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close(); // Clean up on unmount
        };
    }, [url]);

    const sendMessage = (message: any) => {
        if (isOpen && webSocketRef.current?.readyState === WebSocket.OPEN) {
            webSocketRef.current.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open, message not sent');
        }
    };

    return { sendMessage ,lastMessage  };
};

export default useWebSocket;
