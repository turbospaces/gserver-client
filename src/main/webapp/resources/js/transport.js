function Transport(wsToken) {
    this.commands = {counter: 0, correlation: {}};
    this.ws = new WebSocket(wsToken.url);

    var sendAsync = (function (commands, ws) {
        return function (cmd, callback) {
            var c = commands.counter;
            cmd["headers"] = {
                "correlationID": "corr-" + c,
                "sequenceNumber": c,
                "messageTimestamp": new Date().getTime()
            };
            cmd["protocolVersion"] = "0.1";
            cmd["debug"] = sessvars.ui.transport.debugOnServer;
            if (sessvars.ui.sessionID != null) {
                cmd["headers"]["sessionId"] = sessvars.ui.sessionID;
            }
            commands.counter++;
            var msg = JSON.stringify(cmd);
            if (sessvars.ui.transport.debugOnClient) {
                console.debug("sending ws message(%s)={%s}", cmd.headers.correlationID, msg);
            }
            ws.send(msg);
            commands.correlation[cmd.headers.correlationID] = callback;
        }
    })(this.commands, this.ws);

    this.login = function (wsToken) {
        var cmd = {
            "qualifier": "gserver.LoginCommand",
            "gserver.LoginCommand.cmd": {
                "token": wsToken.token,
                "lang": window.navigator.language,
                "clientPlatform": window.navigator.userAgent
            }
        };
        sendAsync(cmd, function (reply) {
        });
    };
    this.openGamePlay = function (gameId) {
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
        sendAsync(cmd, replyCallback);
    };
    this.ws.onopen = (function (obj, token) {
        return function () {
            obj.login(token);
        }
    })(this, wsToken);
    this.ws.onclose = function () {
    };
    this.ws.onmessage = (function (commands) {
        return function (event) {
            var msg = JSON.parse(event.data);
            var correlationID = msg.headers.correlationID;

            if (commands.correlation.hasOwnProperty(correlationID)) {
                var callback = commands.correlation[correlationID];
                delete commands.correlation[correlationID];

                if (sessvars.ui.transport.debugOnClient) {
                    console.debug("received ws message(%s)=%s", correlationID, event.data);
                }
                callback(msg);
            }
        }
    })(this.commands);
}