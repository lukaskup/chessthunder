import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

const Game: NextPage = () => {
  //   const router = useRouter();
  //   const { gameId } = router.query;
  const [game, setGame] = useState(new Chess());

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
      <div id="chessboard">
        <div className="leftPanel">chat</div>
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
        <div className="rightPanel">
          <div className="movesList">moves</div>
          <div className="">buttons</div>
        </div>
      </div>
    </>
  );
};

export default Game;
