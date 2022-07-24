import type { NextPage } from "next";
import Head from "next/head";
import { QuickPlay } from "../components/QuickPlay";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Chessthunder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="grid grid-cols-2 gap-4 h-12 mb-4">
          <div className="border border-slate-300/20 rounded flex items-center justify-center hover:bg-slate-300/10 ease-in-out duration-300 cursor-pointer">
            Quick play
          </div>
          <div className="border border-slate-300/20 rounded flex items-center justify-center hover:bg-slate-300/10 ease-in-out duration-300 cursor-pointer">
            Games list
          </div>
        </div>
        <QuickPlay />
      </div>
    </>
  );
};

export default Home;
