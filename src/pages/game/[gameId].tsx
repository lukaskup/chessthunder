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
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { Move } from "../../constants/schemas";
import { v4 as uuid4 } from "uuid";

const Game: NextPage = () => {
  const [game, setGame] = useState(new Chess());
  const [moves, setMoves] = useState<Move[]>([]);
  const [chessboardWidth, setChessboardWidth] = useState<number>(540);
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    "white"
  );
  const { query } = useRouter();
  const gameId = query.gameId as string;
  const { mutateAsync: sendMoveMutation } = trpc.useMutation(["game.sendMove"]);

  trpc.useSubscription(["game.onSendMove", { gameId }], {
    onNext: (move: Move) => {
      setMoves((m) => {
        return [...m, move];
      });
      game.move(move.message);
    },
  });

  const chessboardRef = useRef<HTMLDivElement>(null);
  const handleWindowResize = () => {
    if (chessboardRef.current) {
      setChessboardWidth(chessboardRef.current.offsetWidth);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
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

  function onDrop(sourceSquare: any, targetSquare: any) {
    let move = null;
    safeGameMutate((game: any) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
    });
    if (move === null) {
      return false;
    } else {
      //@ts-ignore
      const newMoveSan = move.san;
      sendMoveMutation({ move: newMoveSan, gameId });
    }

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
      {moves.map((move) => (
        <div key={uuid4()}>{move.message}</div>
      ))}
    </>
  );
};

export default Game;
