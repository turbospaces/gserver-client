function Transport(wsToken, connectCallback) {
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
            var def = new $.Deferred();
            var promise = def.promise();

            cmd["headers"] = {
                "correlationID": uid(),
                "sequenceNumber": commands.counter,
                "messageTimestamp": new Date().getTime()
            };
            cmd["debug"] = sessvars.ui.transport.debugOnServer;
            if (sessvars.ui.sessionId) {
                cmd["sessionId"] = sessvars.ui.sessionId;
            }
            var msg = JSON.stringify(cmd);
            if (sessvars.ui.transport.debugOnClient) {
                console.debug("WebSockets[OUT] ==> message(%s)={%s}", cmd.headers.correlationID, msg);
            }
            ws.send(msg);
            commands.correlation[cmd.headers.correlationID] = def;
            commands.counter++;

            return promise;
        };
    })(this.commands, this.ws);
    this.getRoulettePositionsInfo = function () {
        var cmd = {
            "qualifier": "gserver.games.roulette.GetRoulettePositionInfoCommand",
            "gserver.games.roulette.GetRoulettePositionInfoCommand.cmd": {}
        };
        return sendAsync(cmd);
    };
    this.geti18n = function (locale, keys) {
        var cmd = {
            "qualifier": "gserver.Geti18nMessagesCommand",
            "gserver.Geti18nMessagesCommand.cmd": {
                "locale": locale,
                "keys": keys
            }
        };
        return sendAsync(cmd);
    };
    this.login = function (wsToken) {
        var cmd = {
            "qualifier": "gserver.LoginCommand",
            "gserver.LoginCommand.cmd": {
                "protocolVersion": {
                    "major": 0,
                    "minor": 1
                },
                "token": wsToken.token,
                "lang": window.navigator.language,
                "clientPlatform": window.navigator.userAgent
            }
        };
        sendAsync(cmd);
    };
    this.openGamePlay = function (gameId) {
        var cmd = {
            "qualifier": "gserver.OpenGamePlayCommand",
            "gserver.OpenGamePlayCommand.cmd": {
                "gameId": gameId
            }
        };
        var promise = sendAsync(cmd);
        promise.done(function (reply) {
            var replyCmd = reply["gserver.OpenGamePlayReply.cmd"];
            sessvars.ui.sessionId = replyCmd.sessionId;
            sessvars.ui.game.id = gameId;
            sessvars.ui.game.betLimits = replyCmd.betLimits;
            sessvars.ui.game.coins = replyCmd.coins;
            sessvars.ui.user.balance = replyCmd.balance;
            sessvars.ui.user.displayName = replyCmd.displayName;
        });
        return promise;
    };
    this.ws.onopen = function () {
        connectCallback()
    };
    this.ws.onclose = function () {
    };
    this.ws.onmessage = (function (commands) {
        return function (event) {
            try {
                var msg = JSON.parse(event.data);
                var correlationID = msg.headers.correlationID;
                console.trace("WebSockets[IN] <== %s", event.data);

                if (commands.correlation.hasOwnProperty(correlationID)) {
                    var def = commands.correlation[correlationID];
                    delete commands.correlation[correlationID];

                    if (msg.qualifier.indexOf('Exception') != -1) {
                        console.warn("received ws fault(%s)=%s", correlationID, event.data);
                        def.reject(msg);
                    } else {
                        if (sessvars.ui.transport.debugOnClient) {
                            console.debug("received ws message(%s)=%s", correlationID, event.data);
                        }
                        def.resolve(msg);
                    }
                }
            } catch (err) {
                console.error(err);
                //sessvars.ui.serverFault(err);
            }
        }
    })(this.commands);
}