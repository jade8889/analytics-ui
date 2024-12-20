import { useContext, useState } from "react";

import * as PIXI from "pixi.js";
import { Sprite } from "@pixi/react";
import {
  MatrixStateContext,
  TileState,
} from "@/src/contexts/MatrixStateContext";

const hexagonStaticSprite = PIXI.Texture.from("/sprites/static.png");

const hexagonStaticHoverSprite = PIXI.Texture.from("/sprites/hover.png");
const hexagonStaticActiveSprite = PIXI.Texture.from("/sprites/selected.png");
const hexagonGreenSprite = PIXI.Texture.from("/sprites/green.png");
const hexagonRedSprite = PIXI.Texture.from("/sprites/red.png");
const hexagonBoxGreenSprite = PIXI.Texture.from("/sprites/box_green.png");
const hexagonBoxRedSprite = PIXI.Texture.from("/sprites/box_red.png");
const hexagonMoneyRedSprite = PIXI.Texture.from("/sprites/money_red.png");
const hexagonMoneyGreenSprite = PIXI.Texture.from("/sprites/money_green.png");

const Hexagon = ({
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

  if (tileState) {
    if (tileState.type == "green") {
      return (
        <Sprite
          texture={hexagonGreenSprite}
          interactive={true}
          width={85}
          height={90}
          x={x}
          y={y}
          onmouseover={(e: any) => {
            if (displayCoordsRef.current)
              displayCoordsRef.current.innerText = `Coords: [${id}]`;
          }}
        />
      );
    } else if (tileState.type == "toBuy") {
      return (
        <Sprite
          texture={hexagonStaticActiveSprite}
          interactive={true}
          width={85}
          height={90}
          x={x}
          y={y}
          onmouseover={(e: any) => {
            if (displayCoordsRef.current)
              displayCoordsRef.current.innerText = `Coords: [${id}]`;
          }}
          onclick={() => {
            setTilesToBuy((prevState: any) => {
              return prevState.filter(
                (item: any) => item[0] !== row || item[1] !== col
              );
            });

            setPolygonMatrixState((prev) => {
              const newMap = new Map(prev);

              newMap.delete(`${row},${col}`);

              return newMap;
            });
          }}
        />
      );
    } else if (tileState.type == "box_green") {
      return (
        <Sprite
          texture={hexagonBoxGreenSprite}
          interactive={true}
          width={85}
          height={90}
          x={x}
          y={y}
          onmouseover={(e: any) => {
            if (displayCoordsRef.current)
              displayCoordsRef.current.innerText = `Coords: [${id}]`;
          }}
          onclick={() => {
            setCurrentTile((prev) => [row, col]);
          }}
        />
      );
    } else if (tileState.type == "box_red") {
      return (
        <Sprite
          texture={hexagonBoxRedSprite}
          interactive={true}
          width={85}
          height={90}
          x={x}
          y={y}
          onmouseover={(e: any) => {
            if (displayCoordsRef.current)
              displayCoordsRef.current.innerText = `Coords: [${id}]`;
          }}
          onclick={() => {
            setCurrentTile((prev) => [row, col]);
          }}
        />
      );
    } else if (tileState.type == "red") {
      return (
        <Sprite
          texture={hexagonRedSprite}
          interactive={false}
          width={85}
          height={90}
          x={x}
          y={y}
          onmouseover={(e: any) => {
            if (displayCoordsRef.current)
              displayCoordsRef.current.innerText = `Coords: [${id}]`;
          }}
        />
      );
    } else if (tileState.type == "money_red") {
      return (
        <Sprite
          texture={hexagonMoneyRedSprite}
          interactive={true}
          width={85}
          height={90}
          x={x}
          y={y}
          onmouseover={(e: any) => {
            if (displayCoordsRef.current)
              displayCoordsRef.current.innerText = `Coords: [${id}]`;
          }}
        />
      );
    } else if (tileState.type == "money_green") {
      return (
        <Sprite
          texture={hexagonMoneyGreenSprite}
          interactive={true}
          width={85}
          height={90}
          x={x}
          y={y}
          onmouseover={(e: any) => {
            if (displayCoordsRef.current)
              displayCoordsRef.current.innerText = `Coords: [${id}]`;
          }}
        />
      );
    }
  } else {
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
        onclick={(e: any) => {
          setCurrentTile((prev) => [-1, -1]);

          if ((window as any).hasMoved == true) return;

          if (type == "hover") {
            if (tilesToBuy.length >= buyMultMaxTiles) return;

            setTilesToBuy((prevState: any) => {
              console.log("tilesToBuy clicking", prevState);
              const found = prevState.some(
                (item: any) => item[0] === row && item[1] === col
              );
              if (!found) {
                const temp = [...prevState];
                temp.push([row, col]);

                setPolygonMatrixState((prev) => {
                  const newMap = new Map(prev);

                  const idx = `${row},${col}`;
                  newMap.set(idx, {
                    type: "toBuy",
                  });

                  return newMap;
                });
                return temp;
              } else {
                return prevState;
              }
            });
          }
        }}
      />
    );
  }
};

export default Hexagon;
