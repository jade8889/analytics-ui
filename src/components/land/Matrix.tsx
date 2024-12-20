import { useApp } from "@pixi/react";
import { useState } from "react";
import Hexagon from "./Hexagon";
import {
  TileState,
  hexHeight,
  hexWidth,
  matrixSize,
  padding,
  sectionSize,
} from "@/src/contexts/MatrixStateContext";
import HexagonPadding from "./HexagonPadding";

const Matrix = ({
  displayCoordsRef,
  setTilesToBuy,
  tilesToBuy,
  buyMultMaxTiles,
  setPolygonMatrixState,
  currentSection,
  setCurrentTile,
}: {
  displayCoordsRef: React.RefObject<HTMLDivElement>;
  setTilesToBuy: React.Dispatch<React.SetStateAction<any[]>>;
  tilesToBuy: Array<any>;
  buyMultMaxTiles: number;
  setPolygonMatrixState: React.Dispatch<
    React.SetStateAction<Map<string, TileState>>
  >;
  currentSection: Array<number>;
  setCurrentTile: React.Dispatch<React.SetStateAction<[number, number]>>;
}) => {
  const app = useApp();

  // from coords to section
  // [row,col]
  // sectionSize = 10 meaning 10x10
  // sectionRow = abs(row / sectionSize)
  // sectionCol = abs(col / sectionSize)
  // [sectionRow, sectionCol] = [row,col] % sectionSize

  // from section to coords range
  // sectionRowStart = sectionRow * sectionSize
  // sectionRowEnd = sectionRow * sectionSize + sectionSize - 1
  // sectionColStart = sectionCol * sectionSize
  // sectionColEnd = sectionCol * sectionSize + sectionSize - 1

  const calcPos = (row: number, col: number) => {
    const y = row * hexHeight - 2;
    let x: number;
    if (row % 2 === 0) {
      x = col * 2 * hexWidth;
    } else {
      x = col * 2 * hexWidth + hexWidth;
    }

    return [x, y];
  };

  return (
    <>
      {new Array(sectionSize).fill(0).map((_, row) =>
        new Array(sectionSize).fill(0).map((_, col) => {
          const offsetRow = row + currentSection[0] * sectionSize;
          const offsetCol = col + currentSection[1] * sectionSize;

          if (offsetRow >= matrixSize || offsetCol >= matrixSize) return null;

          const [x, y] = calcPos(row, col);

          return (
            <Hexagon
              key={`${row},${col}`}
              x={x as number}
              y={y as number}
              row={offsetRow}
              col={offsetCol}
              displayCoordsRef={displayCoordsRef}
              setTilesToBuy={setTilesToBuy}
              buyMultMaxTiles={buyMultMaxTiles}
              tilesToBuy={tilesToBuy}
              setPolygonMatrixState={setPolygonMatrixState}
              setCurrentTile={setCurrentTile}
            />
          );
        })
      )}
      {/* {new Array(padding).fill(0).map((_, row) =>
        new Array(padding).fill(0).map((_, col) => {
          const offsetRowLeft = row + currentSection[0] * sectionSize;
          const offsetRowRight = row + currentSection[0] * sectionSize;
          const offsetColUp = col + currentSection[1] * sectionSize;
          const offsetColDown = col + currentSection[1] * sectionSize;

          if (offsetRow >= matrixSize || offsetCol >= matrixSize) return null;

          const [x, y] = calcPos(row, col);

          return (
            <HexagonPadding
              key={`${row},${col}`}
              x={x as number}
              y={y as number}
              row={offsetRow}
              col={offsetCol}
              displayCoordsRef={displayCoordsRef}
              setTilesToBuy={setTilesToBuy}
              buyMultMaxTiles={buyMultMaxTiles}
              tilesToBuy={tilesToBuy}
              setPolygonMatrixState={setPolygonMatrixState}
              setCurrentTile={setCurrentTile}
            />
          );
        })
      )} */}
      {/* <Sprite
        texture={hexagonRedSprite}
        width={10}
        height={11}
        {...(stageRef.current?.props &&
        stageRef.current.props.width &&
        stageRef.current.props.height
          ? {
              x: app.screen.width / 2,
              y: app.screen.height / 2,
            }
          : {})}
        renderable={false}
        ref={crosshairRef}
      /> */}
    </>
  );
};

export default Matrix;
