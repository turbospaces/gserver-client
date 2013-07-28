mediaManager = {
    casinoChipImg: new Image(),
    init: function () {
        var def = new $.Deferred();

        var def1 = new $.Deferred();
        createjs.Sound.registerSound(sessvars.ui.baseURL + 'resources/sounds/placebet.ogg', 'placebet');
        createjs.Sound.registerSound(sessvars.ui.baseURL + 'resources/sounds/click.wav', 'click');
        createjs.Sound.addEventListener('loadComplete', function (event) {
            def1.resolve();
        });

        var def2 = new $.Deferred();

        this.casinoChipImg.src = sessvars.ui.baseURL + 'resources/img/casino-chip-icon.png';
        this.casinoChipImg.onload = function () {
            def2.resolve();
        };

        $.when(def1.promise(), def2.promise()).done(function () {
            def.resolve();
        });

        return def.promise();
    },
    click: function () {
        createjs.Sound.play("click");
    },
    placeBet: function () {
        createjs.Sound.play("placebet");
    }
};