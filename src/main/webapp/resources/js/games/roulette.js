function loadRoulette() {
    var StraightPositions = {
        number_1: {numbers: [1], bgColor: 'red'},
        number_2: {numbers: [2], bgColor: 'black'},
        number_3: {numbers: [3], bgColor: 'red'},
        number_4: {numbers: [4], bgColor: 'black'},
        number_5: {numbers: [5], bgColor: 'red'},
        number_6: {numbers: [6], bgColor: 'black'},
        number_7: {numbers: [7], bgColor: 'red'},
        number_8: {numbers: [8], bgColor: 'black'},
        number_9: {numbers: [9], bgColor: 'red'},
        number_10: {numbers: [10], bgColor: 'black'},
        number_11: {numbers: [11], bgColor: 'black'},
        number_12: {numbers: [12], bgColor: 'red'},
        number_13: {numbers: [13], bgColor: 'black'},
        number_14: {numbers: [14], bgColor: 'red'},
        number_15: {numbers: [15], bgColor: 'black'},
        number_16: {numbers: [16], bgColor: 'red'},
        number_17: {numbers: [17], bgColor: 'black'},
        number_18: {numbers: [18], bgColor: 'red'},
        number_19: {numbers: [19], bgColor: 'red'},
        number_20: {numbers: [20], bgColor: 'black'},
        number_21: {numbers: [21], bgColor: 'red'},
        number_22: {numbers: [22], bgColor: 'black'},
        number_23: {numbers: [23], bgColor: 'red'},
        number_24: {numbers: [24], bgColor: 'black'},
        number_25: {numbers: [25], bgColor: 'red'},
        number_26: {numbers: [26], bgColor: 'black'},
        number_27: {numbers: [27], bgColor: 'red'},
        number_28: {numbers: [28], bgColor: 'black'},
        number_29: {numbers: [29], bgColor: 'black'},
        number_30: {numbers: [30], bgColor: 'red'},
        number_31: {numbers: [31], bgColor: 'black'},
        number_32: {numbers: [32], bgColor: 'red'},
        number_33: {numbers: [33], bgColor: 'black'},
        number_34: {numbers: [34], bgColor: 'red'},
        number_35: {numbers: [35], bgColor: 'black'},
        number_36: {numbers: [36], bgColor: 'red'}
    };
    var OutsidePositions = {
        dozen_1to12: {numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: "1st 12", textColor: "white"},
        dozen_13to24: {numbers: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], label: "2nd 12", textColor: "white"},
        dozen_25to36: {numbers: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], label: "3rd 12", textColor: "white"},

        even: {numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36], label: "even", textColor: "white"},
        odd: {numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35], label: "odd", textColor: "white"},

        red: {numbers: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36], label: "red", textColor: "red"},
        black: {numbers: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35], label: "red", textColor: "black"},

        range_1to18: {numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36], label: "even", textColor: "white"},
        range_19to36: {numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36], label: "even", textColor: "white"}
    };
    Object.freeze(StraightPositions);
    Object.freeze(OutsidePositions);

    var pWidth = 60;
    var pHeight = 42;
    var textSize = pHeight / 2;

    var stage = new Kinetic.Stage({
        container: 'gameContainer',
        width: 940,
        height: 620
    });
    var layer = new Kinetic.Layer();

    var numbersGroup = new Kinetic.Group({
        x: 2 * pWidth,
        y: 0
    });

    var dozenGroup = new Kinetic.Group({
        x: pWidth,
        y: 0,
        width: pWidth
    });

    var outsideGroup = new Kinetic.Group({
        x: 0,
        y: 0,
        width: pWidth
    });

    for (var i = 0; i < 3; i++) {
        var pRect = new Kinetic.Rect({
            x: 0,
            y: i * pHeight * 4,
            width: pWidth,
            height: pHeight * 4,
            fill: '#336633',
            stroke: 'white',
            strokeWidth: 0
        });
        dozenGroup.add(pRect);

        var dpn = "dozen_" + (i * 12 + 1) + 'to' + ( (i + 1) * 12 );
        var dozenText = new Kinetic.Text({
            x: pWidth / 2,
            y: i * pHeight * 4 + pHeight * 2,

            text: OutsidePositions[dpn].label,
            fontSize: textSize,
            fontFamily: 'Calibri',
            fontStyle: 'bold',
            fill: OutsidePositions[dpn].textColor
        });
        dozenText.setOffset({x: dozenText.getWidth() / 2, y: dozenText.getHeight() / 2});
        dozenText.rotateDeg(90);
        dozenGroup.add(dozenText);
    }


    for (var i = 0; i < 6; i++) {
        var pRect = new Kinetic.Rect({
            x: 0,
            y: i * pHeight * 2,
            width: pWidth,
            height: pHeight * 2,
            fill: '#336633',
            stroke: 'white',
            strokeWidth: 0
        });
        outsideGroup.add(pRect);

        var dozenText = new Kinetic.Text({
            x: pWidth / 2,
            y: i * pHeight * 2 + pHeight,

            text: 'XXX',
            fontSize: textSize,
            fontFamily: 'Calibri',
            fontStyle: 'bold',
            fill: 'white'
        });
        dozenText.setOffset({x: dozenText.getWidth() / 2, y: dozenText.getHeight() / 2});
        dozenText.rotateDeg(90);
        outsideGroup.add(dozenText);
    }

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
                fill: StraightPositions[nPositionName].bgColor
            });

            var pText = new Kinetic.Text({
                x: j * pWidth + pWidth / 2,
                y: i * pHeight + pHeight / 2,
                text: counter,
                fontSize: textSize,
                fontFamily: 'Calibri',
                fill: 'white'
            });
            pText.setOffset({x: pText.getWidth() / 2, y: pText.getHeight() / 2});

            numbersGroup.add(pRect);
            numbersGroup.add(pEllipse);
            numbersGroup.add(pText);
        }
    }
    layer.add(outsideGroup);
    layer.add(dozenGroup);
    layer.add(numbersGroup);
    stage.add(layer);
}