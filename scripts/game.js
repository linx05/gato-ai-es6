import State from './state.js';


class Game {

    constructor(ai, ui, player) {

        this.ai = ai;

        this.ui = ui;

        this.currentState = new State();

        this.currentState.board = ["E", "E", "E",
                                   "E", "E", "E",
                                   "E", "E", "E"];

        this.currentState.turn = player;

        this.status = "begin";
    }


    advanceTo(state) {
        this.currentState = state;
        if(state.isTerminal()) {
            //The game ended
            this.status = "ended";

            if(state.result === "X-won")
                //X won
                this.ui.switchViewTo("won");
            else if(state.result === "O-won")
                //X lost
                this.ui.switchViewTo("lost");
            else
                //it's a draw
                this.ui.switchViewTo("draw");
        }
        else {
            //the game is still running

            if(this.currentState.turn === "X") {
                this.ui.switchViewTo("human");

                this.ui.humanMove(indx => this.makeAMove(indx));
            }
            else {
                this.ui.switchViewTo("robot");

                //notify the AI player its turn has come up
                this.ai.notify(this.turn, indx => this.makeAMove(indx));
            }
        }
    }

    makeAMove(indx) {
        var next = new State(this.currentState);
        next.board[indx] = next.turn;
        this.ui.insertAt(indx, next.turn);
        next.advanceTurn();
        this.advanceTo(next);
    };

    /*
     * starts the game
     */
    start() {
        if(this.status === "begin") {
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }

}

/*
 * public static function that calculates the score of the x player in a given terminal state
 * @param state [State]: the state in which the score is calculated
 * @return [Number]: the score calculated for the human player
 */
Game.score = function(state) {
    if(state.result === "X-won"){
        // the x player won
        return 10 - state.oMovesCount;
    }
    else if(state.result === "O-won") {
        //the x player lost
        return - 10 + state.oMovesCount;
    }
    else {
        //it's a draw
        return 0;
    }
};

export default Game;