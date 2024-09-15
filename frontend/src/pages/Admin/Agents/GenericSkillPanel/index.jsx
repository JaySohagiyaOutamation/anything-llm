import React from "react";

export default function GenericSkillPanel({
  title,
  description,
  skill,
  toggleSkill,
  enabled = false,
  disabled = false,
  image,
  icon,
}) {
  return (
    <div className="p-2">
      <div className="flex flex-col gap-y-[18px] max-w-[500px]">
        <div className="flex items-center gap-x-2">
          {icon &&
            React.createElement(icon, {
              size: 24,
              color: "black",
              weight: "bold",
            })}
          <label htmlFor="name" className="text-black text-md font-bold">
            {title}
          </label>
          <label
            className={`border-none relative inline-flex items-center ml-auto ${
              disabled ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <input
              type="checkbox"
              disabled={disabled}
              className="peer sr-only"
              checked={enabled}
              onChange={() => toggleSkill(skill)}
            />
            <div className="peer-disabled:opacity-50 pointer-events-none peer h-6 w-11 rounded-full bg-stone-400 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:shadow-xl after:border after:border-gray-600 after:bg-white after:box-shadow-md after:transition-all after:content-[''] peer-checked:bg-sky-500 peer-checked:after:translate-x-full peer-checked:after:border-white "></div>
            <span className="ml-3 text-sm font-medium text-black dark:text-black"></span>
          </label>
        </div>
        <img src={image} alt={title} className="w-full rounded-md" />
        <p className="text-black text-opacity-70 text-xs font-medium py-1.5">
          {description}
        </p>
      </div>
    </div>
  );
}
