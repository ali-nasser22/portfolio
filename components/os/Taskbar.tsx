import {useEffect, useState} from "react";
import {useDesktop} from "./DesktopContext";

export function Taskbar({onStart}: { onStart: () => void }) {
    const {windows, focus, toggleMin, activeId} = useDesktop();
    const [time, setTime] = useState(() => new Date());

    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 right-0 h-9 bevel-out flex items-center gap-1 px-1 z-[10000]">
            <button onClick={onStart}
                    className="bevel-out flex items-center gap-1.5 h-7 px-2 text-xs font-bold text-black active:[border-top-color:var(--color-bevel-darker)] active:[border-left-color:var(--color-bevel-darker)]">
                <span className="text-base">⊞</span> Start
            </button>
            <div className="bevel-in h-7 w-px mx-1"/>
            <div className="flex-1 flex gap-1 overflow-x-auto">
                {windows.map((w) => {
                    const active = activeId === w.id && !w.minimized;
                    return (
                        <button
                            key={w.id}
                            onClick={() => (active ? toggleMin(w.id) : focus(w.id))}
                            className={`h-7 px-2 text-xs text-black truncate max-w-[160px] ${active ? "bevel-in font-semibold" : "bevel-out"}`}
                        >
                            {w.title}
                        </button>
                    );
                })}
            </div>
            <div className="bevel-in h-7 px-6 flex items-center gap-3 text-[11px] text-black">
        <span className="font-mono tabular-nums text-sm">
          {time.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
        </span>
            </div>
        </div>
    );
}
