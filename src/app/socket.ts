import { io, Socket } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const host = isBrowser
    ? process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:3000" // Fallback for local development
    : "";

export const socketClient: Socket | null = isBrowser ? io(host, { transports: ['websocket'] }) : null;
