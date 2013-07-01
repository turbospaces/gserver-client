var socket = new WebSocket("ws://localhost:8190/websockets");

socket.onopen = function () {
    login();
};
socket.onclose = function () {};

function login() {
    var loginCmd = {
        "qualifier": "gserver.LoginCommand",
        "headers": {
            "correlationID": "correlation-1",
            "sequenceNumber": 1,
            "messageTimestamp": new Date().getTime()
        },
        "protocolVersion": "0.1",
        "debug": true,
        "gserver.LoginCommand.cmd": {
            "playerId": "playerX",
            "credentials": "tokenX",
            "clientPlatform": "html5"
        }
    };
    socket.send(JSON.stringify(loginCmd));
}

