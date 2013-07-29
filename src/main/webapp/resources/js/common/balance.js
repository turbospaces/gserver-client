var balanceUI = {
    txtTotalBetAmount: null,
    txtBalanceAmount: null,
    txtPositionBetAmount: null,
    txtPositionReturnAmount: null,

    updateBalance: function (amount) {
        this.txtBalanceAmount.setText(amount);
        this.txtBalanceAmount.setOffset({x: this.txtBalanceAmount.getWidth() / 2, y: this.txtBalanceAmount.getHeight() / 2});
    },
    incrementTotalBet: function (delta) {
        var bet = Number(this.txtTotalBetAmount.getText());
        this.txtTotalBetAmount.setText(delta + bet);
        this.txtTotalBetAmount.setOffset({x: this.txtTotalBetAmount.getWidth() / 2, y: this.txtTotalBetAmount.getHeight() / 2});
    },
    updatePositionBet: function (amount, returnAmount) {
        this.updatePositionBetAndIncrementTotalBet(amount, 0);
        this.txtPositionReturnAmount.setText(returnAmount);
    },
    updatePositionBetAndIncrementTotalBet: function (amount , delta) {
        this.txtPositionBetAmount.setText(amount);
        this.txtPositionBetAmount.setOffset({x: this.txtPositionBetAmount.getWidth() / 2, y: this.txtPositionBetAmount.getHeight() / 2});
        this.incrementTotalBet(delta);
    },
    init: function (layer, group, widgetHeight, offset) {
        var g1 = new Kinetic.Group({x: offset.x, y: offset.y});

        var f1 = sessvars.ui.form(g1, {width: group.getWidth(), height: widgetHeight}, [
            {lblText: 'Total Bet', valueText: '0'},
            {lblText: 'Balance', valueText: sessvars.ui.user.balance}
        ]);
        balanceUI.txtTotalBetAmount = f1[0][1];
        balanceUI.txtBalanceAmount = f1[1][1];
        layer.add(g1);

        var g2 = new Kinetic.Group({x: offset.x, y: offset.y + widgetHeight * 2});
        var f2 = sessvars.ui.form(g2, {width: group.getWidth(), height: widgetHeight}, [
            {lblText: 'Position Bet', valueText: '0'},
            {lblText: 'Return', valueText: '0'}
        ]);
        balanceUI.txtPositionBetAmount = f2[0][1];
        balanceUI.txtPositionReturnAmount = f2[1][1];

        layer.add(g2);
    }
};