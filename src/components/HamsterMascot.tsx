"use client";

import { useEffect, useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import { useApp } from "@/context/app-context";
import { MESSAGES, randomMessage } from "@/lib/messages";

export function HamsterMascot() {
  const { hamsterMessage, say } = useApp();
  const [pos, setPos] = useState({ x: 78, y: 72 });
  const [facingLeft, setFacingLeft] = useState(false);

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setPos((prev) => {
        const nextX = Math.random() * 78 + 6;
        const nextY = Math.random() * 60 + 14;
        setFacingLeft(nextX < prev.x);
        return { x: nextX, y: nextY };
      });
    }, 5000);
    return () => clearInterval(moveInterval);
  }, []);

  useEffect(() => {
    const idleInterval = setInterval(() => {
      say(randomMessage(MESSAGES.idle));
    }, 16000);
    return () => clearInterval(idleInterval);
  }, [say]);

  return (
    <div
      className="pointer-events-none fixed z-50 flex flex-col items-center transition-[left,top] duration-[3000ms] ease-in-out"
      style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
    >
      {hamsterMessage && (
        <div className="mb-2 max-w-[190px] animate-[pop_0.2s_ease-out] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-center text-xs font-medium text-neutral-700 shadow-md ring-1 ring-amber-100">
          {hamsterMessage}
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          const message = randomMessage(MESSAGES.click);
          amplitude.track("Hamster_Interacted", { click: message });
          say(message);
        }}
        aria-label="햄스터 캐릭터"
        className={`pointer-events-auto animate-[bob_2.2s_ease-in-out_infinite] text-4xl drop-shadow transition-transform hover:scale-110 active:scale-95 sm:text-5xl ${
          facingLeft ? "-scale-x-100" : ""
        }`}
      >
        🐹
      </button>
    </div>
  );
}
