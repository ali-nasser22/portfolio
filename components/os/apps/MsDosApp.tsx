import { useEffect, useRef, useState } from "react";

const HELP = `available commands:
  help      show this message
  ls        list desktop files
  skills    show skills
  contact   show contact info
  whoami    print user
  date      print date/time
  clear     clear screen`;

const FILES = [
  "MyComputer.exe", "Notepad.exe", "Projects.lnk",
  "Work_History.log", "MS-DOS_Prompt.exe", "Winamp.exe",
  "Network_Neighborhood.lnk", "Minesweeper.exe",
];

const SKILLS = `frameworks: Spring Boot, Laravel, Next.js, Flutter
languages : Java, PHP, JavaScript, TypeScript, Dart`;

const CONTACT = `email: alinasser.t22@gmail.com
phone: +961 70625787`;

function run(cmd: string): string {
  const c = cmd.trim().toLowerCase();
  if (!c) return "";
  if (c === "help") return HELP;
  if (c === "ls" || c === "dir") return FILES.join("    ");
  if (c === "skills") return SKILLS;
  if (c === "contact") return CONTACT;
  if (c === "whoami") return "ali-nasser22";
  if (c === "date") return new Date().toString();
  if (c === "clear" || c === "cls") return "__CLEAR__";
  if (c === "exit") return "type 'shut down' from start menu to exit AliOS";
  return `'${cmd}' is not recognized as an internal or external command.\ntype 'help' for available commands.`;
}

export function MsDosApp() {
  const [lines, setLines] = useState<string[]>([
    "Microsoft(R) MS-DOS(R)  Version 6.22",
    "(C) Copyright Ali Microsystems Corp 1995.",
    "",
    "type 'help' to begin.",
    "",
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView(); }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const out = run(input);
    if (out === "__CLEAR__") { setLines([]); setInput(""); return; }
    setLines((l) => [...l, `C:\\> ${input}`, ...(out ? out.split("\n") : []), ""]);
    setInput("");
  };

  return (
    <div
      className="h-full bg-black text-[#5fffaf] font-mono text-[13px] p-2 overflow-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((l, i) => <div key={i} className="whitespace-pre-wrap">{l || "\u00A0"}</div>)}
      <form onSubmit={submit} className="flex">
        <span>C:\&gt;&nbsp;</span>
        <input
          ref={inputRef}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-[#5fffaf] caret-[#5fffaf]"
        />
      </form>
      <div ref={endRef} />
    </div>
  );
}
