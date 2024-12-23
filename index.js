const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

// Create the app and server
const app = express();
app.use(cors({
    origin: '*' // Allow only the client with entering the url of client
}));
const server = http.createServer(app);
const io = socketIO(server);

app.get("/", (req, res) => {
    res.send("Server is running.");
});

// Handle new socket connections
io.on('connection', (socket) => {

    // Handle incoming audio stream
    socket.on('audioStream', (audioData) => {
        socket.broadcast.emit('audioStream', audioData);
    });

    socket.on('disconnect', () => {
    });
});

// Start the server
const port = process.env.PORT || 8001;
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});