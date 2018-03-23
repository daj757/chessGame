import React, { Component } from "react";
import "./Chess.css";
import ChessMoves from "../Utils/ChessMoves";
import Board from "../Components/Board";

export default class Chess extends Component {
  constructor() {
    super();
    this.ChessMoves = new ChessMoves();
    this.state = {
      layout: this.getInitialBoardLayout(),
      chosen: [null, null],
      possible: Array.from({ length: 8 }, () =>
        Array.from({ length: 8 }, () => false)
      )
    };
  }

  getInitialBoardLayout() {
    return [
      ["", "", "", "", "", "rB_", "rK_", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""]
    ];
  }

  handleClick(x, y, to) {
    let layout = JSON.parse(JSON.stringify(this.state.layout));
    if (!this.state.promoting) {
      let whitesTurn = this.state.whitesTurn;
      let chosen = [null, null];
      const possible = Array.from({ length: 8 }, () =>
        Array.from({ length: 8 }, () => false)
      );
      const movements =
        this.ChessMoves.pieceMovements(x, y, this.state.layout) || [];

      //if you click your piece
      if (
        (whitesTurn && this.state.layout[y][x][0] === "w") ||
        (!whitesTurn && this.state.layout[y][x][0] === "r")
      ) {
        chosen = [x, y];
        for (let i = 0; i < movements.length; i++) {
          possible[movements[i][1]][movements[i][0]] = true;
        }
        this.setState({
          chosen: chosen,
          possible: possible
        });
      } else if (this.state.possible[y][x]) {
        //or if you click a place to move
        //was it a castle
        if (
          layout[this.state.chosen[1]][this.state.chosen[0]].substring(1, 3) ===
          "K_"
        ) {
          if (x === 2) {
            layout[y][3] = this.state.layout[y][0].substring(0, 2);
            layout[y][0] = "";
          } else if (x === 6) {
            layout[y][5] = this.state.layout[y][7].substring(0, 2);
            layout[y][7] = "";
          }
        }
        //

        layout[y][x] = this.state.layout[this.state.chosen[1]][
          this.state.chosen[0]
        ].substring(0, 2);
        layout[this.state.chosen[1]][this.state.chosen[0]] = "";

        //Update
        this.setState({
          layout: layout,
          chosen: chosen,
          possible: possible
        });
      }
    }
  }

  render() {
    return (
      <div className="chess">
        <div id="chess-message-turn">{this.state.messageTurn}</div>

        <Board
          layout={this.state.layout}
          chosen={this.state.chosen}
          possible={this.state.possible}
          onClick={(x, y, to) => this.handleClick(x, y, to)}
        />

        <div id="chess-message-state">{this.state.messageState}</div>
      </div>
    );
  }
}
