import { io, Socket } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const host = isBrowser
    ? process.env.NEXT_PUBLIC_SOCKET_HOST || "wss://santaclausgpt-production.up.railway.app" // Replace with your Railway app URL
    : ""; // No socket connection on the server-side

export const socketClient: Socket | null = isBrowser ? io(host, { transports: ['websocket'] }) : null;
