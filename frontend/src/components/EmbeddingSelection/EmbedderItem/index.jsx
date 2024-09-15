export default function EmbedderItem({
  name,
  value,
  image,
  description,
  checked,
  onClick,
}) {
  return (
    <div
      onClick={() => onClick(value)}
      className={`w-full p-2 rounded-md hover:cursor-pointer hover:bg-black/10 ${
        checked ? "bg-black/10" : ""
      }`}
    >
      <input
        type="checkbox"
        value={value}
        className="peer hidden"
        checked={checked}
        readOnly={true}
        formNoValidate={true}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src={image}
          alt={`${name} logo`}
          className="w-10 h-10 rounded-md"
        />
        <div className="flex flex-col">
          <div className="text-sm font-semibold text-black">{name}</div>
          <div className="mt-1 text-xs text-gray-400">{description}</div>
        </div>
      </div>
    </div>
  );
}
