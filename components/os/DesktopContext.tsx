import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

export type WindowId = string;

export interface WindowState {
  id: WindowId;
  title: string;
  app: string;
  x: number; y: number; w: number; h: number;
  minimized: boolean;
  maximized: boolean;
  zIndex: number;
  prev?: { x: number; y: number; w: number; h: number };
  payload?: any;
}

interface DesktopCtx {
  windows: WindowState[];
  open: (app: string, title: string, opts?: Partial<WindowState>) => void;
  close: (id: WindowId) => void;
  focus: (id: WindowId) => void;
  toggleMin: (id: WindowId) => void;
  toggleMax: (id: WindowId) => void;
  move: (id: WindowId, x: number, y: number) => void;
  activeId: WindowId | null;
  shutdown: boolean;
  doShutdown: () => void;
}

const Ctx = createContext<DesktopCtx | null>(null);
export const useDesktop = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("DesktopCtx missing");
  return c;
};

let zCounter = 10;
let idCounter = 0;

export function DesktopProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeId, setActiveId] = useState<WindowId | null>(null);
  const [shutdown, setShutdown] = useState(false);

  const open = useCallback((app: string, title: string, opts: Partial<WindowState> = {}) => {
    setWindows((w) => {
      const existing = w.find((x) => x.app === app && !opts.payload);
      if (existing) {
        zCounter++;
        setActiveId(existing.id);
        return w.map((x) => x.id === existing.id ? { ...x, minimized: false, zIndex: zCounter } : x);
      }
      idCounter++;
      zCounter++;
      const id = `w${idCounter}`;
      const offset = (idCounter % 6) * 24;
      const win: WindowState = {
        id, app, title,
        x: 80 + offset, y: 60 + offset,
        w: opts.w ?? 540, h: opts.h ?? 380,
        minimized: false, maximized: false, zIndex: zCounter,
        payload: opts.payload,
      };
      setActiveId(id);
      return [...w, win];
    });
  }, []);

  const close = useCallback((id: WindowId) => {
    setWindows((w) => w.filter((x) => x.id !== id));
  }, []);

  const focus = useCallback((id: WindowId) => {
    zCounter++;
    setActiveId(id);
    setWindows((w) => w.map((x) => x.id === id ? { ...x, zIndex: zCounter, minimized: false } : x));
  }, []);

  const toggleMin = useCallback((id: WindowId) => {
    setWindows((w) => w.map((x) => x.id === id ? { ...x, minimized: !x.minimized } : x));
    setActiveId((a) => (a === id ? null : a));
  }, []);

  const toggleMax = useCallback((id: WindowId) => {
    setWindows((w) => w.map((x) => {
      if (x.id !== id) return x;
      if (x.maximized && x.prev) return { ...x, maximized: false, ...x.prev };
      return { ...x, maximized: true, prev: { x: x.x, y: x.y, w: x.w, h: x.h } };
    }));
  }, []);

  const move = useCallback((id: WindowId, x: number, y: number) => {
    setWindows((w) => w.map((s) => s.id === id ? { ...s, x, y } : s));
  }, []);

  const doShutdown = useCallback(() => setShutdown(true), []);

  return (
    <Ctx.Provider value={{ windows, open, close, focus, toggleMin, toggleMax, move, activeId, shutdown, doShutdown }}>
      {children}
    </Ctx.Provider>
  );
}
