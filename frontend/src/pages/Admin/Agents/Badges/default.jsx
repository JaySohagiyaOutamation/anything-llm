import { Tooltip } from "react-tooltip";

export function DefaultBadge({ title }) {
  return (
    <>
      <span
        className="w-fit"
        data-tooltip-id={`default-skill-${title}`}
        data-tooltip-content="This skill is enabled by default and cannot be turned off."
      >
        <div className="flex items-center gap-x-1 w-fit rounded-full bg-[#7e858e] px-2.5 py-0.5 text-sm font-medium text-white shadow-sm cursor-pointer">
          <div className="text-white text-[12px] leading-[15px]">
            Default
          </div>
        </div>
      </span>
      <Tooltip
        id={`default-skill-${title}`}
        place="bottom"
        delayShow={300}
        className="tooltip !text-xs"
      />
    </>
  );
}
