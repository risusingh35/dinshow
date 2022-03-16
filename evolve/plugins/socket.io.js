import io from 'socket.io-client'
const socket = io(process.env.EVOLVE_WS_URL); //process.env.EVOLVE_WS_URL
console.log("Socket Connection Called...");


socket.on('connect', function () {
	console.log("Socket Connected..");
});
//socket.on('event', function (data){});
socket.on('disconnect', function () {
	console.log("Socket Disconnected..");
});

export default socket