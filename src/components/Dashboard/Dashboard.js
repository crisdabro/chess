import React from "react";
import { useEffect, useState } from "react";
import "./Dashboard.css";
import Tile from "../Tile/Tile.js";
import { PIECE_VALUE, BUTTONS } from "../../constants/constants";
import { getRandomNumberInRange } from "../../utils/math";
import { Button, Grid, Box } from "@material-ui/core";

const Dashboard = ({ fenCode }) => {
  const [dashboard, setDashboard] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);

  useEffect(() => {
    setDashboard(getDasboardByFenCode(fenCode));
  }, []);

  const getDasboardByFenCode = (fenCode) => {
    const rows = fenCode.split("/");
    const dashboard = [...Array(8)].map(() => Array(8));
    let backgroundColor = false;
    rows.forEach((rowString, rowIndex) => {
      let columnIndex = 0;
      [...rowString].forEach((char) => {
        // char is a piece
        if (isNaN(char)) {
          dashboard[rowIndex][columnIndex] = {
            value: char,
            row: rowIndex,
            col: columnIndex,
            backgroundColor,
          };
          columnIndex++;
          backgroundColor = !backgroundColor;
        }
        // char is a number that represents blank spaces
        else {
          for (let i = columnIndex; i < columnIndex + Number(char); i++) {
            dashboard[rowIndex][i] = {
              value: null,
              row: rowIndex,
              col: i,
              backgroundColor,
            };
            backgroundColor = !backgroundColor;
          }
          columnIndex += Number(char);
        }
      });
      backgroundColor = !backgroundColor;
    });
    return dashboard;
  };

  const addPawnToRandomTile = () => {
    clearPath();
    const freeTiles = getFreeTiles();
    if (freeTiles.length > 0) {
      const randomTile =
        freeTiles[getRandomNumberInRange(0, freeTiles.length - 1)];
      dashboard[randomTile.row][randomTile.col].value = PIECE_VALUE.WHITE.PAWN;
      setDashboard([...dashboard]);
    } else console.log("The dashboard is full");
  };

  const getFreeTiles = () => {
    let freeTiles = [];
    dashboard.forEach((row) => {
      const rowFreeTiles = row.filter((t) => t.value === null);
      if (rowFreeTiles) {
        freeTiles = freeTiles.concat(rowFreeTiles);
      }
    });
    return freeTiles;
  };

  const showAvailablePathForPiece = (piece) => {
    clearPath();
    setSelectedTile(piece);
    const { row, col } = piece;
    if (row > 0 && !dashboard[row - 1][col].value) {
      dashboard[row - 1][col].value = PIECE_VALUE.PATH;
    }
    if (row === 6 && !dashboard[row - 2][col].value) {
      dashboard[row - 2][col].value = PIECE_VALUE.PATH;
    }
    setDashboard([...dashboard]);
  };

  const clearPath = () => {
    setSelectedTile(null);
    dashboard.forEach((row) => {
      row.forEach((tile) => {
        if (tile.value === PIECE_VALUE.PATH) {
          dashboard[tile.row][tile.col].value = null;
        }
      });
    });
  };

  const movePawnToTile = (targetTile) => {
    const { row, col, value } = selectedTile;
    const { row: targetRow, col: targetCol } = targetTile;
    dashboard[row][col].value = null;
    dashboard[targetRow][targetCol].value =
      targetRow === 0 ? PIECE_VALUE.WHITE.QUEEN : value;
    clearPath();
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <div>
        {dashboard &&
          dashboard.map((row, index) => (
            <div key={index}>
              {row.map((tile, index) => (
                <Tile
                  key={index}
                  tile={tile}
                  handlePieceClick={showAvailablePathForPiece}
                  handlePathClick={movePawnToTile}
                />
              ))}
            </div>
          ))}
      </div>
      <Box mt={2}>
        <Button
          mt={5}
          variant="outlined"
          size="large"
          color="primary"
          onClick={addPawnToRandomTile}
        >
          {BUTTONS.ADD_PAWN}
        </Button>
      </Box>
    </Grid>
  );
};

export default Dashboard;
