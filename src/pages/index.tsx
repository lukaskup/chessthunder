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
        <QuickPlay />
      </div>
    </>
  );
};

export default Home;
