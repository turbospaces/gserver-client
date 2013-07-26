var container1 = $('#gameContainer1');
var container2 = $('#gameContainer2');
//
// define sizing
//
var cellWidth = Math.round(Number(container1.width() / 5));
var zeroRadius = 3 * cellWidth / 4;
var cellHeight = Math.round(Number(($(window).height() - zeroRadius) * 0.9 / 13));
var cellMouseOverOpacity = 0.75;
var stageHeight = 13 * cellHeight + zeroRadius;
var cellTextSize = cellHeight / 2;

var StraightPositions = {
    number_0: {numbers: [0], label: "0"},
    number_00: {numbers: [-1], label: "00"},
    number_1: {numbers: [1], bgColor: sessvars.ui.theme.red},
    number_2: {numbers: [2], bgColor: sessvars.ui.theme.black},
    number_3: {numbers: [3], bgColor: sessvars.ui.theme.red},
    number_4: {numbers: [4], bgColor: sessvars.ui.theme.black},
    number_5: {numbers: [5], bgColor: sessvars.ui.theme.red},
    number_6: {numbers: [6], bgColor: sessvars.ui.theme.black},
    number_7: {numbers: [7], bgColor: sessvars.ui.theme.red},
    number_8: {numbers: [8], bgColor: sessvars.ui.theme.black},
    number_9: {numbers: [9], bgColor: sessvars.ui.theme.red},
    number_10: {numbers: [10], bgColor: sessvars.ui.theme.black},
    number_11: {numbers: [11], bgColor: sessvars.ui.theme.black},
    number_12: {numbers: [12], bgColor: sessvars.ui.theme.red},
    number_13: {numbers: [13], bgColor: sessvars.ui.theme.black},
    number_14: {numbers: [14], bgColor: sessvars.ui.theme.red},
    number_15: {numbers: [15], bgColor: sessvars.ui.theme.black},
    number_16: {numbers: [16], bgColor: sessvars.ui.theme.red},
    number_17: {numbers: [17], bgColor: sessvars.ui.theme.black},
    number_18: {numbers: [18], bgColor: sessvars.ui.theme.red},
    number_19: {numbers: [19], bgColor: sessvars.ui.theme.red},
    number_20: {numbers: [20], bgColor: sessvars.ui.theme.black},
    number_21: {numbers: [21], bgColor: sessvars.ui.theme.red},
    number_22: {numbers: [22], bgColor: sessvars.ui.theme.black},
    number_23: {numbers: [23], bgColor: sessvars.ui.theme.red},
    number_24: {numbers: [24], bgColor: sessvars.ui.theme.black},
    number_25: {numbers: [25], bgColor: sessvars.ui.theme.red},
    number_26: {numbers: [26], bgColor: sessvars.ui.theme.black},
    number_27: {numbers: [27], bgColor: sessvars.ui.theme.red},
    number_28: {numbers: [28], bgColor: sessvars.ui.theme.black},
    number_29: {numbers: [29], bgColor: sessvars.ui.theme.black},
    number_30: {numbers: [30], bgColor: sessvars.ui.theme.red},
    number_31: {numbers: [31], bgColor: sessvars.ui.theme.black},
    number_32: {numbers: [32], bgColor: sessvars.ui.theme.red},
    number_33: {numbers: [33], bgColor: sessvars.ui.theme.black},
    number_34: {numbers: [34], bgColor: sessvars.ui.theme.red},
    number_35: {numbers: [35], bgColor: sessvars.ui.theme.black},
    number_36: {numbers: [36], bgColor: sessvars.ui.theme.red}
};
var OutsidePositions = {
    dozen_1to12: {numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: "1st 12"},
    dozen_13to24: {numbers: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], label: "2nd 12"},
    dozen_25to36: {numbers: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], label: "3rd 12"},

    even: {numbers: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36], label: "EVEN", textColor: sessvars.ui.theme.white},
    odd: {numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35], label: "ODD", textColor: sessvars.ui.theme.white},

    red: {numbers: [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36], label: "RED", textColor: sessvars.ui.theme.red},
    black: {numbers: [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35], label: "BLACK", textColor: sessvars.ui.theme.black},

    range_1to18: {numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], label: "1 to 18", textColor: sessvars.ui.theme.white},
    range_19to36: {numbers: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36], label: "19 to 36", textColor: sessvars.ui.theme.white},

    column_1: {numbers: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34]},
    column_2: {numbers: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35]},
    column_3: {numbers: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36]}
};
Object.freeze(StraightPositions);
Object.freeze(OutsidePositions);

