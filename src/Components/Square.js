import React, { Component } from "react";
import Piece from "../Components/Piece";
export default class Square extends Component {
  render() {
    return (
      <div className={this.props.classes}>
        <Piece
          chosen={this.props.chosen}
          possible={this.props.possible}
          piece={this.props.piece}
          onClick={to => this.props.onClick(to)}
        />
      </div>
    );
  }
}
