import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Container,
  Sprite,
  Stage,
  _ReactPixi,
  useApp,
  useTick,
} from "@pixi/react";
import { Address, useAccount } from "wagmi";
import useChain from "@/src/hooks/useChain";
import useTokenBalance from "@/src/hooks/useTokenBalance";
import { chains } from "@/src/statics/helpers/chains";
import useLandUserInfo from "@/src/hooks/Land/useLandUserInfo";
import useAllowance from "@/src/hooks/useAllowance";
import useApprove from "@/src/hooks/useApprove";
import {
  formatEther,
  hexToBigInt,
  maxUint256,
  parseEther,
  zeroAddress,
} from "viem";
import useBuyMultipleTiles from "@/src/hooks/Land/useBuyMultipleTiles";
import useClaimWheelRewards from "@/src/hooks/Wheel/useClaimWheelRewards";
import Image from "next/image";

import chest from "@/src/statics/images/chest.png";
import stone1 from "@/src/statics/images/stones/1.png";
import stone2 from "@/src/statics/images/stones/2.png";
import stone3 from "@/src/statics/images/stones/3.png";
import stone4 from "@/src/statics/images/stones/4.png";
import stone5 from "@/src/statics/images/stones/5.png";
import stone6 from "@/src/statics/images/stones/6.png";
import stone7 from "@/src/statics/images/stones/7.png";
import WalletConnectButton from "../common/WalletConnectButton";
import Footer from "../Navigation/footer";
import Script from "next/script";

import * as PIXI from "pixi.js";
import { CustomSprite } from "@/src/statics/helpers/types";
import useTile from "@/src/hooks/Land/useTile";
import useSetTileBenefactor from "@/src/hooks/Land/useSetTileBenefactor";
import useBuyTile from "@/src/hooks/Land/useBuyTile";
import MatrixStateProvider, {
  MatrixStateContext,
  TileState,
  matrixSize,
  sectionSize,
} from "@/src/contexts/MatrixStateContext";
import useHomeTile from "@/src/hooks/Land/useHomeTile";
import useJadeFee from "@/src/hooks/Land/useJadeFee";
import useRetrieveTiles from "@/src/hooks/Land/useRetrieveTiles";
import useClaim from "@/src/hooks/Land/useClaim";
import Matrix from "./Matrix";
import LiveBets from "../common/LiveBets";
import useBuyTileEvent from "@/src/hooks/events/useBuyTileEvent";

