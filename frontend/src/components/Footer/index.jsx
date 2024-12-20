import System from "@/models/system";
import paths from "@/utils/paths";
import {
  BookOpen,
  DiscordLogo,
  GithubLogo,
  Briefcase,
  Envelope,
  Globe,
  HouseLine,
  Info,
  LinkSimple,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import SettingsButton from "../SettingsButton";
import { isMobile } from "react-device-detect";
import { Tooltip } from "react-tooltip";
import { v4 } from "uuid";
import useUser from "@/hooks/useUser";

export const MAX_ICONS = 3;
export const ICON_COMPONENTS = {
  BookOpen: BookOpen,
  DiscordLogo: DiscordLogo,
  GithubLogo: GithubLogo,
  Envelope: Envelope,
  LinkSimple: LinkSimple,
  HouseLine: HouseLine,
  Globe: Globe,
  Briefcase: Briefcase,
  Info: Info,
};

// Last Update Indicator Component
const LastUpdateIndicator = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Last update date - manually set or from build process
  const lastUpdateDate = "12/19/2024";

  return (
    <div
      className="relative text-center cursor-help select-none mt-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle dot indicator */}
      <div className="h-1 w-1 bg-gray-300 rounded-full mx-auto mb-1 opacity-30 hover:opacity-100 transition-opacity"></div>

      {/* Tooltip that appears on hover */}
      {isHovered && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 
            bg-gray-800 text-white text-xs px-3 py-1 rounded-md shadow-lg
            transition-all duration-300 ease-in-out z-50 hover:cursor-pointer"
        >
          Last Update: {lastUpdateDate}
          <div
            className="absolute bottom-[-5px] left-1/2 transform -translate-x-1/2 
              rotate-45 h-2 w-2 bg-gray-800 hover:cursor-pointer"
          ></div>
        </div>
      )}
    </div>
  );
};

export default function Footer() {
  const [footerData, setFooterData] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    async function fetchFooterData() {
      const { footerData } = await System.fetchCustomFooterIcons();
      setFooterData(footerData);
    }
    fetchFooterData();
  }, []);

  // wait for some kind of non-false response from footer data first
  // to prevent pop-in.
  if (footerData === false) return null;

  if (!Array.isArray(footerData) || footerData.length === 0) {
    return (
      <>
        <div className="flex justify-center mb-2">
          <div className="flex space-x-4">
            <ToolTipWrapper id="open-github">
              <a
                href={paths.github()}
                target="_blank"
                rel="noreferrer"
                className="transition-all duration-300 p-2 rounded-full text-white hover:bg-[#8497ad] bg-menu-item-selected-gradient hover:border-slate-100 hover:border-opacity-50 border-transparent border"
                aria-label="Find us on Github"
                data-tooltip-id="open-github"
                data-tooltip-content="View source code on Github"
              >
                <GithubLogo weight="fill" className="h-5 w-5 " />
              </a>
            </ToolTipWrapper>
            <ToolTipWrapper id="open-documentation">
              <a
                href={paths.docs()}
                target="_blank"
                rel="noreferrer"
                className="w-fit transition-all duration-300 p-2 rounded-full text-white hover:bg-[#8497ad] bg-menu-item-selected-gradient hover:border-slate-100 hover:border-opacity-50 border-transparent border"
                aria-label="Docs"
                data-tooltip-id="open-documentation"
                data-tooltip-content="Open Outamation AI help docs"
              >
                <BookOpen weight="fill" className="h-5 w-5 " />
              </a>
            </ToolTipWrapper>
            <ToolTipWrapper id="open-discord">
              <a
                href={paths.discord()}
                target="_blank"
                rel="noreferrer"
                className="transition-all duration-300 p-2 rounded-full text-white hover:bg-[#8497ad] bg-menu-item-selected-gradient hover:border-slate-100 hover:border-opacity-50 border-transparent border"
                aria-label="Join our Discord server"
                data-tooltip-id="open-discord"
                data-tooltip-content="Join the Outamation AI Discord"
              >
                <DiscordLogo
                  weight="fill"
                  className="h-5 w-5 stroke-slate-200 group-hover:stroke-slate-200"
                />
              </a>
            </ToolTipWrapper>
            {!isMobile &&
              (user.role === "manager" || user.role === "admin") && (
                <SettingsButton />
              )}
          </div>
        </div>
        <LastUpdateIndicator />
      </>
    );
  }

  return (
    <>
      <div className="flex justify-center mb-2">
        <div className="flex space-x-4">
          {footerData.map((item, index) => (
            <a
              key={index}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="transition-all duration-300 p-2 rounded-full text-white hover:bg-[#8497ad] bg-menu-item-selected-gradient hover:border-slate-100 hover:border-opacity-50 border-transparent border"
            >
              {React.createElement(
                ICON_COMPONENTS?.[item.icon] ?? ICON_COMPONENTS.Info,
                {
                  weight: "fill",
                  className: "h-5 w-5",
                }
              )}
            </a>
          ))}
          {!isMobile && <SettingsButton />}
        </div>
      </div>
      <LastUpdateIndicator />
    </>
  );
}

export function ToolTipWrapper({ id = v4(), children }) {
  return (
    <div className="flex w-fit">
      {children}
      <Tooltip
        id={id}
        place="top"
        delayShow={300}
        className="tooltip !text-xs z-99"
      />
    </div>
  );
}
