function loadBalance(layer, group, offset) {
    var g = new Kinetic.Group({x: offset.x, y: offset.y});

    var margin = 10;
    var rect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: group.getWidth(),
        height: 100,
        strokeWidth: 3,
        stroke: sessvars.ui.theme.background,
        fill: sessvars.ui.theme.wheat,
        shadowColor: 'black',
        shadowBlur: margin,
        shadowOffset: [margin, margin],
        shadowOpacity: 0.2,
        cornerRadius: margin
    });
    g.add(rect);

    var lblWidth = (rect.getWidth() - 3 * margin) / 2;
    var lblHeight = (rect.getHeight() - 3 * margin ) / 2;
    var rectBetLbl = new Kinetic.Rect({
        x: margin,
        y: margin,
        width: lblWidth,
        height: lblHeight,
        fill: sessvars.ui.theme.black,
        cornerRadius: rect.getCornerRadius()
    });
    var rectBalanceLbl = new Kinetic.Rect({
        x: rectBetLbl.getX(),
        y: 2 * margin + lblHeight,
        width: rectBetLbl.getWidth(),
        height: lblHeight,
        fill: rectBetLbl.getFill(),
        cornerRadius: rectBetLbl.getCornerRadius()
    });
    var txtBet = new Kinetic.Text({
        x: margin + lblWidth / 2,
        y: margin + lblHeight / 2,
        text: "Bet",
        fontSize: lblHeight,
        fontFamily: window.document.fontFamily,
        fill: sessvars.ui.theme.white
    });
    var txtBalance = new Kinetic.Text({
        x: txtBet.getX(),
        y: rectBalanceLbl.getY() + lblHeight / 2,
        text: "Balance",
        fontSize: txtBet.getFontSize(),
        fontFamily: window.document.fontFamily,
        fill: sessvars.ui.theme.white
    });
    txtBet.setOffset({x: txtBet.getWidth() / 2, y: txtBet.getHeight() / 2});
    txtBalance.setOffset({x: txtBalance.getWidth() / 2, y: txtBalance.getHeight() / 2});
    var rectBetAmount = new Kinetic.Rect({
        x: 2 * margin + lblWidth,
        y: rectBetLbl.getY(),
        width: lblWidth,
        height: lblHeight,
        fill: sessvars.ui.theme.black,
        cornerRadius: rect.getCornerRadius()
    });
    var rectBalanceAmount = new Kinetic.Rect({
        x: rectBetAmount.getX(),
        y: rectBalanceLbl.getY(),
        width: lblWidth,
        height: lblHeight,
        fill: sessvars.ui.theme.black,
        cornerRadius: rect.getCornerRadius()
    });

    g.add(rectBetLbl);
    g.add(rectBalanceLbl);
    g.add(txtBet);
    g.add(txtBalance);
    g.add(rectBetAmount);
    g.add(rectBalanceAmount);

    layer.add(g);
}