import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { Move } from "../../constants/schemas";
import { GameInfo } from "../../components/Game/GameInfo";
import { Chat } from "../../components/Chat";
import { MovesInfo } from "../../components/Game/MovesInfo";

const GamePage: NextPage = () => {
  const [game, setGame] = useState(new Chess());
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentMove, setCurrentMove] = useState<Move>();
  const [chessboardWidth, setChessboardWidth] = useState<number>(540);
  const [boardOrientation, setBoardOrientation] = useState<"white" | "black">(
    "white"
  );

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

  const { query } = useRouter();
  const gameId = query.gameId as string;
  const { data: gameInfo } = trpc.useQuery(["game.getGame", { id: gameId }]);

  const { mutateAsync: sendMoveMutation } = trpc.useMutation(["game.sendMove"]);

  trpc.useSubscription(["game.onSendMove", { gameId }], {
    onNext: (move: Move) => {
      setMoves((m) => [...m, move]);
      game.move(move.message);
    },
  });

  const safeGameMutate = (modify: any) => {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  };

  const moveBack = () => {
    safeGameMutate((game: any) => {
      game = game.undo();
    });
  };

  const onDrop = (sourceSquare: any, targetSquare: any) => {
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
      setCurrentMove(move);
      sendMoveMutation({ move: newMoveSan, gameId });
    }

    return true;
  };

  return (
    <>
      <Head>
        <title>Chessthunder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {gameInfo && (
        <div className="grid grid-cols-12 gap-4">
          <div className="flex flex-col col-span-2 max-h-136">
            <GameInfo game={gameInfo} />
            <Chat gameId={gameId} />
          </div>
          <div className="col-span-8">
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
          </div>
          <div className="col-span-2 max-h-96">
            <MovesInfo gameInfo={gameInfo} moves={moves} moveBack={moveBack} />
          </div>
        </div>
      )}
    </>
  );
};

export default GamePage;
