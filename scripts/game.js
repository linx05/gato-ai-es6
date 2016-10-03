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
                //draw
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


    start() {
        if(this.status === "begin") {
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }

    static score(state) {
        if(state.result === "X-won"){
            return 10 - state.oMovesCount;
        }
        else if(state.result === "O-won") {
            return - 10 + state.oMovesCount;
        }
        else {
            return 0;
        }
    }
}

export default Game;