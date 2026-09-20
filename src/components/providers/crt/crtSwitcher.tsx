import { useCRT } from "./crtProvider";

export default function CRTSwitcher() {
  const { isTurnedOn, toggleCRT } = useCRT();

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-label-sm tracking-wider text-outline">RETRO_STYLE:</span>
      <button
        id="toggle-retro-btn"
        onClick={toggleCRT}
        className={`px-2 py-0.5 text-[10px] font-label-sm border rounded cursor-pointer transition-colors ${
          isTurnedOn
            ? "border-primary text-primary bg-primary/10 font-bold"
            : "border-outline-variant text-on-surface-variant bg-surface-container-low"
        }`}
      >
        {isTurnedOn ? "[ CRT ]" : "[ CLEAN ]"}
      </button>
    </div>
  );
}
