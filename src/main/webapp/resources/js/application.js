sessvars.ui = {
    sessionID: null,
    transport: {
        commands: {
            counter: 0,
            correlation: {}
        },
        ws: null,
        init: function (wsToken) {
            this.ws = new WebSocket(wsToken.url);
            this.ws.onopen = function () {
                login(wsToken.token);
            };
            this.ws.onclose = function () {
            };
            this.ws.onmessage = function (event) {
                var msg = JSON.parse(event.data);
                var correlationID = msg.headers.correlationID;

                if (this.commands.correlation.hasOwnProperty(correlationID)) {
                    var callback = this.commands.correlation[correlationID];
                    delete this.commands.correlation[correlationID];

                    console.debug("received ws message(%s)=%s", correlationID, event.data);
                    callback(msg);
                }
            };
        },
        sendAsync: function (cmd, callback) {
            var c = this.commands.counter;
            cmd["headers"] = {
                "correlationID": "corr-" + c,
                "sequenceNumber": c,
                "messageTimestamp": new Date().getTime()
            };
            cmd["protocolVersion"] = "0.1";
            cmd["debug"] = true;

            if (this.sessionID != null) {
                cmd["headers"]["sessionId"] = ui.sessionID;
            }

            this.commands.counter++;
            var msg = JSON.stringify(cmd);
            console.debug("sending ws message(%s)={%s}", cmd.headers.correlationID, msg);
            this.ws.send(msg);
            this.commands.correlation[cmd.headers.correlationID] = callback;
        }
    }
}
