import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { GamesList } from "../components/GamesList";
import { QuickPlay } from "../components/QuickPlay";

const Home: NextPage = () => {
  const [activeButton, setActiveButton] = useState<"quickPlay" | "gamesList">(
    "quickPlay"
  );

  return (
    <>
      <Head>
        <title>Chessthunder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2"></div>
        <div className="col-span-8">
          <div className="grid grid-cols-2 gap-4 h-12 mb-4">
            <div
              className={`border border-slate-300/20 rounded flex items-center justify-center hover:bg-slate-300/10 ease-in-out duration-300 cursor-pointer ${
                activeButton == "quickPlay" ? "bg-slate-300/10" : ""
              }`}
              onClick={() => {
                setActiveButton("quickPlay");
              }}
            >
              Quick play
            </div>
            <div
              className={`border border-slate-300/20 rounded flex items-center justify-center hover:bg-slate-300/10 ease-in-out duration-300 cursor-pointer ${
                activeButton == "gamesList" ? "bg-slate-300/10" : ""
              }`}
              onClick={() => {
                setActiveButton("gamesList");
              }}
            >
              Games list
            </div>
          </div>
          {activeButton === "quickPlay" ? <QuickPlay /> : <GamesList />}
        </div>
      </div>
      <div className="col-span-2"></div>
    </>
  );
};

export default Home;
