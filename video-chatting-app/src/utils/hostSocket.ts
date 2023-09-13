import { io } from "socket.io-client";

const URL = "http://localhost:3000";

export const hostSocket = io(URL);

hostSocket.on("connect", () => {

})

