export default function CTAButton({
  children,
  disabled = false,
  onClick,
  className = "",
}) {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick?.()}
      className={`text-xs px-4 py-1 font-semibold rounded-lg bg-black text-white hover:bg-opacity-70  h-[34px] -mr-8 whitespace-nowrap w-fit ${className}`}
    >
      <div className="flex items-center justify-center gap-2">{children}</div>
    </button>
  );
}
