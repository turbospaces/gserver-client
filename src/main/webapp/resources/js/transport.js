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
            return cmd.headers.correlationID;
        }
    })(this.commands, this.ws);

    var sendSync = (function (commands) {
        return function (cmd, callback) {
            var retryPeriod = 100;
            var times = sessvars.ui.transport.operationTimeout / retryPeriod;
            var done = false;

            var proxyCallback = function (reply) {
                done = true;
                callback(reply);
            };
            var corrId = sendAsync(cmd, proxyCallback);

            for (var i = 0; i < times; i++) {
                if (done) break;
                setTimeout(function () {
                    console.debug("[iteration-%s] waiting for server response for command=%s", i, corrId);
                    if (commands.correlation.hasOwnProperty(corrId)) {
                        done = true;
                    }
                }, retryPeriod);
            }
            if (!done) {
                throw "Timeout exception: server didn't respond to command = " + corrId;
            }
        }
    })(this.commands);

    this.login = function (wsToken) {
        var cmd = {
            "qualifier": "gserver.LoginCommand",
            "gserver.LoginCommand.cmd": {
                "token": wsToken.token,
                "lang": window.navigator.language,
                "clientPlatform": window.navigator.userAgent
            }
        };
        sendAsync(cmd, function (reply) {});
    };
    this.openGamePlay = function (gameId) {
        var cmd = {
            "qualifier": "gserver.OpenGamePlayCommand",
            "gserver.OpenGamePlayCommand.cmd": {
                "gameId": gameId
            }
        };
        var replyCallback = function (reply) {
            var replyCmd = reply["gserver.OpenGamePlayReply.cmd"];
            sessvars.ui.sessionId = replyCmd.sessionId;
            sessvars.ui.game.id = gameId;
            sessvars.ui.game.betLimits = replyCmd.betLimits;
            sessvars.ui.game.coins = replyCmd.coins;

            console.info("GamePlay session=%s has been created=%s", sessvars.ui.sessionId, JSON.stringify(sessvars.ui.game));
        };
        sendSync(cmd, replyCallback);
    };
    this.ws.onopen = function() {};
    this.ws.onclose = function() {};
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