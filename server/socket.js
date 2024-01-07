// const { Server } = require("socket.io");

// let io;

// const init = (server) => {
//     io = new Server(server, {
//         cors: {
//             origin: "http://localhost:3000",
//             methods: ["GET", "POST"]
//         },
//         transports: ['websocket'],
//     });

//     io.on('connection', (socket) => {
//         console.log('a user connected');

//         socket.on('disconnect', () => {
//             console.log('user disconnected');
//         });

//         // Additional socket event listeners 
//     });

//     return io;
// };

// const getIo = () => {
//     if (!io) {
//         throw new Error("Socket.io not initialized!");
//     }
//     return io;
// };

// module.exports = { init, getIo };
