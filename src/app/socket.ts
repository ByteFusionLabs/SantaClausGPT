import { io } from "socket.io-client";

const isBrowser = typeof window !== "undefined";
const host = "https://santaclausgpt-production.up.railway.app:3000";

export const socketClient = isBrowser ? io(host) : {};
