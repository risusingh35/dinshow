
var Evolve = require('../../Boot/Evolve');

module.exports = function (Socket) {

    Socket.on("messageSuccess456", async function (data, responce) {
        console.log("messageSuccess............>>>>>>>>>>>", data)
        await Evolve.Io.emit('messageSuccess123', {
            count: 20
        });
        //responce(await Shiv.Server.Controllers.SocketController.test(Socket, data));
    });

    Socket.on("millingMachineData", async function (data) {
        await Evolve.Server.Controllers.SocketController.reciveMillingData(data)
    });
    Socket.on("vibrationMachineData", async function (data) {
        await Evolve.Server.Controllers.SocketController.reciveVibrationData(data)
    });

    // Socket.on("getPrintTask", async function() {
    //     await Evolve.Server.Controllers.SocketController.getEvolvePrinterTask()
    // });

    // Socket.on("getPrintTaskReceiveStatus", async function(data) {
    //     await Evolve.Server.Controllers.SocketController.getEvolvePrinterTaskReceiveStatus(data)
    // });

    Socket.on("getPrintTaskStatus", async function(data) {
        await Evolve.Server.Controllers.SocketController.getEvolvePrinterTaskStatus(data)
    });

    Socket.on("getPrinterStatus", async function(data) {
        await Evolve.Server.Controllers.SocketController.getPrinterStatus(data)
    });

}