sessvars.ui = {
    sessionId: null,
    game: {
        id: null,
        betLimits: null,
        coins: null
    },
    transport: {
        debugOnServer: true,
        debugOnClient: true
    },
    theme: {
        green : '#468847',
        background : '#ddd',
        red : 'red',
        black : 'black',
        white: 'white',
        wheat: 'wheat'
    },
    serverFault: function (reason) {
        $.pnotify({
            title: 'server fault',
            text: reason.msg,
            type: 'error',
            width: '40%',
            stack: true,
            hide: true,
            closer: true,
            sticker: false,
            history: false
        });
    },
    tooltip: function (text) {
        return $.pnotify({
            text: text,
            width: '10%',
            hide: false,
            closer: false,
            sticker: false,
            history: false,
            opacity: 0.9,
            stack: false,
            animate_speed: 100,
            after_init: function (pnotify) {
                pnotify.mouseout(function () {
                    pnotify.pnotify_remove();
                });
            },
            before_open: function (pnotify) {
                pnotify.pnotify({
                    before_open: null
                });
                return false;
            }
        });
    }
};
