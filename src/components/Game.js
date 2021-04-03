import React, { Component } from 'react'
import Board from './Board';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            full : false,
            history: [
                { squares: Array(9).fill(null) }
            ]
        }
    } 


    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);
        if (winner || squares[i]) {
            return;
        }
        else if (history.length === 9) {
            this.setState({
                full : true
            })
        } 
        
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        });

    }
    
    Restart() {
        this.setState({
            xIsNext: true,
            stepNumber: 0,
            full: false,
            history: [
                { squares: Array(9).fill(null) }
            ]
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const full = this.state.full; 
        let status;
        if (winner) {
            status = 'Le gagnant est ' + winner;
        } 
        else if (full && !winner){
            status="Égalité"
        }
        else {
            status = "C'est a " + (this.state.xIsNext ? 'X' : 'O') + " de jouer";
        }
        return (
            <div className="game">
                <div className="game-info">
                    <div>{status}</div>
                </div>
                <div className="game-board">
                    <Board onClick={(i) => this.handleClick(i)}
                        squares={current.squares} />
                </div>
                <button className="restart" onClick={() => this.Restart()}>
                    Restart
                </button>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            return squares[a];
        }
    }

    return null;
}