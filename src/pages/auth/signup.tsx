import {
  getProviders,
  signIn,
  getCsrfToken,
  useSession,
} from "next-auth/react";
import { FaGithub, FaGoogle, FaDiscord } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CtxOrReq } from "next-auth/client/_utils";
import { Input } from "../../components/UI/Input";
import Link from "next/link";
import { Button } from "../../components/UI/Button";
import { trpc } from "../../utils/trpc";

interface UserSignupDto {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

const SignUpPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userDto, setUserDto] = useState<UserSignupDto>({
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });
  const signup = trpc.useMutation("auth.signup");
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSingup = () => {
    signup.mutate(userDto);
  };

  return (
    <div className="flex justify-center">
      <div className="w-2/3 p-16">
        <h2 className="text-center text-4xl mt-5 font-semibold">
          Create an account
        </h2>
        <div className="text-center mt-2 text-sm font-medium text-slate-300/60">
          or{" "}
          <Link href="/auth/signin">
            <span className="text-slate-300/90 underline cursor-pointer">
              sign in
            </span>
          </Link>{" "}
          if you already have an account
        </div>
        <div className="border border-slate-300/10 p-12 mt-10">
          <Input
            id="email"
            label="email"
            placeholder="8==>---"
            type="text"
            value={userDto.email}
            onChange={(e) =>
              setUserDto((prev) => {
                return { ...prev, email: e.target.value };
              })
            }
          />
          <Input
            id="name"
            label="name"
            placeholder="8==>---"
            type="text"
            containerClass="mt-6"
            value={userDto.name}
            onChange={(e) =>
              setUserDto((prev) => {
                return { ...prev, name: e.target.value };
              })
            }
          />
          <Input
            id="password"
            label="password"
            placeholder="supa secret"
            type="text"
            containerClass="mt-6"
            value={userDto.password}
            onChange={(e) =>
              setUserDto((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
          />
          <Input
            id="confirm-password"
            label="confirm password"
            placeholder="supa secret"
            type="text"
            containerClass="mt-6"
            value=""
            onChange={() => {}}
          />
          <Button
            content="Sign up"
            onClick={handleSingup}
            customClassName="mt-6"
          />
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
              content={<FaDiscord size={20} />}
              onClick={() => {
                signIn("discord");
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

export default SignUpPage;
