import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { DefaultSession } from "next-auth";
import Image from "next/image";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!!!session) {
      router.push("/");
    }
  }, [session, router]);

  return session && session.user ? (
    <div>
      <h1 className="text-4xl mb-4 font-bold">Profile information</h1>
      {Object.keys(session.user).map((key: any) => {
        //TODO
        //@ts-ignore
        const value = session.user ? session.user[key] : "";
        return (
          <div className="mb-4" key={key}>
            <label className="block font-medium text-gray-900 dark:text-gray-300">
              {key}
            </label>
            <div>
              {key === "image" ? (
                <Image
                  src={value}
                  width={100}
                  height={100}
                  alt="profile picture"
                />
              ) : (
                value
              )}
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    "uhhhh, error?"
  );
};

export default ProfilePage;
