var s;
var ColorGame = {
    settings: {
        colors: [],
        pickedColor: undefined,
        gameMode: 6,
        namedColor: document.querySelector("#color-named"),
        squares: document.querySelectorAll(".square"),
        colorNamed: document.querySelector("#color-named"),
        header: document.querySelector("header"),
        messageDisplay: document.querySelector("#message-display")
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
        this.assignName();
    },

    assignName: function() {
        s.namedColor.textContent = s.pickedColor;
        this.bindUIActions();
    },

    bindUIActions: function() {
        for (var i = 0; i < s.gameMode; i++) {
            s.squares[i].addEventListener("click", function() {
                if (this.style.backgroundColor === s.pickedColor)
                    ColorGame.win();
                else this.classList.add("color-selected");
            });
        }
    },

    win: function() {
        for (var i = 0; i < s.gameMode; i++) {
            s.squares[i].classList.remove("color-selected");
            s.squares[i].style.backgroundColor = s.pickedColor;
            s.header.style.backgroundColor = s.pickedColor;
            s.messageDisplay.textContent = "Well Done!";
        }
    }
};

ColorGame.init();