const Game = () => {
  /* game zone */
  const displayCoordsRef = useRef<HTMLDivElement>(null);
  const displaySectionRef = useRef<HTMLDivElement>(null);
  const gameZoneRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Stage>(null);
  const crosshairRef = useRef<PIXI.Sprite>(null);
  const [middlePointTile, setMiddlePointTile] = useState<Array<Number>>([0, 0]);

  /* chest stuff */

  /* action stuff */

  /* live bets */

  const [wager, setWager] = useState<number>(0);
  const [qty, setQty] = useState<string>("");
  const [wonAmount, setWonAmount] = useState("");
  const wagerRef = useRef<HTMLInputElement>(null);
  const qtyRef = useRef<HTMLInputElement>(null);
  const landUserInfo = useLandUserInfo();

  const [currentSection, setCurrentSection] = useState<Array<number>>([0, 0]);

  const homeTileRef = useRef<HTMLDivElement>(null);
  const rightArrowRef = useRef<HTMLDivElement>(null);
  const downArrowRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLDivElement>(null);
  const upArrowRef = useRef<HTMLDivElement>(null);
  const purchaseButtonRef = useRef<HTMLAnchorElement>(null);
  const benefactorAddrRef = useRef<HTMLInputElement>(null);
  const [benefactor, setBenefactor] = useState<string>("");

  const homeTile = useHomeTile();

  const [currentTile, setCurrentTile] = useState<[number, number]>([-1, -1]);
  const tile = useTile(...currentTile);

  const { address } = useAccount();
  const chainId = useChain();

  const userBalance = useTokenBalance(
    chains[chainId].contracts.jadeToken.address as Address
  );

  const allowance = useAllowance(
    chains[chainId].contracts.jadeToken.address as Address,
    chains[chainId].contracts.land.address as Address
  );

  const approveTX = useApprove(
    chainId,
    maxUint256,
    chains[chainId].contracts.jadeToken.address as Address,
    chains[chainId].contracts.land.address as Address,
    Number(allowance) == 0 ||
      (Number(wager) > 0 && parseEther(wager.toString()) > allowance)
  );

  const [tilesToBuy, setTilesToBuy] = useState<Array<any>>([]);
  console.log("tilesToBuy", tilesToBuy);
  useEffect(() => {
    setPolygonMatrixState((prev) => {
      const newMap = new Map(prev);

      for (let tile of tilesToBuy) {
        const row = tile[0];
        const col = tile[1];
        const id = `${row},${col}`;
        newMap.set(id, {
          type: "toBuy",
        });
      }

      return newMap;
    });
  }, [tilesToBuy.length]);

  // useEffect(() => {
  //   setWager(888 * tilesToBuy.length);
  // }, [tilesToBuy.length]);

  const buyTX = useBuyTile(0, 0);

  const buyMultipleTX = useBuyMultipleTiles(tilesToBuy, setTilesToBuy);

  const claimTX = useClaim(...currentTile);

  const setBenefactorTX = useSetTileBenefactor(
    currentTile[0],
    currentTile[1],
    benefactor
  );

  const jadeFee = useJadeFee();

  function isApproving() {
    return approveTX.confirmation.isLoading;
  }

  function isPlaying() {
    return buyMultipleTX.confirmation.isLoading;
  }

  function isClaiming() {
    return claimTX.confirmation.isLoading;
  }

  const containerRef = useRef<PIXI.Container>(null);

  function handleZoomIn(e: any) {
    e.preventDefault();
    e.stopPropagation();
    updateContainerScale(0.1);
  }
  function handleZoomOut(e: any) {
    e.preventDefault();
    e.stopPropagation();
    updateContainerScale(-0.1);
  }
  function updateContainerScale(scaleAmount: number) {
    if (containerRef.current) {
      if (
        (containerRef.current.scale.x > 0.25 && scaleAmount < 0) ||
        (containerRef.current.scale.x < 1 && scaleAmount > 0)
      ) {
        containerRef.current.scale.x += scaleAmount;
        containerRef.current.scale.y += scaleAmount;
      }
    }
  }

  const updateMiddlePoint = () => {
    // if (containerRef.current && crosshairRef.current && stageRef.current) {
    // let offsetX = 221.0598941839271;
    // let offsetY = 192.86666666666667 + 1.9999999999999432;

    // let pos = containerRef.current.children[0].toLocal(crosshairRef.current);

    // let row = parseInt((pos.y / offsetY) as any);
    // let col =
    //   row % 2 == 0
    //     ? parseInt((pos.x / offsetX) as any)
    //     : parseInt((pos.x / offsetX - 0.5) as any);

    const row = (currentSection[0] * sectionSize * 2 + sectionSize) / 2;
    const col = (currentSection[1] * sectionSize * 2 + sectionSize) / 2;
    console.log("updateMiddlePoint", [row, col]);

    setMiddlePointTile([row, col]);
    // }
  };

  useEffect(() => {
    updateMiddlePoint();
  }, [currentSection]);

  const [polygonMatrixState, setPolygonMatrixState] = useState<
    Map<string, TileState>
  >(new Map());

  const [toBuy, setToBuy] = useState([]);

  const handleHomeTileClick = (e: any) => {
    // if (!homeTile) {
    //   return;
    // }
    // const row = Number(homeTile[0]);
    // const col = Number(homeTile[1]);
    // if (containerRef.current && stageRef.current && row && col) {
    //   const [x, y] = calcPos(col, row);
    //   containerRef.current.pivot.x = x as number;
    //   containerRef.current.pivot.y = y as number;
    //   containerRef.current.x = (stageRef.current.props.width as number) / 2;
    //   containerRef.current.y = (stageRef.current.props.height as number) / 2;
    //   updateMiddlePoint();
    // }

    console.log("homeTile", homeTile);

    setCurrentSection((prev) => {
      return [
        Math.floor(homeTile[0] / sectionSize),
        Math.floor(homeTile[1] / sectionSize),
      ];
    });
  };

  useEffect(() => {
    if (landUserInfo.userTiles)
      setPolygonMatrixState((prev) => {
        const newMap = new Map(prev);

        for (let tile of landUserInfo.userTiles) {
          const row = Number(tile[0]);
          const col = Number(tile[1]);

          const id = `${row},${col}`;

          newMap.set(id, {
            type:
              Number(tile[2]) == 0
                ? "green"
                : Number(tile[3]) == 0
                ? "box_green"
                : "money_green",
          });
        }

        return newMap;
      });
  }, [landUserInfo.userTiles]);

  useEffect(() => {
    (window as any).isDragging = false;
    (window as any).initialPos = { x: 0, y: 0 };
    (window as any).hasMoved = false;
  }, []);

  function startDragging(e: { clientX: number; clientY: number }) {
    if (containerRef.current) {
      (window as any).isDragging = true;
      (window as any).initialPos = {
        x: e.clientX - containerRef.current.x,
        y: e.clientY - containerRef.current.y,
      };
    }
  }

  function dragMove(e: { clientX: number; clientY: number }) {
    if ((window as any).isDragging && containerRef.current) {
      (window as any).hasMoved = true;
      containerRef.current.x = e.clientX - (window as any).initialPos.x;
      containerRef.current.y = e.clientY - (window as any).initialPos.y;

      if (
        crosshairRef.current &&
        stageRef.current &&
        stageRef.current.props.width &&
        stageRef.current.props.height
      ) {
      }
    }
  }
  function stopDragging(e: any) {
    (window as any).isDragging = false;
    (window as any).hasMoved = false;
    updateMiddlePoint();
  }

  useRetrieveTiles(middlePointTile, setPolygonMatrixState);

  console.log("tilesToBuy", tilesToBuy);

  const buyTile = useBuyTileEvent();
  console.log("buyTile", buyTile);

  return (
    <>
      <div className="jade-land-game pb-120 mobile-pb-80 pt-100">
        <div className="scene_paralax left-scene">
          <div className="item" data-depth="0.1">
            <div className="coin bg1"></div>
          </div>
          <div className="item" data-depth="-0.05">
            <div className="coin bg2"></div>
          </div>
          <div className="item" data-depth="-0.071">
            <div className="coin bg3"></div>
          </div>
          <div className="item" data-depth="0.031">
            <div className="coin bg4"></div>
          </div>
          <div className="item" data-depth="-0.2">
            <div className="coin bg5"></div>
          </div>
          <div className="item" data-depth="0.3">
            <div className="coin bg6"></div>
          </div>
          <div className="item" data-depth="0.081">
            <div className="coin bg7"></div>
          </div>
          <div className="item" data-depth="-0.1">
            <div className="coin bg8"></div>
          </div>
          <div className="item" data-depth="0.24">
            <div className="coin bg9"></div>
          </div>
        </div>
        <div className="scene_paralax right-scene">
          <div className="item" data-depth="0.15">
            <div className="coin bg1"></div>
          </div>
          <div className="item" data-depth="-0.05">
            <div className="coin bg2"></div>
          </div>
          <div className="item" data-depth="0.051">
            <div className="coin bg3"></div>
          </div>
          <div className="item" data-depth="0.2">
            <div className="coin bg4"></div>
          </div>
          <div className="item" data-depth="-0.3">
            <div className="coin bg5"></div>
          </div>
          <div className="item" data-depth="0.2">
            <div className="coin bg6"></div>
          </div>
          <div className="item" data-depth="0.091">
            <div className="coin bg7"></div>
          </div>
          <div className="item" data-depth="-0.1">
            <div className="coin bg8"></div>
          </div>
        </div>

        <div className="wrap game-title">
          <div className="title-box">
            <div className="title-box-in">
              <h2>jade Land</h2>
              <div className="info_space">
                <div className="info_icon"></div>
                <div className="space">
                  <div className="text">
                    World&apos;s first +100% RTP decentralized gaming site.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="box-game d-flex d-flex-center">
            <div className="left box-rbg" ref={gameZoneRef}>
              <div className="space_map">
                <div id="winMessage" className="win-messages">
                  Win $51
                </div>
                <Stage
                  // className="overscroll-y-contain"
                  ref={stageRef}
                  id="gameZone"
                  options={{
                    backgroundColor: 0x05140e,
                    antialias: true,
                    resolution: window.devicePixelRatio || 1,
                    eventMode: "auto",
                  }}
                  height={gameZoneRef.current?.offsetHeight}
                  width={gameZoneRef.current?.offsetWidth}
                  onPointerDown={startDragging}
                  onPointerMove={dragMove}
                  onPointerUp={stopDragging}
                  // onWheel={(e) => {
                  //   if (e.deltaY < 0) {
                  //     handleZoomIn(e);
                  //   } else {
                  //     handleZoomOut(e);
                  //   }
                  //   updateMiddlePoint();
                  // }}
                >
                  <Container ref={containerRef} interactive={true}>
                    <MatrixStateProvider value={polygonMatrixState}>
                      <Matrix
                        displayCoordsRef={displayCoordsRef}
                        setTilesToBuy={setTilesToBuy}
                        tilesToBuy={tilesToBuy}
                        buyMultMaxTiles={landUserInfo.buyMultMaxTiles}
                        setPolygonMatrixState={setPolygonMatrixState}
                        currentSection={currentSection}
                        setCurrentTile={(e) => {
                          setBenefactor("");
                          setCurrentTile(e);
                        }}
                      />
                    </MatrixStateProvider>
                  </Container>
                </Stage>
              </div>
              <div className="control-map left-7 top-7 !w-[200px] !h-[49px] flex justify-center items-center">
                <div
                  ref={displaySectionRef}
                  className="flex justify-center items-center text-xl -tracking-[0.98px] uppercase"
                >
                  {`Section: [${currentSection[0]}, ${currentSection[1]}]`}
                </div>
              </div>
              <div className="control-map left-7 top-24 !w-[200px] !h-[49px] flex justify-center items-center">
                <div
                  id="displayCoords"
                  ref={displayCoordsRef}
                  className="flex justify-center items-center text-xl -tracking-[0.98px] uppercase"
                >
                  ...
                </div>
              </div>
              <div className="control-map">
                <button
                  id="zoomIn"
                  className="plus disable-dbl-tap-zoom"
                  onClick={handleZoomIn}
                >
                  +
                </button>
                <button
                  id="zoomOut"
                  className="minus disable-dbl-tap-zoom"
                  onClick={handleZoomOut}
                >
                  -
                </button>
              </div>
              <div
                id="homeTile"
                ref={homeTileRef}
                className="control-map !right-28 !h-12 !flex !items-center !justify-center !cursor-pointer"
                onClick={handleHomeTileClick}
              >
                <svg
                  className="h-7"
                  viewBox="0 -0.5 21 21"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>Home</title> <desc>Created with Sketch.</desc>{" "}
                    <defs> </defs>{" "}
                    <g
                      id="Page-1"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      {" "}
                      <g
                        id="path-color"
                        transform="translate(-419.000000, -720.000000)"
                        fill="#ffffff"
                      >
                        {" "}
                        <g
                          id="icons"
                          transform="translate(56.000000, 160.000000)"
                        >
                          {" "}
                          <path
                            d="M379.79996,578 L376.649968,578 L376.649968,574 L370.349983,574 L370.349983,578 L367.19999,578 L367.19999,568.813 L373.489475,562.823 L379.79996,568.832 L379.79996,578 Z M381.899955,568.004 L381.899955,568 L381.899955,568 L373.502075,560 L363,569.992 L364.481546,571.406 L365.099995,570.813 L365.099995,580 L372.449978,580 L372.449978,576 L374.549973,576 L374.549973,580 L381.899955,580 L381.899955,579.997 L381.899955,570.832 L382.514204,571.416 L384.001,570.002 L381.899955,568.004 Z"
                            id="home-[#ffffff]"
                          >
                            {" "}
                          </path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
              </div>
              {/* <div
                id="homeTile"
                ref={homeTileRef}
                className="control-map !right-38 !h-12 !flex !items-center !justify-center !cursor-pointer"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Refresh
              </div> */}
              {currentSection[1] < matrixSize / sectionSize - 1 ? (
                <div
                  id="right-arrow"
                  ref={rightArrowRef}
                  className="control-map !h-12 !flex !items-center !justify-center !cursor-pointer !bottom-1/2"
                  onClick={() => {
                    setCurrentSection((prev) => {
                      return [prev[0], prev[1] + 1];
                    });
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M6 12H18M18 12L13 7M18 12L13 17"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              ) : null}
              {currentSection[0] < matrixSize / sectionSize - 1 ? (
                <div
                  id="down-arrow"
                  ref={downArrowRef}
                  className="control-map !right-1/2 !h-12 !flex !items-center !justify-center !cursor-pointer"
                  onClick={() => {
                    setCurrentSection((prev) => {
                      return [prev[0] + 1, prev[1]];
                    });
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#FFFFFF"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M12 6V18M12 18L7 13M12 18L17 13"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              ) : null}
              {currentSection[1] > 0 ? (
                <div
                  id="left-arrow"
                  ref={leftArrowRef}
                  className="control-map !left-12 !h-12 !flex !items-center !justify-center !cursor-pointer !bottom-1/2"
                  onClick={() => {
                    setCurrentSection((prev) => {
                      return [prev[0], prev[1] - 1];
                    });
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#FFFFFF"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M6 12H18M6 12L11 7M6 12L11 17"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              ) : null}
              {currentSection[0] > 0 ? (
                <div
                  id="up-arrow"
                  ref={upArrowRef}
                  className="control-map !right-1/2 !h-12 !flex !items-center !justify-center !cursor-pointer !top-12"
                  onClick={() => {
                    setCurrentSection((prev) => {
                      return [prev[0] - 1, prev[1]];
                    });
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#FFFFFF"
                    transform="matrix(1, 0, 0, -1, 0, 0)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M12 6V18M12 18L7 13M12 18L17 13"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              ) : null}
            </div>
            {tile.coords[0] == -1 || tile.coords[1] == -1 ? null : (
              <div className="right box-rbg ">
                <div className="slider-stones owl-carousel">
                  <div className="item">
                    <div className="owner m-hide">
                      <div className="ttl">
                        Owner {`[${tile.coords[0]},${tile.coords[1]}]`}
                      </div>
                      <div id="rbTileOwner" className="inline-block owner-name">
                        {tile.owner
                          ? `${tile.owner.slice(0, 7)}...${tile.owner.slice(
                              -5
                            )}`
                          : "..."}
                      </div>
                      <input
                        type="hidden"
                        id="rbTileOwnerComplete"
                        value={tile.owner}
                      />
                      <svg
                        id="clipboard"
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          navigator.clipboard.writeText(tile.owner);
                        }}
                      >
                        <path
                          d="M8 5.00005C7.01165 5.00082 6.49359 5.01338 6.09202 5.21799C5.71569 5.40973 5.40973 5.71569 5.21799 6.09202C5 6.51984 5 7.07989 5 8.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V8.2C19 7.07989 19 6.51984 18.782 6.09202C18.5903 5.71569 18.2843 5.40973 17.908 5.21799C17.5064 5.01338 16.9884 5.00082 16 5.00005M8 5.00005V7H16V5.00005M8 5.00005V4.70711C8 4.25435 8.17986 3.82014 8.5 3.5C8.82014 3.17986 9.25435 3 9.70711 3H14.2929C14.7456 3 15.1799 3.17986 15.5 3.5C15.8201 3.82014 16 4.25435 16 4.70711V5.00005M15 12H12M15 16H12M9 12H9.01M9 16H9.01"
                          stroke="#FFFFFF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div id="clipboardTt" className="tooltiptext">
                        Copied!
                      </div>
                    </div>

                    <div className="stone">
                      <Image id="rbImg" src={chest} alt="" />
                    </div>
                    <div className="slider_description">
                      <div className="owner pc_hide">
                        <div className="ttl">
                          Owner {`[${tile.coords[0]},${tile.coords[1]}]`}
                        </div>
                        <div className="owner-name">
                          {tile.owner
                            ? `${tile.owner.slice(0, 7)}...${tile.owner.slice(
                                -5
                              )}`
                            : "..."}
                        </div>
                      </div>
                      <div id="rbStoneName" className="name_stone">
                        jade stone
                      </div>
                      <div id="rbStoneDesc" className="info-stone">
                        {`Set your friend's address below and make sure you got
                        any neighbouring tiles before claiming the reward!`}
                      </div>
                      <div className="buttons_block">
                        <input
                          id="benefactorAddr"
                          type="text"
                          className="w-full btn btn-border-white"
                          placeholder="ADDRESS"
                          value={
                            tile.benefactor != zeroAddress
                              ? tile.benefactor
                              : benefactor
                          }
                          ref={benefactorAddrRef}
                          onChange={(e) => setBenefactor(e.target.value)}
                        />
                        {tile.owner.toLowerCase() != address?.toLowerCase() ? (
                          <a
                            id="benefactorSet"
                            className="btn btn-border-white"
                            onClick={claimTX.transaction.write}
                          >
                            Unlock
                          </a>
                        ) : (
                          <a
                            id="benefactorSet"
                            className="btn btn-border-white"
                            onClick={setBenefactorTX.transaction.write}
                          >
                            Set
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-5 box-event box-rbg d-flex d-flex-center game-bar-mobile">
            {address ? (
              <div className="absolute float-left ml-6 amount-box">
                <div className="entry-content d-flex d-flex-center">
                  <div className="cent">
                    <div className="info-label">Wager $</div>
                    <input
                      type="number"
                      className="b-val"
                      value={jadeFee * tilesToBuy.length}
                      disabled
                    />
                  </div>
                </div>
              </div>
            ) : null}
            <div className="flex justify-center w-full">
              {!address ? (
                <WalletConnectButton />
              ) : (
                <>
                  {Number(allowance) >= wager && Number(allowance) != 0 ? (
                    landUserInfo.numTiles > 0 ? (
                      <a
                        id="purchaseButton"
                        className="btn btn-white"
                        ref={purchaseButtonRef}
                        // style="margin: auto;"
                        onClick={() => {
                          if (tilesToBuy.length == 0) return;
                          buyMultipleTX.transaction.write?.();
                        }}
                      >
                        {tilesToBuy.length == 0
                          ? "Select Tiles"
                          : `Buy Tiles ${tilesToBuy.length}/${landUserInfo.buyMultMaxTiles}`}
                      </a>
                    ) : (
                      <a
                        id="purchaseButton"
                        className="m-auto btn btn-white"
                        onClick={() => {
                          buyTX.transaction.write?.();
                          setTilesToBuy([]);
                        }}
                      >
                        Start Playing
                      </a>
                    )
                  ) : (
                    <a
                      id="purchaseButton"
                      className="m-auto btn btn-white"
                      onClick={() => {
                        approveTX.transaction.write?.();
                      }}
                    >
                      Approve
                    </a>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="block-content mt-m-60 mobile-pt-80 pt-100 mobile-pb-120 pb-180 bg-kind-stones bg-radius zindex3">
        <div className="wrap">
          <div className="kind-stones bg-inner-block bg-radius-30">
            <div className="top">
              <h2>your portfolio</h2>
              <div className="number">
                <div className="ls">{landUserInfo.numTiles}</div>
                <span>
                  amount
                  <br />
                  of tiles
                </span>
              </div>
            </div>
            <div className="list-kind-stones">
              <div className="item">
                <div className="img">
                  <Image src={stone1} alt="" />
                </div>
                <div className="name">Jade stone</div>
                <div className="price">{landUserInfo.jades} pcs</div>
              </div>
              <div className="item">
                <div className="img ">
                  <Image src={stone2} alt="" />
                </div>
                <div className="name">moon stone</div>
                <div className="price">{landUserInfo.moons} pcs</div>
              </div>
              <div className="item">
                <div className="img">
                  <Image src={stone3} alt="" />
                </div>
                <div className="name">sun stone</div>
                <div className="price">{landUserInfo.suns} pcs</div>
              </div>
              <div className="item">
                <div className="img">
                  <Image src={stone4} alt="" />
                </div>
                <div className="name">Silver Stone</div>
                <div className="price">{landUserInfo.silvers} pcs</div>
              </div>
              <div className="item">
                <div className="img">
                  <Image src={stone5} alt="" />
                </div>
                <div className="name">Golden stone</div>
                <div className="price">{landUserInfo.goldens} pcs</div>
              </div>
              <div className="item">
                <div className="img">
                  <Image src={stone6} alt="" />
                </div>
                <div className="name">Platinum stone</div>
                <div className="price">{landUserInfo.platinums} pcs</div>
              </div>
              <div className="item">
                <div className="img">
                  <Image src={stone7} alt="" />
                </div>
                <div className="name">Diamond stone</div>
                <div className="price">{landUserInfo.diamonds} pcs</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script
        src="/parallax.min.js"
        onReady={() => {
          const sceneMain = document.querySelector(".scene_paralax.left-scene");
          const sceneMain2 = document.querySelector(
            ".scene_paralax.right-scene"
          );
          if (sceneMain) {
            // @ts-ignore
            new Parallax(sceneMain, { relativeInput: true });
          }
          if (sceneMain2) {
            // @ts-ignore
            new Parallax(sceneMain2, { relativeInput: true });
          }
        }}
      />

      <LiveBets cols={["Time", "Player", "Wager"]}>
        {buyTile.reverse().map((newBuy: any) => {
          console.log("newBuy", newBuy);

          return (
            <tr key={`${Number(newBuy.row)},${Number(newBuy.col)}`}>
              <td>{new Date(newBuy.time).toLocaleTimeString()}</td>
              <td>{`${newBuy.owner.substring(0, 5)}...${newBuy.owner.substring(
                newBuy.owner.length - 3 - 1,
                newBuy.owner.length - 1
              )}`}</td>
              <td>{"888"}</td>
            </tr>
          );
        })}
      </LiveBets>
      <Footer />
    </>
  );
};

export default Game;
