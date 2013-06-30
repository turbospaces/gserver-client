function loadRoulette() {
    var stage = new Kinetic.Stage({
        container: 'gameContainer',
        width: 940,
        height: 620
    });
    var layer = new Kinetic.Layer();

    var pWidth = 60;
    var pHeight = 80;
    var pTextSize = 20;
    var pStroke = 1;
    var counter = 0;
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 3; j++) {
            counter++;
            var pRect = new Kinetic.Rect({
                x: i * pWidth,
                y: j * pHeight,
                width: pWidth - pStroke,
                height: pHeight - pStroke,
                fill: 'green',
                stroke: 'white',
                strokeWidth: pStroke
            });

            var pText = new Kinetic.Text({
                x: i * pWidth,
                y: j * pHeight,
                width: pWidth - pStroke + pTextSize,
                height: pHeight - pStroke,
                text: counter,
                fontSize: pTextSize,
                fontFamily: 'Calibri',
                fill: 'red',
                align: 'center',
                opacity: 1
            });

            layer.add(pRect);
            layer.add(pText);
        }
    }
    stage.add(layer);
}