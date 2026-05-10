import {useDesktop} from "./DesktopContext";

interface Props {
    open: boolean;
    onClose: () => void;
}

export function StartMenu({open, onClose}: Props) {
    const {open: openWin, doShutdown} = useDesktop();
    if (!open) return null;

    const item = (label: string, glyph: string, onClick: () => void) => (
        <button
            onClick={() => {
                onClick();
                onClose();
            }}
            className="w-full flex items-center gap-3 px-2 py-1.5 text-left text-sm text-black hover:bg-[var(--color-win-title)] hover:text-white"
        >
            <span className="text-lg w-6 text-center">{glyph}</span> {label}
        </button>
    );

    return (
        <>
            <div className="fixed inset-0 z-[9999]" onClick={onClose}/>
            <div className="absolute bottom-9 left-1 w-64 bevel-out z-[10001] flex">
                <div
                    className="w-7 bg-gradient-to-b from-[var(--color-win-title)] to-[oklch(0.50_0.18_290)] flex items-end p-1">
                    <div
                        className="-rotate-90 origin-bottom-left -translate-y-1 translate-x-4 text-white font-bold text-xs whitespace-nowrap tracking-widest">
                        Ali<span className="text-[var(--accent-teal)]">OS</span> 95
                    </div>
                </div>
                <div className="flex-1 py-1">
                    {item("Programs", "📁", () => openWin("projects", "Projects"))}
                    {item("Documents", "📄", () => openWin("notepad", "Summary - Notepad"))}
                    {item("Resume.pdf", "📑", () => openWin("resume", "Resume.pdf"))}
                    {item("Contact", "✉", () => openWin("contact", "Contact - New Message"))}
                    {item("MS-DOS Prompt", "⌨", () => openWin("dos", "MS-DOS Prompt"))}
                    <div className="border-t border-[var(--color-bevel-dark)] my-1"/>
                    {item("Shut Down...", "⏻", doShutdown)}
                </div>
            </div>
        </>
    );
}
