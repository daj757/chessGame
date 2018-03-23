export default function ChessMoves() {
  return {
    pieceMovements: pieceMovements
  };

  function pieceMovements(pieceX, pieceY, layout) {
    //First find out the side and piece type
    var pieceId = layout[pieceY][pieceX];
    if (pieceId === "") return;

    var side = pieceId[0].toLowerCase();
    var type = pieceId[1].toLowerCase();

    switch (type) {
      case "k":
        return moveKnight();
      case "b":
        return moveBishop();
      default:
        console.warn("Unknown piece type ");
    }

    function moveKnight() {
      var movements = [];

      var m;

      m = getUpLeft();
      if (m) movements.push(m);

      m = getUpRight();
      if (m) movements.push(m);

      m = getLeftUp();
      if (m) movements.push(m);

      m = getLeftDown();
      if (m) movements.push(m);

      m = getDownLeft();
      if (m) movements.push(m);

      m = getDownRight();
      if (m) movements.push(m);

      m = getRightUp();
      if (m) movements.push(m);

      m = getRightDown();
      if (m) movements.push(m);

      return movements;
      //==============

      //eight possible movements
      function getUpLeft() {
        if (isVE(pieceX - 1, pieceY - 2)) return [pieceX - 1, pieceY - 2];
      }
      function getUpRight() {
        if (isVE(pieceX + 1, pieceY - 2)) return [pieceX + 1, pieceY - 2];
      }
      function getLeftUp() {
        if (isVE(pieceX - 2, pieceY - 1)) return [pieceX - 2, pieceY - 1];
      }
      function getLeftDown() {
        if (isVE(pieceX - 2, pieceY + 1)) return [pieceX - 2, pieceY + 1];
      }
      function getDownLeft() {
        if (isVE(pieceX - 1, pieceY + 2)) return [pieceX - 1, pieceY + 2];
      }
      function getDownRight() {
        if (isVE(pieceX + 1, pieceY + 2)) return [pieceX + 1, pieceY + 2];
      }
      function getRightUp() {
        if (isVE(pieceX + 2, pieceY - 1)) return [pieceX + 2, pieceY - 1];
      }
      function getRightDown() {
        if (isVE(pieceX + 2, pieceY + 1)) return [pieceX + 2, pieceY + 1];
      }
    }

    function moveBishop() {
      var movements = [];

      var m;

      m = getUpLeft();
      if (m) movements = movements.concat(m);

      m = getUpRight();
      if (m) movements = movements.concat(m);

      m = getDownLeft();
      if (m) movements = movements.concat(m);

      m = getDownRight();
      if (m) movements = movements.concat(m);

      return movements;
      //================
      //check four diagonals
      function getUpLeft() {
        var submovements = [];
        var curX = pieceX - 1;
        var curY = pieceY - 1;
        while (isV(curX, curY)) {
          submovements.push([curX, curY]);
          curX--;
          curY--;
        }
        if (isE(curX, curY)) submovements.push([curX, curY]);
        return submovements;
      }
      function getUpRight() {
        var submovements = [];
        var curX = pieceX + 1;
        var curY = pieceY - 1;
        while (isV(curX, curY)) {
          submovements.push([curX, curY]);
          curX++;
          curY--;
        }
        if (isE(curX, curY)) submovements.push([curX, curY]);
        return submovements;
      }
      function getDownLeft() {
        var submovements = [];
        var curX = pieceX - 1;
        var curY = pieceY + 1;
        while (isV(curX, curY)) {
          submovements.push([curX, curY]);
          curX--;
          curY++;
        }
        if (isE(curX, curY)) submovements.push([curX, curY]);
        return submovements;
      }
      function getDownRight() {
        var submovements = [];
        var curX = pieceX + 1;
        var curY = pieceY + 1;
        while (isV(curX, curY)) {
          submovements.push([curX, curY]);
          curX++;
          curY++;
        }
        if (isE(curX, curY)) submovements.push([curX, curY]);
        return submovements;
      }
    }

    //if location is onBoard
    function onB(x, y) {
      return x < 8 && x >= 0 && y < 8 && y >= 0;
    }
    //if location is vacant
    function isV(x, y) {
      return onB(x, y) && layout[y][x] === "";
    }
    function isE(x, y) {
      return onB(x, y) && layout[y][x][0] !== side;
    }
    function isVE(x, y) {
      return isV(x, y) || isE(x, y);
    }
  }
}
