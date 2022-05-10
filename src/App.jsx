import React from 'react';
import './App.css';
import Board from './components/Board';
import Button from './components/Button';
import Log from './components/Log';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      history: [],
      log: [<Log logClick={(i) => this.logClick(i)}
        key={0}
        value={0}
        log={'Go to game start'}
      />]
    }
    this.handleClick = this.handleClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.logClick = this.logClick.bind(this);
  }

  // This function returns "X", "O" or null if there is no winner
  calculateWinner(squares) {
    // All game winning combinations
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winCombos.length; i++) {
      const [a, b, c] = winCombos[i];

      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  // When key is clicked you will want to do something
  handleClick(i) {
    const squares = this.state.squares.slice();
    // This if statement prevents any action if the squares
    //  already has been checked or there is already a winner
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    this.state.history.push(this.state)

    const change = this.state.xIsNext ?
      {
        squares: [...this.state.squares].map((val, idx) => idx !== i ? val : "X"),
        xIsNext: false,
        history: [...this.state.history],
        log: [...this.state.log].concat(<Log logClick={(i) => this.logClick(i)}
          key={[...this.state.log].length}
          value={[...this.state.log].length}
          log={'Go to move # ' + [...this.state.log].length}
        />)
      } : {
        squares: [...this.state.squares].map((val, idx) => idx !== i ? val : "O"),
        xIsNext: true,
        history: [...this.state.history],
        log: [...this.state.log].concat(<Log logClick={(i) => this.logClick(i)}
          key={[...this.state.log].length}
          value={[...this.state.log].length}
          log={'Go to move # ' + [...this.state.log].length}
        />)
      }
    this.setState(change)
  }

  // When the game is over you will want to reset the game.
  resetGame(e) {
    e.preventDefault();
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      log: [<Log logClick={(i) => this.logClick(i)}
        key={0}
        value={0}
        log='Go to game start'
      />]
    })
  }

  logClick(e) {
    const btn = parseInt(e.target.value)
    const log = this.state.history[btn]

    this.setState(log)
  }

  getStatus() {
    let winner = this.calculateWinner(this.state.squares);
    let next = this.state.xIsNext ? "X" : "O";
    let status = winner ? `Winner: ${winner}` :
      this.state.squares.includes(null) ? `Next player: ${next}` : 'Tie Game!'
      return status
  }

  render() {

    return (
      <div className="game">
        <div className="game-board">
          <h1 className="game-title">Tic Tac Toe</h1>
          <Board
            squares={this.state.squares}
            handleClick={(i) => this.handleClick(i)}
          />
          <div className="game-info">
            <span className="game-info-text">{this.getStatus()}</span>
            <ol>{this.state.log}</ol>
          </div>
          <Button onClick={this.resetGame}
            className="reset-game"
          />
        </div>
      </div>
    );
  }
}

export default Game