import { io, Socket } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const host = isBrowser
    ? (process.env.NEXT_PUBLIC_WEBSOCKET_DOMAIN
        ? `wss://${process.env.NEXT_PUBLIC_WEBSOCKET_DOMAIN}`
        : "ws://localhost:3000") // Use ws:// for local, wss:// for production
    : "";

console.info("isBrowser: ", isBrowser);
console.info("Host: ", host);
console.info("process.env.NEXT_PUBLIC_WEBSOCKET_DOMAIN: ", process.env.NEXT_PUBLIC_WEBSOCKET_DOMAIN);

export const socketClient: Socket | null = isBrowser ? io(host, { transports: ['websocket'] }) : null;
