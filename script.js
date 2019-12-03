var s;
var ColorGame = {
    settings: {
        colors: [],
        pickedColor: undefined,
        gameMode: 6,
        namedColor: document.querySelector("#color-named"),
        squares: document.querySelectorAll(".square")
    },

    init: function() {
        s = this.settings;
        this.generateColors();
    },

    generateColors: function() {
        for (var i = 0; i < s.gameMode; i++)
            s.colors.push(this.generateRandom());
        s.pickedColor = this.selectColor(this.gameMode);
        this.assignColors();
    },

    generateRandom: function() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgb(" + r + ", " + g + ", " + b + ")";
    },

    selectColor: function(n) {
        return s.colors[Math.floor(Math.random() * 6)];
    },

    assignColors: function() {
        for (var i = 0; i < s.gameMode; i++) {
            s.squares[i].style.backgroundColor = s.colors[i];
        }
    }
};

ColorGame.init();
