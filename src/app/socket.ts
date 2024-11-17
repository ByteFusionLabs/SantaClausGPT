import { io, Socket } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const host = isBrowser
    ? (process.env.RAILWAY_PUBLIC_DOMAIN
        ? `wss://${process.env.RAILWAY_PUBLIC_DOMAIN}`
        : "ws://localhost:3000") // Fallback to local for development
    : ""; // No socket connection on server-side

console.info("Host: ", host)

export const socketClient: Socket | null = isBrowser ? io(host, { transports: ['websocket'] }) : null;
