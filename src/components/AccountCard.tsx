"use client";

import Link from "next/link";
import { useState } from "react";
import type { Account } from "@/lib/types";
import { useApp } from "@/context/app-context";
import { CopyButton } from "./CopyButton";

export function AccountCard({ account }: { account: Account }) {
  const { recordAction, deleteAccount } = useApp();
  const [revealed, setRevealed] = useState(false);

  function toggleReveal() {
    const next = !revealed;
    setRevealed(next);
    if (next) recordAction(account.id, "view");
  }

  function handleDelete() {
    if (window.confirm(`'${account.serviceName}' 계정을 삭제할까요?`)) {
      deleteAccount(account.id);
    }
  }

  return (
    <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <h3 className="truncate text-lg font-bold text-neutral-800">
          {account.serviceName}
        </h3>
        <div className="flex shrink-0 gap-1">
          <Link
            href={`/accounts/${account.id}`}
            className="rounded-full px-2 py-1 text-xs font-semibold text-neutral-500 transition hover:bg-amber-50 hover:text-amber-600"
          >
            수정
          </Link>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-full px-2 py-1 text-xs font-semibold text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
          >
            삭제
          </button>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-2 rounded-xl bg-amber-50/60 px-3 py-2">
          <span className="shrink-0 text-neutral-500">아이디</span>
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate font-mono text-neutral-700">
              {account.loginId}
            </span>
            <CopyButton
              value={account.loginId}
              onCopy={() => recordAction(account.id, "copy_id")}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-xl bg-amber-50/60 px-3 py-2">
          <span className="shrink-0 text-neutral-500">비밀번호</span>
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              onClick={toggleReveal}
              className="truncate font-mono tracking-widest text-neutral-700"
              title={revealed ? "클릭해서 숨기기" : "클릭해서 보기"}
            >
              {revealed
                ? account.password
                : "●".repeat(Math.min(Math.max(account.password.length, 6), 12))}
            </button>
            <CopyButton
              value={account.password}
              onCopy={() => recordAction(account.id, "copy_password")}
            />
          </div>
        </div>
      </div>

      <div className="mt-3 text-right text-xs font-semibold text-amber-500">
        😵 {account.forgetCount}번 까먹음
      </div>
    </div>
  );
}
