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
        messageDisplay: document.querySelector("#message-display"),
        resetButton: document.querySelector("#reset-button"),
        difficultyButtons: document.querySelectorAll(".diff-btn"),
        bottomRow: document.querySelector("#bottom-row")
    },

    init: function() {
        s = this.settings;
        this.generateColors();
        this.bindUIActions();
    },

    generateColors: function() {
        s.colors = [];
        this.toggleBottom(s.gameMode);
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
        return s.colors[Math.floor(Math.random() * s.gameMode)];
    },

    assignColors: function() {
        for (var i = 0; i < s.gameMode; i++) {
            s.squares[i].style.backgroundColor = s.colors[i];
        }
        this.assignName();
    },

    assignName: function() {
        s.namedColor.textContent = s.pickedColor;
    },

    bindUIActions: function() {
        for (var i = 0; i < s.gameMode; i++) {
            s.squares[i].addEventListener("click", function() {
                if (this.style.backgroundColor === s.pickedColor)
                    ColorGame.win();
                else {
                    this.classList.add("color-selected");
                    s.messageDisplay.textContent = "Try Again!";
                }
            });
        }
        s.resetButton.addEventListener("click", ColorGame.resetGame);
        for (var i = 0; i < s.difficultyButtons.length; i++) {
            s.difficultyButtons[i].addEventListener("click", function() {
                ColorGame.selectButton(this);
                if (this.id === "easy-btn") s.gameMode = 3;
                else s.gameMode = 6;
                ColorGame.resetGame();
            });
        }
    },

    win: function() {
        for (var i = 0; i < s.gameMode; i++) {
            s.squares[i].classList.remove("color-selected");
            s.squares[i].style.backgroundColor = s.pickedColor;
        }
        s.header.style.backgroundColor = s.pickedColor;
        s.messageDisplay.textContent = "Well Done!";
    },

    resetGame: function() {
        for (var i = 0; i < s.gameMode; i++) {
            s.squares[i].classList.remove("color-selected");
        }
        ColorGame.generateColors();
        s.messageDisplay.textContent = "";
        s.header.style.backgroundColor = "steelblue";
    },

    selectButton: function(btn) {
        s.difficultyButtons[0].classList.remove("button-selected");
        s.difficultyButtons[1].classList.remove("button-selected");
        btn.classList.add("button-selected");
    },

    toggleBottom: function(n) {
        if (n === 3) {
            s.bottomRow.classList.add("hide-row");
        } else s.bottomRow.classList.remove("hide-row");
    }
};

ColorGame.init();
