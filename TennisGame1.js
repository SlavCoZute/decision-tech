var TennisGame1 = function(player1Name, player2Name) {
    this.scoreNames = ['Love', 'Fifteen', 'Thirty', 'Forty'];
    this.state = {
        playerNames: {
            player1: player1Name,
            player2: player2Name,
        },
        scoreBoard: {
            player1: 0,
            player2: 0,
        },
        game: {
            current: false,
            deuce: false,
            draw: false,
            advantage: false,
            end: false,
        }
    };
};

TennisGame1.prototype.getCurrentLeader = function() {
    const scores = [this.state.scoreBoard.player1, this.state.scoreBoard.player2];
    return scores[0] === scores[1]
        ? null
        : Object.keys(this.state.scoreBoard).find(player => this.state.scoreBoard[player] === Math.max(...scores))
};

TennisGame1.prototype.setGameState = function(scoreBoard) {
    const player1Score = scoreBoard.player1;
    const player2Score = scoreBoard.player2;
    const scoreDiff = Math.abs(player1Score - player2Score);
    if (player1Score === player2Score) {
        if (player1Score >= 3) {
            return this.state.game.deuce = true
        }
        return this.state.game.draw = true
    }

    if (player1Score >= 3 && player2Score >= 3) {
        if (scoreDiff >= 2) {
            return this.state.game.end = true
        }
        return this.state.game.advantage = true
    }

    if (scoreDiff >= 2 && (player1Score >= 4 || player2Score >= 4)) {
        return this.state.game.end = true
    }

    return this.state.game.current = true
};

TennisGame1.prototype.wonPoint = function(playerName) {
    this.state.scoreBoard[playerName] += 1;
};

TennisGame1.prototype.getScoreName = function(score) {
    return this.scoreNames[score]
};

TennisGame1.prototype.getScore = function() {
    let score;
    this.setGameState(this.state.scoreBoard);
    const gameState = this.state.game;
    const player1Score = this.state.scoreBoard.player1;
    const player2Score = this.state.scoreBoard.player2;
    if (gameState.advantage) {
        score = `Advantage ${this.getCurrentLeader()}`;
    } else if (gameState.current) {
        score = `${this.getScoreName(player1Score)}-${this.getScoreName(player2Score)}`;
    } else if (gameState.deuce) {
        score = 'Deuce';
    } else if (gameState.draw) {
        score = `${this.getScoreName(player1Score)}-All`;
    } else if (gameState.end) {
        score = `Win for ${this.getCurrentLeader()}`;
    } else {
        score = 'Error';
    }
    return score;
};

if (typeof window === "undefined") {
    module.exports = TennisGame1;
}