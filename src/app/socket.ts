import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const host = "https://localhost:3000";

export const socketClient = isBrowser ? io(host) : {};
