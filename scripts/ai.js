import AiAction from "./aiAction.js";
import Game from "./game.js"


class AI {

    constructor(level='blind') {
        this.game = null;

        this.levelOfIntelligence = level;

    }

    makeRandomMove() {
        var available = this.game.currentState.emptyCells();
        var randomCell = available[Math.floor(Math.random() * available.length)];
        var action = new AiAction(randomCell);

        return action.movePosition;
    }

    minimaxValue(state) {
        if(state.isTerminal()) {
            //a terminal game state is the base case
            return Game.score(state);
        }
        else {
            var stateScore; // this stores the minimax value we'll compute

            if(state.turn === "X")
            // X wants to maximize --> initialize to a value smaller than any possible score
                stateScore = -1000;
            else
            // O wants to minimize --> initialize to a value larger than any possible score
                stateScore = 1000;

            let availablePositions = state.emptyCells();

            //enumerate next available states using the info form available positions
            var availableNextStates = availablePositions.map(function(pos) {
                let action = new AiAction(pos);

                return action.applyTo(state);
            });

            /* calculate the minimax value for all available next states
             * and evaluate the current state's value */
            availableNextStates.forEach(nextState => {
                var nextScore = this.minimaxValue(nextState);
                if(state.turn === "X") {
                    // X wants to maximize --> update stateScore iff nextScore is larger
                    if(nextScore > stateScore)
                        stateScore = nextScore;
                }
                else {
                    // O wants to minimize --> update stateScore iff nextScore is smaller
                    if(nextScore < stateScore)
                        stateScore = nextScore;
                }
            });

            return stateScore;
        }
    }

    plays(game){
        this.game = game;
    };


    notify(turn, callback) {
        let indx = this.makeRandomMove(turn);
        switch(this.levelOfIntelligence) {
            case "blind":
                indx = this.makeRandomMove(turn);
                break;
            case "master":
                indx = this.takeAMasterMove(turn);
                break;
        }
        callback(indx);
    };

    takeAMasterMove(turn) {
        let available = this.game.currentState.emptyCells();

        let availableActions = available.map(pos => {
            let action =  new AiAction(pos);
            let next = action.applyTo(this.game.currentState);

            action.minimaxVal = this.minimaxValue(next);

            return action;
        });

        if(turn === "X")
        //X maximizes --> sort the actions in a descending manner to have the action with maximum minimax at first
            availableActions.sort(AiAction.DESCENDING);
        else
        //O minimizes --> sort the actions in an ascending manner to have the action with minimum minimax at first
            availableActions.sort(AiAction.ASCENDING);


        //take the first action as it's the optimal
        let chosenAction = availableActions[0];
        return chosenAction.movePosition;
    }
}


export default AI;
