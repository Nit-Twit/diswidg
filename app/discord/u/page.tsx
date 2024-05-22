import clsx from "clsx";
import { getUser, getUserAvatar, getUserBanner, getUserFlags } from "./actions";
import Heading from "../components/heading";
import { FaDiscord } from "react-icons/fa";

export default async function iFrameContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = searchParams.id;
  const badges = searchParams.badges?.includes("true");
  const logo = searchParams.logo?.includes("true");
  const global = searchParams.global?.includes("true");
  const banner = searchParams.banner?.includes("true");
  const fullBanner = searchParams.full_banner?.includes("true");
  const rounded = searchParams.rounded?.includes("true");

  const user = await getUser(id as string).catch(() => {
    return false;
  });

  const userFlags = getUserFlags(user);

  if (!id) {
    return (
      <div className="w-[340px] h-[120px] bg-black">
        <h1>Missing ID</h1>
      </div>
    );
  } else {
    if (!user) {
      return (
        <div className="w-[340px] h-[120px] bg-black">
          <h1>User not found :/</h1>
        </div>
      );
    }

    const heightClasses = clsx({
      "h-[192px]": fullBanner,
      "h-[120px]": !fullBanner,
      "h-[72px]": !banner,
    });

    const roundedClasses = clsx({
      "rounded-lg": rounded,
      "": !rounded,
    });

    return (
      <div
        className={`${heightClasses} ${roundedClasses} w-[340px] bg-darkbg flex flex-col`}
      >
        <div
          className={`${
            rounded ? "rounded-t-lg" : ""
          } flex-1 w-full overflow-hidden flex justify-center items-center`}
          style={{ backgroundColor: user.banner_color }}
        >
          {getUserBanner(user) ? (
            <img
              className="w-full h-full object-cover object-center"
              src={getUserBanner(user) as string}
              alt="User Banner"
            />
          ) : (
            <h1 className="w-full h-full">{"\u200b"}</h1>
          )}
        </div>
        <div className="h-[72px] flex flex-row">
          <div className="flex-1 flex flexx-row justify-start items-center gap-2">
            <img
              src={getUserAvatar(user)}
              width={256}
              className="w-14 rounded-full ml-1"
            />
            <div className="flex flex-col">
              <Heading>
                <h1 className="m-0 p-0 h-5">
                  {global ? user.global_name : user.username}
                </h1>
              </Heading>
              {global ? (
                <h1 className="m-0 p-0 text-sm h-3 text-gray-300 flex align-middle justify-start items-center">
                  {user.username}
                </h1>
              ) : null}
            </div>
          </div>
          <div className="w-1/3 flex flex-col justify-end items-end ">
            {badges ? (
              <div className="rounded-md flex flex-row flex-1 gap-1 items-end justify-center mr-1">
                {userFlags.map((flag) => {
                  return (
                    <img
                      className="h-3 w-3"
                      src={`/badges/${flag}.png`}
                      key={flag}
                    ></img>
                  );
                })}
              </div>
            ) : null}
            <div className="h-4 mb-1 flex mt-3 flex-col justify-start items-end">
              {logo ? (
                <FaDiscord className="w-6 mr-1 text-[#75797d]" />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
