import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: session } = useSession();
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  console.log({ home: session });
  return (
    <>
      <Head>
        <title>Chessthunder</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello world!
    </>
  );
};

export default Home;
