import {
  getProviders,
  signIn,
  getCsrfToken,
  useSession,
} from "next-auth/react";
import { FaGithub, FaGoogle, FaSkull, FaDiscord } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CtxOrReq } from "next-auth/client/_utils";
import { Input } from "../../components/UI/Input";
import { Checkbox } from "../../components/UI/Checkbox";
import Link from "next/link";
import { Button } from "../../components/UI/Button";

interface UserLoginDto {
  email: string;
  password: string;
}

const SignInPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [userLoginDto, setUserLoginDto] = useState<UserLoginDto>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="flex justify-center">
      <div className="w-2/3 p-16">
        <h2 className="text-center text-4xl mt-5 font-semibold">
          Sign in to your account
        </h2>
        <div className="text-center mt-2 text-sm font-medium text-slate-300/60">
          or{" "}
          <Link href="/auth/signup">
            <span className="text-slate-300/90 underline cursor-pointer">
              sign up
            </span>
          </Link>{" "}
          if you don&apos;t have an account
        </div>
        <div className="border border-slate-300/10 p-12 mt-10">
          <Input
            id="email"
            label="email"
            placeholder="8==>---"
            type="text"
            value={userLoginDto.email}
            onChange={(e) =>
              setUserLoginDto((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
          <Input
            id="password"
            label="password"
            placeholder="supa secret"
            type="text"
            containerClass="mt-6"
            value={userLoginDto.password}
            onChange={(e) =>
              setUserLoginDto((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
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
          <Button
            onClick={async () => {
              const res = await signIn("credentials", {
                email: userLoginDto.email,
                password: userLoginDto.password,
              });
              console.log(res);
            }}
            customClassName="mt-6"
          >
            Sign in
          </Button>
          <div className="grid grid-cols-3 gap-2 mt-6 items-center">
            <div className="border border-slate-300/10 h-0" />
            <div className="text-center text-sm">or continue with</div>
            <div className="border border-slate-300/10 h-0" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={() => {
                signIn("github");
              }}
              customClassName="mt-6"
            >
              <FaGithub size={20} />
            </Button>
            <Button
              onClick={() => {
                signIn("google");
              }}
              customClassName="mt-6"
            >
              <FaGoogle size={20} />
            </Button>
            <Button
              onClick={() => {
                signIn("discord");
              }}
              customClassName="mt-6"
            >
              <FaDiscord size={20} />
            </Button>
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
