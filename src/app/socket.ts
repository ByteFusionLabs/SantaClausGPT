import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const host = "http://localhost:3000";

export const socketClient = isBrowser ? io(host) : {};
