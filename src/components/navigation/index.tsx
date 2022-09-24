import { useState, useEffect, useRef } from "react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import AccountIcon from "./../../assets/icons/AccountIcon.svg";
import { Button } from "../UI/Button";

export const Navigation = () => {
  let { data: session } = useSession();
  const [isUserMenuOpen, setisUserMenuOpen] = useState(false);
  useEffect(() => {
    document.addEventListener("click", (event: any) => {
      if (event.target.id !== "profilePicture") {
        setisUserMenuOpen(false);
      }
    });

    return document.removeEventListener("click", () => {});
  }, []);

  return (
    <div className="border-b border-slate-300/10">
      <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <div className="text-2xl font-semibold -translate-y-[3px] cursor-pointer">
                  chessthunder
                </div>
              </Link>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  {session ? (
                    <Image
                      className="h-8 w-8 rounded-full"
                      onClick={() => {
                        if (session) setisUserMenuOpen((prev) => !prev);
                      }}
                      src={
                        !!session.user?.image
                          ? session.user.image
                          : AccountIcon.src
                      }
                      width={32}
                      height={32}
                      alt="account profile picture"
                      id="profilePicture"
                    />
                  ) : (
                    <Button content="Sign in" href="/auth/signin" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`${
              isUserMenuOpen ? "" : "hidden"
            } parent drop-shadow-2xl bg-main-dark p-4 pt-2 absolute right-0 top-16 z-20 border rounded-md border-slate-300/30 grid grid-rows`}
          >
            <div className="-rotate-[45deg] -translate-y-[9px] absolute right-2 drop-shadow-2xl bg-main-dark z-20 border-t border-r h-4 w-4 border-slate-300/30" />
            <div className="border-b border-slate-300/30 mb-3 p-2">
              {session?.user?.name}
            </div>
            <Button
              content={"Profile"}
              href="/auth/profile"
              customClassName="border-0"
              onClick={() => {
                setisUserMenuOpen(false);
              }}
            />
            <Button
              onClick={async () => {
                await signOut();
                setisUserMenuOpen(false);
              }}
              content="Sign out"
              customClassName="border-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
