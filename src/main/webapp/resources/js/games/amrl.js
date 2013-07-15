var cellWidth = 60;
var cellHeight = 42;
var cellTextSize = cellHeight / 2;
var cellMouseOverOpacity = 0.75;

var greenColor = 'green';
var redColor = 'red';
var blackColor = 'black';

var StraightPositions = {
    number_0: {numbers: [0], label: "0"},
    number_00: {numbers: [-1], label: "00"},
    number_1: {numbers: [1], bgColor: redColor},
    number_2: {numbers: [2], bgColor: blackColor},
    number_3: {numbers: [3], bgColor: redColor},
    number_4: {numbers: [4], bgColor: blackColor},
    number_5: {numbers: [5], bgColor: redColor},
    number_6: {numbers: [6], bgColor: blackColor},
    number_7: {numbers: [7], bgColor: redColor},
    number_8: {numbers: [8], bgColor: blackColor},
    number_9: {numbers: [9], bgColor: redColor},
    number_10: {numbers: [10], bgColor: blackColor},
    number_11: {numbers: [11], bgColor: blackColor},
    number_12: {numbers: [12], bgColor: redColor},
    number_13: {numbers: [13], bgColor: blackColor},
    number_14: {numbers: [14], bgColor: redColor},
    number_15: {numbers: [15], bgColor: blackColor},
    number_16: {numbers: [16], bgColor: redColor},
    number_17: {numbers: [17], bgColor: blackColor},
    number_18: {numbers: [18], bgColor: redColor},
    number_19: {numbers: [19], bgColor: redColor},
    number_20: {numbers: [20], bgColor: blackColor},
    number_21: {numbers: [21], bgColor: redColor},
    number_22: {numbers: [22], bgColor: blackColor},
    number_23: {numbers: [23], bgColor: redColor},
    number_24: {numbers: [24], bgColor: blackColor},
    number_25: {numbers: [25], bgColor: redColor},
    number_26: {numbers: [26], bgColor: blackColor},
    number_27: {numbers: [27], bgColor: redColor},
    number_28: {numbers: [28], bgColor: blackColor},
    number_29: {numbers: [29], bgColor: blackColor},
    number_30: {numbers: [30], bgColor: redColor},
    number_31: {numbers: [31], bgColor: blackColor},
    number_32: {numbers: [32], bgColor: redColor},
    number_33: {numbers: [33], bgColor: blackColor},
    number_34: {numbers: [34], bgColor: redColor},
    number_35: {numbers: [35], bgColor: blackColor},
    number_36: {numbers: [36], bgColor: redColor}
};
var OutsidePositions = {
    dozen_1to12: {numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: "1st 12"},
    dozen_13to24: {numbers: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], label: "2nd 12"},
    dozen_25to36: {numbers: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], label: "3rd 12"},

    even: {numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36], label: "EVEN", textColor: "white"},
    odd: {numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35], label: "ODD", textColor: "white"},

    red: {numbers: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36], label: "RED", textColor: redColor},
    black: {numbers: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35], label: "BLACK", textColor: blackColor},

    range_1to18: {numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], label: "1 to 18", textColor: "white"},
    range_19to36: {numbers: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], label: "19 to 36", textColor: "white"},

    column_1: {numbers: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]},
    column_2: {numbers: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]},
    column_3: {numbers: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]}
};
Object.freeze(StraightPositions);
Object.freeze(OutsidePositions);

var stage = new Kinetic.Stage({
    container: 'gameContainer',
    width: 940,
    height: 720
});
var layer = new Kinetic.Layer();

