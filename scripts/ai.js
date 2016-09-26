import AiAction from "./aiAction.js";
import Game from "./game.js"


class AI {

    constructor() {
        this.game = null;
    }


    makeRandomMove(turn) {
        var available = this.game.currentState.emptyCells();
        var randomCell = available[Math.floor(Math.random() * available.length)];
        var action = new AiAction(randomCell);

        return action.movePosition;
    }

    plays(game){
        this.game = game;
    };


    notify(turn, callback) {
        let indx = this.makeRandomMove(turn);
        callback(indx);
    };
}


export default AI;
