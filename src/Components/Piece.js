import React, { Component } from "react";

export default class Piece extends Component {
  handlePieceClick(to) {
    this.props.onClick(to);
  }
  mapTypeToPieceCode(type) {
    if (type === "K") return "j";
    if (type === "B") return "n";
    return "";
  }
  mapTypeArrayToPieceCodes(typeArray) {
    let pieceCodes = "";
    for (let i = 0; i < typeArray.length; i++) {
      pieceCodes += this.mapTypeToPieceCode(typeArray[i]);
    }
    return pieceCodes;
  }

  render() {
    const side = this.props.piece !== "" ? ` ${this.props.piece[0]}` : "";
    const chosen = this.props.chosen ? " chosen" : "";
    const possible = this.props.possible ? " possible" : "";
    const active = this.props.piece !== "" ? " active" : "";
    const type = this.props.piece !== "" ? ` ${this.props.piece[1]}` : "";
    return (
      <div
        className={"piece" + side + type + chosen + possible + active}
        onClick={() => this.handlePieceClick()}
      >
        {this.mapTypeToPieceCode(type[1])}
      </div>
    );
  }
}
