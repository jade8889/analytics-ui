import { useContext, useState } from "react";

import * as PIXI from "pixi.js";
import { Sprite } from "@pixi/react";
import {
  MatrixStateContext,
  TileState,
} from "@/src/contexts/MatrixStateContext";

const hexagonStaticSprite = PIXI.Texture.from("/sprites/static.png");
const hexagonStaticHoverSprite = PIXI.Texture.from("/sprites/hover.png");

const HexagonPadding = ({
  row,
  col,
  displayCoordsRef,
  setTilesToBuy,
  x,
  y,
  tilesToBuy,
  buyMultMaxTiles,
  setPolygonMatrixState,
  setCurrentTile,
}: {
  row: number;
  col: number;
  displayCoordsRef: React.RefObject<HTMLDivElement>;
  setTilesToBuy: React.Dispatch<React.SetStateAction<any[]>>;
  tilesToBuy: Array<any>;
  x: number;
  y: number;
  buyMultMaxTiles: number;
  setPolygonMatrixState: React.Dispatch<
    React.SetStateAction<Map<string, TileState>>
  >;
  setCurrentTile: React.Dispatch<React.SetStateAction<[number, number]>>;
}) => {
  const id = `${row},${col}`;
  const [type, setType] = useState(""); // isolated state

  const matrixState = useContext(MatrixStateContext);

  const tileState = matrixState.get(id);

  id == "28,57" ? console.log("28,57", tileState, type) : null;

  return (
    <Sprite
      texture={
        type == ""
          ? hexagonStaticSprite
          : type == "hover"
          ? hexagonStaticHoverSprite
          : hexagonStaticSprite
      }
      interactive={true}
      width={85}
      height={90}
      x={x}
      y={y}
      onmouseover={(e: any) => {
        console.log("hover id", id);
        if (displayCoordsRef.current)
          displayCoordsRef.current.innerText = `Coords: [${id}]`;
        if (type == "toBuy") {
          return;
        } else if (type == "") {
          setType("hover");
        }
      }}
      onmouseleave={(e: any) => {
        if (type == "toBuy") {
          return;
        } else if (type == "hover") {
          setType("");
        }
      }}
      onclick={(e: any) => {}}
    />
  );
};

export default HexagonPadding;
