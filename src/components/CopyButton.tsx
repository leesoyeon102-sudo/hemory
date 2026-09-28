"use client";

import { useState } from "react";

export function CopyButton({
  value,
  label = "복사",
  onCopy,
}: {
  value: string;
  label?: string;
  onCopy?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        throw new Error("clipboard api unavailable");
      }
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
        copied
          ? "bg-emerald-100 text-emerald-600"
          : "bg-amber-100 text-amber-600 hover:bg-amber-200"
      }`}
    >
      {copied ? "복사됨!" : label}
    </button>
  );
}
