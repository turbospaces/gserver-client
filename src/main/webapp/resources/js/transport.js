function Transport(wsToken) {
    this.commands = {counter: 1, correlation: {}};
    this.ws = new WebSocket(wsToken.url);

    function uid() {
        var d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
    }

    var sendAsync = (function (commands, ws) {
        return function (cmd) {
            var msg = JSON.stringify(cmd);
            var def = new $.Deferred();
            var promise = def.promise();

            cmd["headers"] = {
                "correlationID": uid(),
                "sequenceNumber": commands.counter,
                "messageTimestamp": new Date().getTime()
            };
            cmd["protocolVersion"] = "0.1";
            cmd["debug"] = sessvars.ui.transport.debugOnServer;
            if (sessvars.ui.sessionId != null) {
                cmd["headers"]["sessionId"] = sessvars.ui.sessionId;
            }
            if (sessvars.ui.transport.debugOnClient) {
                console.debug("sending ws message(%s)={%s}", cmd.headers.correlationID, msg);
            }
            ws.send(msg);
            commands.correlation[cmd.headers.correlationID] = promise;
            commands.counter++;

            return promise;
        }
    })(this.commands, this.ws);
    this.getI18n = function(keys, callback) {};
    this.login = function (wsToken) {
        var cmd = {
            "qualifier": "gserver.LoginCommand",
            "gserver.LoginCommand.cmd": {
                "token": wsToken.token,
                "lang": window.navigator.language,
                "clientPlatform": window.navigator.userAgent
            }
        };
        return sendAsync(cmd, callback);
    };
    this.openGamePlay = function (gameId) {
        var cmd = {
            "qualifier": "gserver.OpenGamePlayCommand",
            "gserver.OpenGamePlayCommand.cmd": {
                "gameId": gameId
            }
        };
        var promise = sendAsync(cmd);
        promise.done(function(reply) {
            var replyCmd = reply["gserver.OpenGamePlayReply.cmd"];
            sessvars.ui.sessionId = replyCmd.sessionId;
            sessvars.ui.game.id = gameId;
            sessvars.ui.game.betLimits = replyCmd.betLimits;
            sessvars.ui.game.coins = replyCmd.coins;
        });
        return promise;
    };
    this.ws.onopen = function () {};
    this.ws.onclose = function () {};
    this.ws.onmessage = (function (commands) {
        return function (event) {
            var msg = JSON.parse(event.data);
            var correlationID = msg.headers.correlationID;

            if (commands.correlation.hasOwnProperty(correlationID)) {
                var promise = commands.correlation[correlationID];
                delete commands.correlation[correlationID];

                if (sessvars.ui.transport.debugOnClient) {
                    console.debug("received ws message(%s)=%s", correlationID, event.data);
                }
                promise.resolve(msg);
            }
        }
    })(this.commands);
}