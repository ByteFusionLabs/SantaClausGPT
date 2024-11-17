import { io, Socket } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const host = isBrowser
    ? (process.env.RAILWAY_PUBLIC_DOMAIN
        ? `wss://${process.env.RAILWAY_PUBLIC_DOMAIN}`
        : "ws://localhost:3000") // Use ws:// for local, wss:// for production
    : "";

console.info("isBrowser: ", isBrowser);
console.info("Host: ", host);
console.info("process.env.RAILWAY_PUBLIC_DOMAIN: ", process.env.RAILWAY_PUBLIC_DOMAIN);

export const socketClient: Socket | null = isBrowser ? io(host, { transports: ['websocket'] }) : null;
