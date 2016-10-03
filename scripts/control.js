import AI from "./ai.js";
import Game from "./game.js"
import Ui from "./Ui.js";

class control {
    constructor() {
        this.setupDificulty();
        this.setupPlayer();
        this.setupStart();
    }

    setupDificulty() {
        $(".level").click(function() {
            const $this = $(this);
            $(".level").not($this).removeClass("selected").addClass("not-selected");
            $this.removeClass("not-selected").addClass("selected");
        });
    }

    setupPlayer() {
        $(".player").click(function () {
            const $this = $(this);
            $(".player").not($this).removeClass("selected").addClass("not-selected");
            $this.removeClass("not-selected").addClass("selected");
        });
    }

    setupStart() {
        $(".start").click(x => {
            const player = $(".player.selected").attr("id");
            const aiLevel = $(".selected").attr("id");
            if(player && aiLevel) {
                const aiPlayer = new AI(aiLevel);
                const uiInstance = new Ui();
                const game = new Game(aiPlayer, uiInstance, player);

                aiPlayer.plays(game);

                game.start();
            }
        });
    }

}

export default control

