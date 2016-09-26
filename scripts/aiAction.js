import State from "./state";


class AiAction {

    constructor(pos) {
        this.movePosition = pos;
    }
    
    applyTo(state) {
        var next = new State(state);

        //put the letter on the board
        next.board[this.movePosition] = state.turn;

        if(state.turn === "O")
            next.oMovesCount++;

        next.advanceTurn();

        return next;
    }
}

export default AiAction;
