import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Adjust URL if needed

export default socket;
