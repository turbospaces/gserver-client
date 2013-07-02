var socket = new WebSocket("ws://localhost:8190/websockets");
var sessionID = null;
var counter = 0;
var corr = {};

socket.onopen = function () {
    login();
};
socket.onclose = function () {
};

socket.onmessage = function (event) {
    var msg = JSON.parse(event.data);
    var correlationID = msg.headers.correlationID;
    if (corr.hasOwnProperty(correlationID)) {
        var callback = corr[correlationID];
        delete corr.correlationID;

        console.debug("received ws message(%s)=%s", correlationID, event.data);
        callback(msg);
    }
};

function login() {
    var cmd = {
        "qualifier": "gserver.LoginCommand",
        "gserver.LoginCommand.cmd": {
            "playerId": "playerX",
            "credentials": "tokenX",
            "lang": window.navigator.language,
            "clientPlatform": window.navigator.userAgent
        }
    };
    var replyCallback = function (reply) {
        openGamePlay('RouletteGame');
    };
    send(cmd, replyCallback);
}

function openGamePlay(gameId) {
    console.info("opening game play, game=%s", gameId);
    var cmd = {
        "qualifier": "gserver.OpenGamePlayCommand",
        "gserver.OpenGamePlayCommand.cmd": {
            "gameId": gameId
        }
    };
    var replyCallback = function (reply) {
        sessionID = reply["gserver.OpenGamePlayReply.cmd"].sessionId;
        console.info(
            "Session(%s) created for game=%s",
            sessionID,
            cmd["gserver.OpenGamePlayCommand.cmd"].gameId
        );
    };
    send(cmd, replyCallback);
}

function send(cmd, callback) {
    var c = counter;
    cmd["headers"] = {
        "correlationID": "corr-" + c,
        "sequenceNumber": c,
        "messageTimestamp": new Date().getTime()
    };
    cmd["protocolVersion"] = "0.1";
    cmd["debug"] = true;

    if (sessionID != null) {
        cmd["headers"]["sessionId"] = sessionID;
    }

    counter++;
    var msg = JSON.stringify(cmd);
    console.debug("sending ws message(%s)={%s}", cmd.headers.correlationID, msg);
    socket.send(msg);
    corr[cmd.headers.correlationID] = callback;
}

