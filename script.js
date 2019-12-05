var s;
var ColorGame = {
    settings: {
        colors: [],
        gameMode: 6,
        pickedColor: undefined,
        squares: $('.square'),
        namedColor: $('#color-named'),
        header: $('header'),
        messageDisplay: $('#message-display'),
        resetButton: $('#reset-button'),
        difficultyButtons: $('.diff-btn'),
        bottomRow: $('#bottom-row')
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
        s.pickedColor = this.selectColor();
        this.assignColors();
    },

    generateRandom: function() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    },

    selectColor: function() {
        return s.colors[Math.floor(Math.random() * s.gameMode)];
    },

    assignColors: function() {
        var i = 0;
        s.squares.each(function() {
            $(this).css('background-color', s.colors[i]);
            i++;
        });
        this.assignName();
    },

    assignName: function() {
        s.namedColor.text(s.pickedColor);
    },

    bindUIActions: function() {
        s.squares.click(function() {
            $(this).css('background-color') === s.pickedColor
                ? ColorGame.win()
                : ColorGame.retry($(this));
        });
        s.resetButton.click(ColorGame.resetGame);
        s.difficultyButtons.click(function() {
            ColorGame.selectButton($(this));
            $(this).attr('id') === 'easy-btn'
                ? (s.gameMode = 3)
                : (s.gameMode = 6);
            ColorGame.resetGame();
        });
    },

    win: function() {
        s.squares.removeClass('color-selected');
        s.squares.css('background-color', s.pickedColor);
        s.header.css('background-color', s.pickedColor);
        s.messageDisplay.text('Well Done!');
    },

    retry: function(sqr) {
        sqr.addClass('color-selected');
        s.messageDisplay.text('Try Again!');
    },

    resetGame: function() {
        s.squares.removeClass('color-selected');
        ColorGame.generateColors();
        s.messageDisplay.text('');
        s.header.css('background-color', 'steelblue');
    },

    selectButton: function(btn) {
        s.difficultyButtons.removeClass('button-selected');
        btn.addClass('button-selected');
    },

    toggleBottom: function(n) {
        n === 3
            ? s.bottomRow.addClass('hide-row')
            : s.bottomRow.removeClass('hide-row');
    }
};

ColorGame.init();
