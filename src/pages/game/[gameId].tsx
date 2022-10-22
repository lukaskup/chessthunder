import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import MenuIcon from "../../assets/icons/MenuIcon.svg";
import ChatIcon from "../../assets/icons/ChatIcon.svg";
import ArrowBackIcon from "../../assets/icons/ArrowBackIcon.svg";
import ArrowForwardIcon from "../../assets/icons/ArrowForwardIcon.svg";
import SwapIcon from "../../assets/icons/SwapIcon.svg";
import { NavigationButton } from "../../components/Game/NavigationButton";
import { io } from "socket.io-client";
import { Socket } from "socket.io";

const Game: NextPage = () => {
  const [game, setGame] = useState(new Chess());
  const [chessboardWidth, setChessboardWidth] = useState<number>(540);
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    "white"
  );

  let socket;

  const chessboardRef = useRef<HTMLDivElement>(null);
  const handleWindowResize = () => {
    if (chessboardRef.current) {
      setChessboardWidth(chessboardRef.current.offsetWidth);
    }
  };

  const initSocket = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("user connected");
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    initSocket().then(() => {
      console.log("socket initialized");
    });
  }, []);

  useLayoutEffect(() => {
    handleWindowResize();
  }, []);

  const previousMovePreview = () => {};

  const nextMovePreview = () => {};

  function safeGameMutate(modify: any) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return; // exit if the game is over
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game: any) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function onDrop(sourceSquare: any, targetSquare: any) {
    let move = null;
    safeGameMutate((game: any) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
    });
    if (move === null) return false; // illegal move
    setTimeout(makeRandomMove, 200);
    return true;
  }

  return (
    <>
      <Head>
        <title>Chessthunder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="chessboard" ref={chessboardRef}>
        <Chessboard
          position={game.fen()}
          onPieceDrop={onDrop}
          boardWidth={chessboardWidth}
          showBoardNotation
          id={1}
          boardOrientation={boardOrientation}
        />
      </div>
      <div className="grid grid-cols-5">
        <NavigationButton iconSrc={MenuIcon.src} iconAlt="menu icon" disabled />
        <NavigationButton iconSrc={ChatIcon.src} iconAlt="chat icon" disabled />
        <NavigationButton
          iconSrc={SwapIcon.src}
          iconAlt="swap icon"
          onClick={() => {
            if (boardOrientation === "white") setBoardOrientation("black");
            if (boardOrientation === "black") setBoardOrientation("white");
          }}
        />
        <NavigationButton
          iconSrc={ArrowBackIcon.src}
          iconAlt="previous move icon"
          onClick={previousMovePreview}
          disabled
        />
        <NavigationButton
          iconSrc={ArrowForwardIcon.src}
          iconAlt="next move icon"
          onClick={nextMovePreview}
          disabled
        />
      </div>
    </>
  );
};

export default Game;
