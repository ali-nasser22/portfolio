interface Props {
  glyph: string;
  label: string;
  onOpen: () => void;
  className?: string;
}

export function DesktopIcon({ glyph, label, onOpen, className = "" }: Props) {
  return (
    <button
      onDoubleClick={onOpen}
      onClick={(e) => {
        if (e.detail === 1) {
          // single-click hint — do nothing
        }
      }}
      className={`flex flex-col items-center gap-1 w-24 p-1 group focus:outline-none ${className}`}
    >
      <div className="w-12 h-12 flex items-center justify-center bg-[var(--color-win)] bevel-out text-2xl pixel-icon group-focus:ring-2 group-focus:ring-white/40">
        <span aria-hidden>{glyph}</span>
      </div>
      <span className="text-[12px] text-white text-center leading-tight px-1 group-focus:bg-[var(--color-win-title)]">
        {label}
      </span>
    </button>
  );
}
