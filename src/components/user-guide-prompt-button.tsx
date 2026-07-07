"use client";

export function UserGuidePromptButton({ prompt }: { prompt: string }) {
  function openOlivia() {
    window.dispatchEvent(
      new CustomEvent("remax:open-olivia", {
        detail: { prompt }
      })
    );
  }

  return (
    <button type="button" onClick={openOlivia}>
      {prompt}
    </button>
  );
}
