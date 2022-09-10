import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const Game: NextPage = () => {
  //   const router = useRouter();
  //   const { gameId } = router.query;
  const [game, setGame] = useState(new Chess());
  const [chessboardWidth, setChessboardWidth] = useState<number>(540);
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
        />
      </div>
      <div className="grid grid-cols-5">
        <div className="col">back</div>
        <div className="col">back</div>
        <div className="col">back</div>
        <div className="col">back</div>
      </div>
    </>
  );
};

export default Game;
