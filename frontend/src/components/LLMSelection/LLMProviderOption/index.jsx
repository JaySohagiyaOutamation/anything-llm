export default function LLMProviderOption({
  name,
  link,
  description,
  value,
  image,
  checked = false,
  onClick,
}) {
  return (
    <div onClick={() => onClick(value)}>
      <input
        type="checkbox"
        value={value}
        className="peer hidden"
        checked={checked}
        readOnly={true}
        formNoValidate={true}
      />
      <label className="transition-all duration-300 inline-flex flex-col h-full w-60 cursor-pointer items-start justify-between rounded-2xl bg-white border-2 border-transparent shadow-md px-5 py-4 text-black hover:border-white/60 peer-checked:border-white peer-checked:border-opacity-90 ">
        <div className="flex items-center">
          <img src={image} alt={name} className="h-10 w-10 rounded" />
          <div className="ml-4 text-sm font-semibold">{name}</div>
        </div>
        <div className="mt-2 text-xs font-base text-black tracking-wide">
          {description}
        </div>
        <a
          href={`https://${link}`}
          className="mt-2 text-xs text-black font-medium underline"
        >
          {link}
        </a>
      </label>
    </div>
  );
}
