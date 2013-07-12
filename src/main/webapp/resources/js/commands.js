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
    transport.sendAsync(cmd, replyCallback);
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
        var s = reply["gserver.OpenGamePlayReply.cmd"].sessionId;
        sessvars.ui.sessionID = s;
        console.info(
            "Session(%s) created for game=%s",
            s,
            cmd["gserver.OpenGamePlayCommand.cmd"].gameId
        );
    };
    transport.sendAsync(cmd, replyCallback);
}
