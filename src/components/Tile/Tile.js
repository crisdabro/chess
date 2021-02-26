import React from "react";
import "./Tile.css";
import { PIECE_VALUE, BUTTONS } from "../../constants/constants";

const Tile = ({ tile, handlePieceClick, handlePathClick }) => {
  return (
    <div className="tile">
      <div className={tile.backgroundColor ? "even" : "odd"}>
        {tile.value &&
          (tile.value === PIECE_VALUE.PATH ? (
            <button
              aria-label={BUTTONS.MOVE_TO_PATH}
              className={PIECE_VALUE.PATH}
              onClick={() => handlePathClick(tile)}
            ></button>
          ) : (
            <button
              className="button"
              aria-label={BUTTONS.SHOW_PATH}
              onClick={() => handlePieceClick(tile)}
            >
              {tile.value}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Tile;
