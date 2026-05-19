"use client";
import { usePopup } from "@/components/providers/popupProvider";

export default function Home() {
  const { showPopup, hidePopup } = usePopup();
  return (
    <>
      <button onClick={() => showPopup({ message: "TEST", variant: "blue" })}>Show Popup</button>
      <br />
      <button onClick={() => showPopup({ message: "TEST", variant: "blue", durationMs: 1000 })}>
        Show Popup With Timer
      </button>
      <br />
      <div>WIP</div>
    </>
  );
}
