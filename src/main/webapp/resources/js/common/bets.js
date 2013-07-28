var betsUI = {
    selected: null,
    quantity2img: [],
    init: function (layer, group, widgetHeight, offset) {
        var g = new Kinetic.Group({x: offset.x, y: offset.y});
        var coins = sessvars.ui.game.coins.coins;

        var rect = sessvars.ui.makeRectWrapper({width: group.getWidth(), height: widgetHeight});
        rect.setFill(sessvars.ui.theme.white);
        g.add(rect);

        var imageSize = rect.getHeight() * 3 / 5;
        var coinNumbers = [];
        for (var j = 0; j < coins.length; j++) {
            switch (coins[j]) {
                case 'ONE':
                    coinNumbers.push(1);
                    break;
                case 'FIVE':
                    coinNumbers.push(5);
                    break;
                case 'TWENTY_FIVE':
                    coinNumbers.push(25);
                    break;
                case 'FIFTY':
                    coinNumbers.push(50);
                    break;
                case 'HUNDRED':
                    coinNumbers.push(100);
                    break;
            }
        }
        coinNumbers.sort();

        var items = coinNumbers.length;
        var gap = (rect.getWidth() - rect.getCornerRadius() - items * imageSize) / (items + 1);
        for (var k = 0; k < items; k++) {
            this.quantity2img[k] = this.toCoinImg(
                layer,
                g,
                Number(coinNumbers[k]),
                imageSize,
                {x: gap * (1 + k) + imageSize * k, y: (rect.getHeight() - imageSize) / 2}
            );
        }
        layer.add(g);
    },
    toCoinImg: function (layer, g, quantity, imageSize, xy) {
        var imageObj = new Image();
        var scale = 1.3;

        var betWrapper = {
            quantity: quantity,
            img: new Kinetic.Image({image: imageObj}),
            reset: function () {
                betWrapper.img.setX(xy.x);
                betWrapper.img.setY(xy.y);
                betWrapper.img.setWidth(imageSize);
                betWrapper.img.setHeight(imageSize);
            }
        };

        imageObj.onload = new function () {
            betWrapper.reset();
            betWrapper.img.on('click', function () {
                mediaManager.click();
                betsUI.selected = betWrapper;

                for (var j = 0; j < betsUI.quantity2img.length; j++) {
                    betsUI.quantity2img[j].reset();
                }

                betWrapper.img.setX(betWrapper.img.getX() - ((scale - 1) / 2) * betWrapper.img.getWidth());
                betWrapper.img.setY(betWrapper.img.getY() - ((scale - 1) / 2) * betWrapper.img.getHeight());

                betWrapper.img.setWidth(scale * betWrapper.img.getWidth());
                betWrapper.img.setHeight(scale * betWrapper.img.getHeight());

                layer.draw();
            });
            g.add(betWrapper.img);
        };
        imageObj.src = sessvars.ui.baseURL + 'resources/img/chip-' + quantity + '-icon.png';
        return betWrapper;
    }
};