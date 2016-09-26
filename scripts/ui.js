import boostrap from "bootstrap-loader";


class Ui {
    constructor() {
        this.intialControlsVisible = true;

        this.currentView = "";
    }

    showCurrentView(turn) {
        this.currentView = "#" + turn;
        $(this.currentView).fadeIn("fast");
    }


    switchViewTo(turn) {
        if(this.intialControlsVisible) {
            this.intialControlsVisible = false;

            $(".initial").fadeOut({
                duration : "slow",
                done : x => this.showCurrentView(turn)
            });
        }
        else {
            $(this.currentView).fadeOut({
                duration: "slow",
                done: x => this.showCurrentView(turn)
            });
        }
    };

    insertAt(indx, symbol) {
        var board = $(".cell");
        var cell = $(board[indx]);

        if(!cell.hasClass("occupied")) {
            cell.html(symbol);
            cell.css({
                color : symbol == "X" ? "green" : "red"
            });
            cell.addClass("occupied");
        }
    }

    humanMove(callback) {
        let $unoccupied = $(".cell").not(".occupied");

        $unoccupied.click(function () {
            var $this = $(this);
            var indx = parseInt($this.data("indx"));
            $unoccupied.off("click");
            callback(indx);
        });
    }

}

export default Ui;
