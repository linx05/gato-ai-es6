import State from './state';


class AiAction {

    constructor (pos) {
        this.movePosition = pos;

        this.minimaxVal = 0;
    }

    applyTo (state) {
        var next = new State(state);

        next.board[this.movePosition] = state.turn;

        if (state.turn === "O")
            next.oMovesCount++;

        next.advanceTurn();

        return next;
    }

    static ASCENDING (firstAction, secondAction) {
        if (firstAction.minimaxVal < secondAction.minimaxVal)
            return -1; //indicates that firstAction goes before secondAction
        else if (firstAction.minimaxVal > secondAction.minimaxVal)
            return 1; //indicates that secondAction goes before firstAction
        else
            return 0; //indicates a tie
    }

    static DESCENDING (firstAction, secondAction) {
        if (firstAction.minimaxVal > secondAction.minimaxVal)
            return -1; //indicates that firstAction goes before secondAction
        else if (firstAction.minimaxVal < secondAction.minimaxVal)
            return 1; //indicates that secondAction goes before firstAction
        else
            return 0; //indicates a tie
    }
}

export default AiAction;
