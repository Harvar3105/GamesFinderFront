import { useAnimations } from "./animationsProvider";

export default function AnimationsSwitcher() {
  const { areTurnedOn, toggleAnimations } = useAnimations();

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-label-sm tracking-wider text-outline">FX_MOTION:</span>
      <button
        id="toggle-motion-btn"
        onClick={toggleAnimations}
        className={`px-2 py-0.5 text-[10px] font-label-sm border rounded cursor-pointer transition-colors ${
          areTurnedOn
            ? "border-tertiary text-tertiary bg-tertiary/10 font-bold"
            : "border-outline-variant text-on-surface-variant bg-surface-container-low"
        }`}
      >
        {areTurnedOn ? "[ ACTIVE ]" : "[ OFF ]"}
      </button>
    </div>
  );
}