var stage = new Kinetic.Stage({
    container: container1.attr('id'),
    width: container1.width(),
    height: stageHeight
});
var supportStage = new Kinetic.Stage({
    container: container2.attr('id'),
    width: container2.width(),
    height: stageHeight
});
var layer = new Kinetic.Layer();
var supportLayer = new Kinetic.Layer();
var numbersMap = {};

function loadGame(transport) {
    var fail = function (reason) {
        sessvars.ui.serverFault(reason)
    };

    transport.getRoulettePositionsInfo().done(function (reply) {
        var positions = reply["gserver.games.roulette.GetRoulettePositionInfoReply.cmd"].positions;
        for (var i = 0; i < positions.length; i++) {
            var name = positions[i].name;
            var payout = positions[i].payout;
        }
    }).fail(fail);

    var offset = {x: 0, y: zeroRadius};
    drawZeroPositions(offset);
    drawStraightPositions(offset);
    drawBigPositions(offset);
    drawDozenPositions(offset);
    drawColumnOutsidePositions(offset);
    loadBalance(supportLayer, supportStage, offset);
    loadBets(supportLayer, supportStage, offset);

    stage.add(layer);
    supportStage.add(supportLayer);
}
function drawZeroPositions(offset) {
    var zerosGroup = new Kinetic.Group({x: 2 * cellWidth + offset.x, y: 0});
    for (var i = 0; i < 2; i++) {
        var g = new Kinetic.Group({});
        var wedge = new Kinetic.Wedge({
            x: offset.y * 2 * i + offset.y,
            y: offset.y,
            radius: offset.y,
            angleDeg: 180,
            fill: sessvars.ui.theme.green,
            stroke: sessvars.ui.theme.white,
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
            fill: sessvars.ui.theme.white
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
function drawStraightPositions(offset) {
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
                fill: sessvars.ui.theme.green,
                stroke: sessvars.ui.theme.white,
                strokeWidth: 0
            });
            var ellipse = new Kinetic.Ellipse({
                x: j * cellWidth + cellWidth / 2,
                y: i * cellHeight + cellHeight / 2,
                opacity: 1,
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
                fill: sessvars.ui.theme.white
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
function drawBigPositions(offset) {
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
            fill: sessvars.ui.theme.green,
            stroke: sessvars.ui.theme.white,
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
        highlightPositionNumbers(g, p);
        bigGroup.add(g);
    }
    layer.add(bigGroup);
}
function drawDozenPositions(offset) {
    var dozenGroup = new Kinetic.Group({x: cellWidth + offset.x, y: 0 + offset.y});
    for (var i = 0; i < 3; i++) {
        var g = new Kinetic.Group({});
        var rect = new Kinetic.Rect({
            x: 0,
            y: i * cellHeight * 4,
            width: cellWidth,
            height: cellHeight * 4,
            fill: sessvars.ui.theme.green,
            stroke: sessvars.ui.theme.white,
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
            fill: sessvars.ui.theme.white
        });
        text.setOffset({x: text.getWidth() / 2, y: text.getHeight() / 2});
        text.rotateDeg(90);
        g.add(rect);
        g.add(text);
        highlightPositionNumbers(g, p);
        dozenGroup.add(g);
    }
    layer.add(dozenGroup);
}
function drawColumnOutsidePositions(offset) {
    var columnGroup = new Kinetic.Group({x: 2 * cellWidth + offset.x, y: 12 * cellHeight + offset.y});
    for (var i = 0; i < 3; i++) {
        var g = new Kinetic.Group({});
        var rect = new Kinetic.Rect({
            x: i * cellWidth,
            y: 0,
            width: cellWidth,
            height: cellHeight,
            fill: sessvars.ui.theme.green,
            stroke: sessvars.ui.theme.white,
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
            fill: sessvars.ui.theme.white
        });
        text.setOffset({x: text.getWidth() / 2, y: text.getHeight() / 2});

        g.add(rect);
        g.add(text);
        highlightPositionNumbers(g, p);
        columnGroup.add(g);
    }
    layer.add(columnGroup);
}
function highlightPositionNumber(g) {
    g.on('mouseover', function (event) {
        this.setOpacity(cellMouseOverOpacity);
        document.body.style.cursor = "pointer";
        layer.draw();
    });
    g.on('mousemove', function (event) {
        var mouse = stage.getMousePosition();
    });
    g.on('mouseout', function () {
        this.setOpacity(1);
        document.body.style.cursor = "default";
        layer.draw();
    });
}
function highlightPositionNumbers(g, selected) {
    g.on('mouseover', function (event) {
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