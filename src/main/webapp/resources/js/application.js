sessvars.ui = {
    sessionId: null,
    baseURL: null,
    user: {
        displayName: null,
        balance: 0
    },
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
        green: '#46a546',
        blue: '#049cdb',
        red: '#9d261d',
        yellow: '#ffc40d',
        orange: '#f89406',
        pink: '#c3325f',
        purple: '#7a43b6',
        black: 'black',
        white: 'white',
        wheat: 'wheat',
        background: '#ddd',
        fontFamily: 'fantasy'
    },
    form: function (g, size, fields) {
        var rect = sessvars.ui.makeRectWrapper(size);
        var margin = rect.getCornerRadius();

        var lblWidth = (rect.getWidth() - (fields.length + 1) * margin) / 2;
        var lblHeight = (rect.getHeight() - (fields.length + 1) * margin ) / 2;

        g.add(rect);
        var labels = [];
        for (var i = 0; i < fields.length; i++) {
            var row = fields[i];

            var lblRect = new Kinetic.Rect({
                x: margin,
                y: margin * (1 + i) + i * lblHeight,
                width: lblWidth,
                height: lblHeight,
                fill: sessvars.ui.theme.black,
                cornerRadius: margin
            });
            var valueRect = lblRect.clone({
                x: 2 * margin + lblWidth,
                y: lblRect.getY()
            });
            var lblTxt = new Kinetic.Text({
                x: lblRect.getX() + lblWidth / 2,
                y: lblRect.getY() + lblHeight / 2,
                text: row.lblText,
                fontSize: lblHeight * 3 / 4,
                fontFamily: sessvars.ui.theme.fontFamily,
                fill: sessvars.ui.theme.white
            });
            var valueTxt = lblTxt.clone({
                x: valueRect.getX() + lblWidth / 2,
                y: valueRect.getY() + lblHeight / 2,
                text: row.valueText
            });
            lblTxt.setOffset({x: lblTxt.getWidth() / 2, y: lblTxt.getHeight() / 2});
            valueTxt.setOffset({x: valueTxt.getWidth() / 2, y: valueTxt.getHeight() / 2});

            labels.push([lblTxt, valueTxt ]);

            g.add(lblRect);
            g.add(valueRect);
            g.add(lblTxt);
            g.add(valueTxt);
        }
        return labels;
    },
    makeRectWrapper: function (size) {
        var margin = 10;
        return new Kinetic.Rect({
            x: 0,
            y: 0,
            width: size.width - margin,
            height: size.height - margin,
            strokeWidth: margin / 3,
            stroke: sessvars.ui.theme.background,
            fill: sessvars.ui.theme.blue,
            shadowColor: sessvars.ui.theme.black,
            shadowBlur: margin,
            shadowOffset: [margin / 2, margin / 2],
            shadowOpacity: 0.4,
            cornerRadius: margin
        });
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
