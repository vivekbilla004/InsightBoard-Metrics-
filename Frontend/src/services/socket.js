import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL); // replace with your backend URL

export default socket;
