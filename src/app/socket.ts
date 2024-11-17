import { io, Socket } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const host = isBrowser
    ? (process.env.NEXT_PUBLIC_WEBSOCKET_DOMAIN
        ? `wss://${process.env.NEXT_PUBLIC_WEBSOCKET_DOMAIN}`
        : "ws://localhost:3000") // Use ws:// for local, wss:// for production
    : "";

export const socketClient: Socket | null = isBrowser ? io(host, { transports: ['websocket'] }) : null;
