import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDesktop, type WindowState } from "./DesktopContext";

export function Win95Window({ win, children }: { win: WindowState; children: ReactNode }) {
  const { close, focus, toggleMin, toggleMax, move, activeId } = useDesktop();
  const isActive = activeId === win.id;
  const [drag, setDrag] = useState<{ dx: number; dy: number } | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!drag) return;
    const onMove = (e: MouseEvent) => {
      const x = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - drag.dx));
      const y = Math.max(0, Math.min(window.innerHeight - 80, e.clientY - drag.dy));
      move(win.id, x, y);
    };
    const onUp = () => setDrag(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [drag, move, win.id]);

  if (win.minimized) return null;

  const style = win.maximized
    ? { left: 0, top: 0, width: "100vw", height: "calc(100vh - 36px)" }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <div
      ref={ref}
      className="absolute bevel-out flex flex-col"
      style={{ ...style, zIndex: win.zIndex }}
      onMouseDown={() => focus(win.id)}
    >
      <div
        className={`flex items-center justify-between px-1 py-0.5 ${isActive ? "titlebar" : "titlebar-inactive"}`}
        onMouseDown={(e) => {
          if (win.maximized) return;
          const rect = ref.current!.getBoundingClientRect();
          setDrag({ dx: e.clientX - rect.left, dy: e.clientY - rect.top });
        }}
        onDoubleClick={() => toggleMax(win.id)}
      >
        <div className="flex items-center gap-1.5 px-1 text-xs font-bold tracking-tight">
          <span className="inline-block w-4 h-4 bg-[var(--color-win-title-foreground)]/20 border border-white/30" />
          {win.title}
        </div>
        <div className="flex gap-0.5">
          <button className="bevel-out w-5 h-5 flex items-center justify-center text-black text-[10px] leading-none pb-1" onClick={(e) => { e.stopPropagation(); toggleMin(win.id); }}>_</button>
          <button className="bevel-out w-5 h-5 flex items-center justify-center text-black text-[10px] leading-none" onClick={(e) => { e.stopPropagation(); toggleMax(win.id); }}>▢</button>
          <button className="bevel-out w-5 h-5 flex items-center justify-center text-black text-[10px] leading-none font-bold" onClick={(e) => { e.stopPropagation(); close(win.id); }}>✕</button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2 text-[var(--color-win-foreground)] text-[15px]">
        {children}
      </div>
    </div>
  );
}
