function loadRoulette() {
    var Positions = {
        number_1: {numbers: [1], isBlack: false},
        number_2: {numbers: [2], isBlack: true},
        number_3: {numbers: [3], isBlack: false},
        number_4: {numbers: [4], isBlack: true},
        number_5: {numbers: [5], isBlack: false},
        number_6: {numbers: [6], isBlack: true},
        number_7: {numbers: [7], isBlack: false},
        number_8: {numbers: [8], isBlack: true},
        number_9: {numbers: [9], isBlack: false},
        number_10: {numbers: [10], isBlack: true},
        number_11: {numbers: [11], isBlack: true},
        number_12: {numbers: [12], isBlack: false},
        number_13: {numbers: [13], isBlack: true},
        number_14: {numbers: [14], isBlack: false},
        number_15: {numbers: [15], isBlack: true},
        number_16: {numbers: [16], isBlack: false},
        number_17: {numbers: [17], isBlack: true},
        number_18: {numbers: [18], isBlack: false},
        number_19: {numbers: [19], isBlack: false},
        number_20: {numbers: [20], isBlack: true},
        number_21: {numbers: [21], isBlack: false},
        number_22: {numbers: [22], isBlack: true},
        number_23: {numbers: [23], isBlack: false},
        number_24: {numbers: [24], isBlack: true},
        number_25: {numbers: [25], isBlack: false},
        number_26: {numbers: [26], isBlack: true},
        number_27: {numbers: [27], isBlack: false},
        number_28: {numbers: [28], isBlack: true},
        number_29: {numbers: [29], isBlack: true},
        number_30: {numbers: [30], isBlack: false},
        number_31: {numbers: [31], isBlack: true},
        number_32: {numbers: [32], isBlack: false},
        number_33: {numbers: [33], isBlack: true},
        number_34: {numbers: [34], isBlack: false},
        number_35: {numbers: [35], isBlack: true},
        number_36: {numbers: [36], isBlack: false}
    }
    Object.freeze(Positions);

    var stage = new Kinetic.Stage({
        container: 'gameContainer',
        width: 940,
        height: 620
    });
    var layer = new Kinetic.Layer();

    var pWidth = 60;
    var pHeight = 42;

    var counter = 0;
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 3; j++) {
            counter++;
            var pRect = new Kinetic.Rect({
                x: j * pWidth,
                y: i * pHeight,
                width: pWidth,
                height: pHeight,
                fill: '#336633',
                stroke: 'white',
                strokeWidth: 0
            });

            var nPositionName = "number_" + counter;
            var pEllipse = new Kinetic.Ellipse({
                x: j * pWidth + pWidth / 2,
                y: i * pHeight + pHeight / 2,
                radius: {
                    x: pWidth / 3,
                    y: pHeight / 3
                },
                fill:  Positions[nPositionName].isBlack? 'black' : 'red'
            });

            var textSize = pHeight / 2;
            var pText = new Kinetic.Text({
                x: j * pWidth,
                y: i * pHeight + textSize / 2,
                width: pWidth,
                height: pHeight,
                text: counter,
                fontSize: textSize,
                fontFamily: 'Calibri',
                fill: 'white',
                align: 'center'
            });

            layer.add(pRect);
            layer.add(pEllipse);
            layer.add(pText);
        }
    }
    stage.add(layer);
}