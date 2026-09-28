"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useApp } from "@/context/app-context";
import { AccountCard } from "@/components/AccountCard";

export default function Home() {
  const { accounts, hydrated } = useApp();
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      accounts.filter((account) =>
        account.serviceName.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [accounts, query],
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-800">
            내 계정 목록
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            까먹기 전에 Hemmory에 저장해두세요 🐹
          </p>
        </div>
        <Link
          href="/accounts/new"
          className="inline-flex items-center justify-center rounded-full bg-amber-400 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-amber-500 active:scale-[0.98]"
        >
          + 계정 추가
        </Link>
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="서비스명으로 검색"
        className="mb-6 w-full rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-100"
      />

      {!hydrated ? (
        <div className="rounded-3xl border border-dashed border-amber-200 bg-amber-50/40 p-10 text-center text-sm text-neutral-400">
          불러오는 중...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-amber-200 bg-amber-50/40 p-10 text-center">
          <p className="text-4xl">🐹</p>
          <p className="mt-3 text-sm text-neutral-500">
            {accounts.length === 0
              ? "아직 저장된 계정이 없어요. 첫 계정을 추가해보세요!"
              : "검색 결과가 없어요."}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      )}
    </div>
  );
}
