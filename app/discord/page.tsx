"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Heading from "./components/heading";
import Checkbox from "./components/checkbox";
import clsx from "clsx";

export default function DiscordPage() {
  const [showBadges, setShowBadges] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showGlobal, setShowGlobal] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [showFullBanner, setShowFullBanner] = useState(false);
  const [rounded, setRounded] = useState(true);
  const [placeholder, setPlaceholder] = useState("");
  const [code, setCode] = useState(``);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPlaceholder("989924991535566879");
  }, []);

  useEffect(() => {
    setCode(
      `https://widgets.nittwit.tech/discord/u?id=${placeholder}&badges=${showBadges}&logo=${showLogo}&global=${showGlobal}&banner=${showBanner}&full_banner=${
        showFullBanner && showBanner
      }&rounded=${rounded}`
    );
  }, [
    showBadges,
    showLogo,
    showGlobal,
    showBanner,
    showFullBanner,
    rounded,
    placeholder,
  ]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 750);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlaceholder(e.target.value);
  };

  return (
    <main className="bg-bg w-screen h-screen flex flex-row">
      <div className="flex flex-col w-[25vw] border-darkbg border-r-2 justify-center items-center">
        <div className="flex-1 flex flex-col justify-center items-center gap-2 w-full">
          <div className="flex flex-col justify-center items-start w-[70%]">
            <Heading>
              <h1 className="text-lg">User ID:</h1>
            </Heading>
            <input
              onChange={handleInputChange}
              placeholder="Discord ID"
              value={placeholder}
              type="text"
              className="bg-bg border-darkbg border-2 rounded-md focus:outline-none pl-2 w-full"
            />
          </div>
          <Checkbox
            subtitle="Show the user's badges"
            onChange={() => {
              setShowBadges(!showBadges);
            }}
            checked={showBadges}
          >
            Show Badges
          </Checkbox>
          <Checkbox
            subtitle="Show the Discord logo in the bottom right"
            onChange={() => {
              setShowLogo(!showLogo);
            }}
            checked={showLogo}
          >
            Show Discord Logo
          </Checkbox>
          <Checkbox
            subtitle={
              "Show the user's global name (The one you see in servers)"
            }
            onChange={() => {
              setShowGlobal(!showGlobal);
            }}
            checked={showGlobal}
          >
            Show Global Name
          </Checkbox>
          <Checkbox
            subtitle="Show the user's banner"
            onChange={() => {
              setShowBanner(!showBanner);
            }}
            checked={showBanner}
          >
            Show Banner
          </Checkbox>
          <Checkbox
            subtitle="If show banner is checked, show the user's full banner"
            className="ml-14 "
            disabled={!showBanner}
            onChange={() => {
              showBanner ? setShowFullBanner(!showFullBanner) : null;
            }}
            checked={showFullBanner}
          >
            Show Full Banner
          </Checkbox>
          <Checkbox
            subtitle="Round the border of the widget"
            onChange={() => {
              setRounded(!rounded);
            }}
            checked={rounded}
          >
            Rounded Border
          </Checkbox>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <iframe
          src={code}
          width="340"
          height={showFullBanner ? "192" : "120"}
          allowFullScreen
        ></iframe>

        <button
          onClick={async () => {
            await navigator.clipboard.writeText(`
          <iframe
            src=${code}
            width="340"
            height=${showFullBanner ? '"192"' : '"120"'}
            allowFullScreen
          ></iframe>
        `);
            setCopied(true);
          }}
          className={`bg-blurple px-4 py-2 rounded-md hover:bg-darkblurple active:bg-blurple mt-6`}
        >
          Copy Code
        </button>
      </div>
      <div className="fixed right-0">
        {copied ? <div className="bg-green-500 px-4 py-2 mr-4 mt-4 rounded-md">
          Copied!
        </div> : null}
      </div>
    </main>
  );
}
