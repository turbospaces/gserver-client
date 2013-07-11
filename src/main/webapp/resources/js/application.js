var ui = {
    sessionID: null,
    transport: {
        commands: {
            counter: 0,
            correlation: {}
        },
        ws: null,
        init: function (serverURL) {
            ui.transport.ws = new WebSocket('ws://' + serverURL + '/websockets');
            ui.transport.ws.onopen = function () {
                var cookie = $.cookie('SPRING_SECURITY_REMEMBER_ME_COOKIE');
                login(cookie);
            };
            ui.transport.ws.onclose = function () {
            };
            ui.transport.ws.onmessage = function (event) {
                var msg = JSON.parse(event.data);
                var correlationID = msg.headers.correlationID;

                if (ui.transport.commands.correlation.hasOwnProperty(correlationID)) {
                    var callback = ui.transport.commands.correlation[correlationID];
                    delete ui.transport.commands.correlation[correlationID];

                    console.debug("received ws message(%s)=%s", correlationID, event.data);
                    callback(msg);
                }
            };
        },
        sendAsync: function (cmd, callback) {
            var c = ui.transport.commands.counter;
            cmd["headers"] = {
                "correlationID": "corr-" + c,
                "sequenceNumber": c,
                "messageTimestamp": new Date().getTime()
            };
            cmd["protocolVersion"] = "0.1";
            cmd["debug"] = true;

            if (ui.sessionID != null) {
                cmd["headers"]["sessionId"] = ui.sessionID;
            }

            ui.transport.commands.counter++;
            var msg = JSON.stringify(cmd);
            console.debug("sending ws message(%s)={%s}", cmd.headers.correlationID, msg);
            ui.transport.ws.send(msg);
            ui.transport.commands.correlation[cmd.headers.correlationID] = callback;
        }
    }
}
