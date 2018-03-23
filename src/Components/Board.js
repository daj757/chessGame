import React, { Component } from "react";
import Square from "../Components/Square";

export default class Board extends Component {
  makeSquare(x, y) {
    function getClasses() {
      var classes = "square color" + (x + y) % 2;
      return classes;
    }

    const chosen =
      x === this.props.chosen[0] && y === this.props.chosen[1] ? true : false;

    return (
      <Square
        key={x + "_" + y}
        posX={x}
        posY={y}
        classes={getClasses()}
        piece={this.props.layout[y][x]}
        chosen={chosen}
        possible={this.props.possible[y][x]}
        onClick={to => this.props.onClick(x, y, to)}
      />
    );
  }

  render() {
    var board = [];
    var cols = [];
    for (let y = 0; y < 8; y++) {
      cols = [];
      for (let x = 0; x < 8; x++) {
        cols.push(this.makeSquare(x, y));
      }
      board.push(
        <div key={y} className="boardRow">
          {" "}
          {cols}{" "}
        </div>
      );
    }
    return <div className="board"> {board} </div>;
  }
}
