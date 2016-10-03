class State {
    /*
     * @param old [State]: old state to intialize the new state
     */
    constructor(old) {
        this.turn = "";

        /*
         the number of moves of the AI player
         */
        this.oMovesCount = 0;

        this.result = "running";

        this.board = [];

        if(typeof old !== "undefined") {
            // if the state is constructed using a copy of another state
            var len = old.board.length;
            this.board = new Array(len);
            for(var itr = 0 ; itr < len ; itr++) {
                this.board[itr] = old.board[itr];
            }

            this.oMovesCount = old.oMovesCount;
            this.result = old.result;
            this.turn = old.turn;
        }
    }
    

    advanceTurn() {
        this.turn = this.turn === "X" ? "O" : "X";
    }

    emptyCells() {
        var indxs = [];
        for(var itr = 0; itr < 9 ; itr++) {
            if(this.board[itr] === "E") {
                indxs.push(itr);
            }
        }
        return indxs;
    }

    isTerminal() {
        var B = this.board;

        //rows
        for(let i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        //columns
        for(let i = 0; i <= 2 ; i++) {
            if(B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        //diagonals
        for(let i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                this.result = B[i] + "-won";
                return true;
            }
        }

        var available = this.emptyCells();
        if(available.length == 0) {
            this.result = "draw";
            return true;
        }
        else {
            return false;
        }
    };

}

export default State;