function loadGame(stageOffset) {
    stage.setOffset(stageOffset);
    var numbersMap = {};
    var zeroRadius = 3 * cellWidth / 4;
    var offset = {x: 0, y: zeroRadius};

    drawZeroPositions(numbersMap, offset);
    drawStraightPositions(numbersMap, offset);
    drawBigPositions(numbersMap, offset);
    drawDozenPositions(numbersMap, offset);
    drawColumnOutsidePositions(numbersMap, offset);
    stage.add(layer);
}
function drawZeroPositions(numbersMap, offset) {
    var zerosGroup = new Kinetic.Group({x: 2 * cellWidth + offset.x, y: 0});
    for (var i = 0; i < 2; i++) {
        var g = new Kinetic.Group({});
        var wedge = new Kinetic.Wedge({
            x: offset.y * 2 * i + offset.y,
            y: offset.y,
            radius: offset.y,
            angleDeg: 180,
            fill: greenColor,
            stroke: 'white',
            strokeWidth: 0,
            rotationDeg: -180
        });
        var p = StraightPositions["number_0" + (i == 1 ? "0" : "")];
        var text = new Kinetic.Text({
            x: offset.y * 2 * i + offset.y,
            y: offset.y / 2,
            text: p.label,
            fontSize: cellTextSize * cellWidth / offset.y,
            fontFamily: window.document.fontFamily,
            fontStyle: 'bold',
            fill: 'white'
        });
        text.setOffset({x: text.getWidth() / 2, y: text.getHeight() / 2});
        g.add(wedge);
        g.add(text);
        highlightPositionNumber(g);
        zerosGroup.add(g);
        numbersMap[p.numbers[0]] = g;
    }
    layer.add(zerosGroup);
}
function drawStraightPositions(numbersMap, offset) {
    var numbersGroup = new Kinetic.Group({x: 2 * cellWidth + offset.x, y: 0 + offset.y});
    var counter = 0;
    for (var i = 0; i < 12; i++) {
        for (var j = 0; j < 3; j++) {
            counter++;
            var g = new Kinetic.Group({});
            var rect = new Kinetic.Rect({
                x: j * cellWidth,
                y: i * cellHeight,
                width: cellWidth,
                height: cellHeight,
                fill: greenColor,
                stroke: 'white',
                strokeWidth: 0
            });
            var ellipse = new Kinetic.Ellipse({
                x: j * cellWidth + cellWidth / 2,
                y: i * cellHeight + cellHeight / 2,
                radius: {
                    x: cellWidth / 3,
                    y: cellHeight / 3
                },
                fill: StraightPositions["number_" + counter].bgColor
            });
            var text = new Kinetic.Text({
                x: j * cellWidth + cellWidth / 2,
                y: i * cellHeight + cellHeight / 2,
                text: counter,
                fontSize: cellTextSize,
                fontFamily: window.document.fontFamily,
                fill: 'white'
            });
            text.setOffset({x: text.getWidth() / 2, y: text.getHeight() / 2});

            g.add(rect);
            g.add(ellipse);
            g.add(text);
            highlightPositionNumber(g);
            numbersGroup.add(g);
            numbersMap[counter] = g;
        }
    }
    layer.add(numbersGroup);
}
function drawBigPositions(numbersMap, offset) {
    var bigGroup = new Kinetic.Group({x: 0 + offset.x, y: 0 + offset.y});
    for (var i = 0; i < 6; i++) {
        var p = null;
        switch (i) {
            case 0:
                p = OutsidePositions.range_1to18;
                break;
            case 1:
                p = OutsidePositions.even;
                break;
            case 2:
                p = OutsidePositions.red;
                break;
            case 3:
                p = OutsidePositions.black;
                break;
            case 4:
                p = OutsidePositions.odd;
                break;
            case 5:
                p = OutsidePositions.range_19to36;
                break;
        }
        var g = new Kinetic.Group({});
        var rect = new Kinetic.Rect({
            x: 0,
            y: i * cellHeight * 2,
            width: cellWidth,
            height: cellHeight * 2,
            fill: greenColor,
            stroke: 'white',
            strokeWidth: 0
        });
        var text = new Kinetic.Text({
            x: cellWidth / 2,
            y: i * cellHeight * 2 + cellHeight,

            text: p.label,
            fontSize: cellTextSize * 3 / 4,
            fontFamily: window.document.fontFamily,
            fontStyle: 'bold',
            fill: p.textColor
        });
        text.setOffset({x: text.getWidth() / 2, y: text.getHeight() / 2});
        text.rotateDeg(90);
        g.add(rect);
        g.add(text);
        highlightPositionNumbers(g, p, numbersMap);
        bigGroup.add(g);
    }
    layer.add(bigGroup);
}
function drawDozenPositions(numbersMap, offset) {
    var dozenGroup = new Kinetic.Group({x: cellWidth + offset.x, y: 0 + offset.y});
    for (var i = 0; i < 3; i++) {
        var g = new Kinetic.Group({});
        var rect = new Kinetic.Rect({
            x: 0,
            y: i * cellHeight * 4,
            width: cellWidth,
            height: cellHeight * 4,
            fill: greenColor,
            stroke: 'white',
            strokeWidth: 0
        });
        var p = OutsidePositions["dozen_" + (i * 12 + 1) + 'to' + ( (i + 1) * 12 )];
        var text = new Kinetic.Text({
            x: cellWidth / 2,
            y: i * cellHeight * 4 + cellHeight * 2,
            text: p.label,
            fontSize: cellTextSize,
            fontFamily: window.document.fontFamily,
            fontStyle: 'bold',
            fill: 'white'
        });
        text.setOffset({x: text.getWidth() / 2, y: text.getHeight() / 2});
        text.rotateDeg(90);
        g.add(rect);
        g.add(text);
        highlightPositionNumbers(g, p, numbersMap);
        dozenGroup.add(g);
    }
    layer.add(dozenGroup);
}
function drawColumnOutsidePositions(numbersMap, offset) {
    var columnGroup = new Kinetic.Group({x: 2 * cellWidth + offset.x, y: 12 * cellHeight + offset.y});
    for (var i = 0; i < 3; i++) {
        var g = new Kinetic.Group({});
        var rect = new Kinetic.Rect({
            x: i * cellWidth,
            y: 0,
            width: cellWidth,
            height: cellHeight,
            fill: greenColor,
            stroke: 'white',
            strokeWidth: 0
        });
        var p = OutsidePositions["column_" + (i + 1)];
        var text = new Kinetic.Text({
            x: i * cellWidth + cellWidth / 2,
            y: cellHeight / 2,
            text: '2 to 1',
            fontSize: cellTextSize * 3 / 4,
            fontFamily: window.document.fontFamily,
            fontStyle: 'bold',
            fill: 'white'
        });
        text.setOffset({x: text.getWidth() / 2, y: text.getHeight() / 2});

        g.add(rect);
        g.add(text);
        highlightPositionNumbers(g, p, numbersMap);
        columnGroup.add(g);
    }
    layer.add(columnGroup);
}
function highlightPositionNumber(g) {
    g.on('mouseover', function () {
        this.setOpacity(cellMouseOverOpacity);
        document.body.style.cursor = "pointer";
        layer.draw();
    });
    g.on('mouseout', function () {
        this.setOpacity(1);
        document.body.style.cursor = "default";
        layer.draw();
    });
}
function highlightPositionNumbers(g, selected, numbersMap) {
    g.on('mouseover', function () {
        for (var j = 0; j < selected.numbers.length; j++) {
            if (numbersMap.hasOwnProperty(selected.numbers[j])) {
                numbersMap[selected.numbers[j]].setOpacity(cellMouseOverOpacity);
            }
        }
        this.setOpacity(cellMouseOverOpacity);
        document.body.style.cursor = "pointer";
        layer.draw();
    });
    g.on('mouseout', function () {
        for (var j = 0; j < selected.numbers.length; j++) {
            if (numbersMap.hasOwnProperty(selected.numbers[j])) {
                numbersMap[selected.numbers[j]].setOpacity(1);
            }
        }
        this.setOpacity(1);
        document.body.style.cursor = "default";
        layer.draw();
    });
}