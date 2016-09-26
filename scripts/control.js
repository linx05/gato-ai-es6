import AI from "./ai.js";
import Game from "./game.js"
import Ui from "./Ui.js";
import $ from "jquery"

class control {
    constructor() {
        this.setupPlayer();
        this.setupStart();
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
            if(player) {
                const aiPlayer = new AI();
                const uiInstance = new Ui();
                const game = new Game(aiPlayer, uiInstance, player);

                aiPlayer.plays(game);

                game.start();
            }
        });
    }

}

export default control

