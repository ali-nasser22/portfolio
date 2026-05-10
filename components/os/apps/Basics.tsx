export function MyComputer() {
  return (
    <div className="space-y-3">
      <div className="bevel-in-deep p-3 font-mono text-[13px]">
        <div className="text-center font-bold mb-2 text-[15px]">System Properties</div>
        <div className="grid grid-cols-[150px_1fr] gap-y-1.5">
          <div className="text-[var(--color-bevel-dark)]">System:</div><div>AliOS 95 — Build 0322</div>
          <div className="text-[var(--color-bevel-dark)]">Registered to:</div><div>Ali Nasser Temraz</div>
          <div className="text-[var(--color-bevel-dark)]">Role:</div><div>Full-Stack Web Developer</div>
          <div className="text-[var(--color-bevel-dark)]">Institution:</div><div>Lebanese International University (LIU)</div>
          <div className="text-[var(--color-bevel-dark)]">Degree:</div><div>B.S. Computer Science · Jun 2022 – Jan 2026</div>
          <div className="text-[var(--color-bevel-dark)]">GPA:</div><div className="font-bold">3.93 / 4.00</div>
          <div className="text-[var(--color-bevel-dark)]">Location:</div><div>Tyre, South Governate, Lebanon</div>
          <div className="text-[var(--color-bevel-dark)]">Email:</div><div>alinasser.t22@gmail.com</div>
          <div className="text-[var(--color-bevel-dark)]">Phone:</div><div>+961 70 625 787</div>
          <div className="text-[var(--color-bevel-dark)]">Status:</div><div className="text-[oklch(0.45_0.15_140)]">● Online</div>
        </div>
      </div>
      <div className="text-center">
        <button className="btn-95">OK</button>
      </div>
    </div>
  );
}

export function NotepadApp() {
  return (
    <div className="bevel-in-deep h-full p-3 font-mono text-[14px] leading-relaxed whitespace-pre-wrap">
{`— summary.txt —

Computer Science graduate specializing in backend
and full-stack web development.

Experienced with Laravel, Next.js, Spring Boot,
Node.js / Express / Nest.js for shipping production
APIs and full-stack apps.

> B.S. Computer Science @ LIU — GPA 3.93 (Jan 2026)
> Backend Developer Intern @ XpertBot (Oct '24 – May '25)
> CCNA1, CCNA2, Network Security — Cisco certified
> Tyre, Lebanon · Open to roles, remote-friendly

`}<span className="animate-pulse">▌</span>
    </div>
  );
}
