function login(token) {
    var cmd = {
        "qualifier": "gserver.LoginCommand",
        "gserver.LoginCommand.cmd": {
            "token": token,
            "lang": window.navigator.language,
            "clientPlatform": window.navigator.userAgent
        }
    };
    var replyCallback = function (reply) {};
    sessvars.ui.transport.sendAsync(cmd, replyCallback);
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
        ui.sessionID = reply["gserver.OpenGamePlayReply.cmd"].sessionId;
        console.info(
            "Session(%s) created for game=%s",
            ui.sessionID,
            cmd["gserver.OpenGamePlayCommand.cmd"].gameId
        );
    };
    sessvars.ui.transport.sendAsync(cmd, replyCallback);
}
