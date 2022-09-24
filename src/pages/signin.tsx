import {
  getProviders,
  signIn,
  getCsrfToken,
  useSession,
} from "next-auth/react";
import { InferGetServerSidePropsType } from "next";
import { FaGithub, FaGoogle, FaSkull, FaInstagram } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { CtxOrReq } from "next-auth/client/_utils";
import { Input } from "../components/UI/Input";
import { Checkbox } from "../components/UI/Checkbox";
import Link from "next/link";
import { Button } from "../components/UI/Button";

const SignInPage = ({
  providers,
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);
  return (
    <div className="flex justify-center">
      <div className="w-2/3 p-16">
        <h1 className="text-center text-2xl font-semibold">chessthunder</h1>
        <h2 className="text-center text-4xl mt-5 font-semibold">
          Sign in to your account
        </h2>
        <div className="border border-slate-300/10 p-12 mt-10">
          <Input id="email" label="email" placeholder="8==>---" type="text" />
          <Input
            id="password"
            label="password"
            placeholder="supa secret"
            type="text"
            containerClass="mt-6"
          />
          <div className="grid grid-cols-2 mt-8">
            <div>
              <Checkbox id="rememberme" label="Remeber me" />
            </div>
            <div>
              <Link href="#">
                <div className="flex flex-row-reverse gap-2 cursor-pointer text-sm font-medium">
                  Forgor your password?{" "}
                  <FaSkull className="-translate-y-[-2px]" />
                </div>
              </Link>
            </div>
          </div>
          <Button content="Sign in" onClick={() => {}} customClassName="mt-6" />
          <div className="grid grid-cols-3 gap-2 mt-6 items-center">
            <div className="border border-slate-300/10 h-0" />
            <div className="text-center text-sm">or continue with</div>
            <div className="border border-slate-300/10 h-0" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              content={<FaGithub size={20} />}
              onClick={() => {
                signIn("github");
              }}
              customClassName="mt-6"
            />
            <Button
              content={<FaGoogle size={20} />}
              onClick={() => {
                signIn("google");
              }}
              customClassName="mt-6"
            />
            <Button
              content={<FaInstagram size={20} />}
              onClick={() => {
                signIn("instagram");
              }}
              customClassName="mt-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: CtxOrReq | undefined) => {
  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);
  return {
    props: { providers, csrfToken },
  };
};

export default SignInPage;
