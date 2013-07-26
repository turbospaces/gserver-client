function loadBets(layer, group, offset) {
    var g = new Kinetic.Group({x: offset.x, y: offset.y});

    var imageSize = group.getWidth() / 5;
    var coins = sessvars.ui.game.coins.coins;
    var counter = 0;

    for (var i = 0; i < coins.length; i++) {
        var coin = coins[i];
        var n = 0;
        switch (coin) {
            case 'ONE':
                n = 1;
                break;
            case 'FIVE':
                n = 5;
                break;
            case 'TWENTY_FIVE':
                n = 25;
                break;
            case 'FIFTY':
                n = 50;
                break;
            case 'HUNDRED':
                n = 100;
                break;
        }

        if (n > 0) {
            var imageObj = new Image();
            imageObj.onload = (function (obj, i) {
                var img = new Kinetic.Image({
                    x: i * imageSize,
                    y: 0,
                    image: obj,
                    width: imageSize,
                    height: imageSize
                });
                //g.add(img);
            })(imageObj, counter++);
            imageObj.src = 'http://localhost:8187/gserver-client/resources/img/chip-' + n + '-icon.png';
        }
    }
    console.info(g);
    layer.add(g);
}