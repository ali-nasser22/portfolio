import { useEffect, useState } from "react";
import { DesktopProvider, useDesktop } from "./DesktopContext";
import { DesktopIcon } from "./DesktopIcon";
import { Win95Window } from "./Win95Window";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { MyComputer, NotepadApp } from "./apps/Basics";
import { ProjectsApp, WorkHistoryApp, NetworkApp, ResumeApp } from "./apps/InfoApps";
import { MsDosApp } from "./apps/MsDosApp";
import { ContactApp } from "./apps/ContactApp";

const APPS: Record<string, React.ComponentType> = {
  mycomputer: MyComputer,
  notepad: NotepadApp,
  projects: ProjectsApp,
  work: WorkHistoryApp,
  dos: MsDosApp,
  network: NetworkApp,
  resume: ResumeApp,
  contact: ContactApp,
};

const DESKTOP_ICONS: { app: string; title: string; glyph: string; label: string; w?: number; h?: number }[] = [
  { app: "mycomputer", title: "My Computer", glyph: "🖥", label: "MyComputer.exe", w: 480, h: 360 },
  { app: "notepad", title: "Summary - Notepad", glyph: "📝", label: "Notepad.exe", w: 480, h: 380 },
  { app: "resume", title: "Resume.pdf", glyph: "📄", label: "Resume.pdf", w: 460, h: 320 },
  { app: "projects", title: "Projects", glyph: "📁", label: "Projects.lnk", w: 580, h: 360 },
  { app: "work", title: "Work_History.log", glyph: "📜", label: "Work_History.log", w: 560, h: 460 },
  { app: "dos", title: "MS-DOS Prompt", glyph: "⌨", label: "MS-DOS Prompt", w: 580, h: 380 },
  { app: "network", title: "Network Neighborhood", glyph: "🌐", label: "Network Neighborhood", w: 480, h: 340 },
  { app: "contact", title: "Contact - New Message", glyph: "✉", label: "Contact.exe", w: 460, h: 460 },
];

function DesktopInner() {
  const { windows, open, shutdown } = useDesktop();
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    // welcome — open notepad once
    const t = setTimeout(() => open("notepad", "Summary - Notepad", { w: 460, h: 360 }), 300);
    return () => clearTimeout(t);
  }, [open]);

  if (shutdown) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center text-[#e0e0e0] font-mono text-base sm:text-lg z-[20000]">
        <div className="text-center px-6">
          <div className="mb-2">It is now safe to turn off your computer.</div>
          <button
            className="mt-6 underline text-xs text-[#888] hover:text-white"
            onClick={() => window.location.reload()}
          >
            [press any key to restart]
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden crt">
      {/* Desktop icons grid */}
      <div className="absolute top-2 left-2 flex flex-col flex-wrap gap-1 max-h-[calc(100vh-60px)] content-start">
        {DESKTOP_ICONS.map((ic) => (
          <DesktopIcon
            key={ic.app}
            glyph={ic.glyph}
            label={ic.label}
            onOpen={() => open(ic.app, ic.title, { w: ic.w, h: ic.h })}
          />
        ))}
      </div>

      {/* Branding watermark */}
      <div className="absolute bottom-12 right-4 text-right pointer-events-none select-none">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">build 0322</div>
        <div className="font-bold text-2xl text-white/15 leading-none mt-1">Ali<span className="text-[var(--accent-teal)]/40">OS</span> 95</div>
      </div>

      {/* Windows */}
      {windows.map((w) => {
        const App = APPS[w.app];
        return (
          <Win95Window key={w.id} win={w}>
            {App ? <App /> : null}
          </Win95Window>
        );
      })}

      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} />
      <Taskbar onStart={() => setStartOpen((v) => !v)} />
    </div>
  );
}

export function Desktop() {
  return (
    <DesktopProvider>
      <DesktopInner />
    </DesktopProvider>
  );
}
