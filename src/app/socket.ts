import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const host = "wss://localhost";

export const socketClient = isBrowser ? io(host) : {};
