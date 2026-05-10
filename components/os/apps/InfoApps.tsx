const projects = [
  { name: "Learniverse Hub", desc: "LMS platform", url: "https://github.com/ali-nasser22/learniverse_hub", glyph: "📘" },
  { name: "Qana Votes", desc: "Flutter mobile voting app", url: "https://github.com/ali-nasser22/QanaVotes-App", glyph: "🗳" },
  { name: "HMS", desc: "Laravel Hospital Management System", url: "https://github.com/ali-nasser22/HMS", glyph: "🏥" },
];

export function ProjectsApp() {
  return (
    <div className="space-y-2">
      <div className="bevel-in px-2 py-1 text-xs font-mono">C:\Projects\</div>
      <div className="bevel-in-deep p-2 grid grid-cols-2 gap-2">
        {projects.map((p) => (
          <a key={p.name} href={p.url} target="_blank" rel="noreferrer"
             className="flex items-start gap-2 p-2 hover:bg-[var(--color-win-title)] hover:text-white group">
            <span className="text-2xl">{p.glyph}</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[14px] underline">{p.name}.lnk</div>
              <div className="text-[12px] opacity-70 group-hover:opacity-100">{p.desc}</div>
            </div>
          </a>
        ))}
      </div>
      <div className="text-[12px] font-mono text-[var(--color-bevel-dark)]">3 object(s) — opens in browser</div>
    </div>
  );
}

export function WorkHistoryApp() {
  return (
    <div className="font-mono text-[13px] space-y-2">
      <div className="bevel-in-deep p-3">
        <div className="font-bold text-[15px] mb-1">[ work_history.log ]</div>
        <div className="text-[var(--color-bevel-dark)] mb-3">— last write: May 2025 —</div>

        <div className="space-y-2">
          <div>
            <div className="font-bold text-[14px]">Backend Developer — Internship</div>
            <div>XpertBot · Remote · Oct 2024 – May 2025</div>
          </div>
          <ul className="list-disc pl-5 space-y-1 leading-relaxed">
            <li>Designed and implemented RESTful APIs for seamless integration with the mobile development team.</li>
            <li>Developed and maintained backend functionalities using the Laravel framework.</li>
          </ul>
        </div>

        <div className="mt-4">
          <div className="font-bold text-[14px] mb-1">[ skills ]</div>
          <div className="space-y-1">
            <div><span className="text-[var(--color-bevel-dark)]">Frameworks:</span> Spring Boot, Laravel, React, Next.js, Node.js, Express.js, Nest.js</div>
            <div><span className="text-[var(--color-bevel-dark)]">Languages :</span> Java, C, PHP, JavaScript, TypeScript, HTML, CSS</div>
            <div><span className="text-[var(--color-bevel-dark)]">Databases :</span> PostgreSQL, MySQL, MongoDB</div>
            <div><span className="text-[var(--color-bevel-dark)]">Certs     :</span> CCNA1, CCNA2, Network Security (Cisco)</div>
            <div><span className="text-[var(--color-bevel-dark)]">Languages :</span> Arabic (native), English (fluent), French (A1)</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const links = [
  { name: "GitHub", url: "https://github.com/ali-nasser22", glyph: "🐙" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/ali-nasser22", glyph: "💼" },
  { name: "Portfolio / Blog", url: "https://portfolio.alinasser.dev", glyph: "📰" },
];

export function NetworkApp() {
  return (
    <div className="space-y-2">
      <div className="bevel-in px-2 py-1 text-xs font-mono">{`\\\\NETWORK\\ali-nasser22`}</div>
      <div className="bevel-in-deep p-3 space-y-2">
        {links.map((l) => (
          <a key={l.name} href={l.url} target="_blank" rel="noreferrer"
             className="flex items-center gap-3 p-1.5 hover:bg-[var(--color-win-title)] hover:text-white">
            <span className="text-2xl">{l.glyph}</span>
            <div>
              <div className="font-semibold text-[14px]">{l.name}</div>
              <div className="text-[12px] font-mono opacity-70">{l.url}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function ResumeApp() {
  const url = "/Ali-Nasser-Temraz-Resume.pdf";
  return (
    <div className="space-y-3">
      <div className="bevel-in px-2 py-1 text-xs font-mono">C:\Documents\Ali-Nasser-Temraz-Resume.pdf</div>
      <div className="bevel-in-deep p-4 font-mono text-[13px] space-y-3">
        <div className="flex items-center gap-3">
          <div className="text-4xl">📄</div>
          <div>
            <div className="font-bold text-[15px]">Ali-Nasser-Temraz-Resume.pdf</div>
            <div className="text-[var(--color-bevel-dark)]">Adobe Acrobat Document · 1 page</div>
          </div>
        </div>
        <p className="leading-relaxed">
          Latest version of my résumé. Click below to download or open in a new tab.
        </p>
        <div className="flex gap-2 pt-1">
          <a href={url} download="Ali-Nasser-Temraz-Resume.pdf" className="btn-95 inline-flex items-center justify-center no-underline">
            ⬇ Download
          </a>
          <a href={url} target="_blank" rel="noreferrer" className="btn-95 inline-flex items-center justify-center no-underline">
            👁 Open
          </a>
        </div>
      </div>
    </div>
  );
}
