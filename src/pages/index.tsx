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
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello world!
    </>
  );
};

export default Home;
