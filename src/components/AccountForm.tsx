"use client";

import { useState, type FormEvent } from "react";
import type { AccountInput } from "@/lib/types";

const inputClass =
  "w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-100";

export function AccountForm({
  initialValues,
  submitLabel,
  onSubmit,
}: {
  initialValues?: AccountInput;
  submitLabel: string;
  onSubmit: (values: AccountInput) => void;
}) {
  const [serviceName, setServiceName] = useState(initialValues?.serviceName ?? "");
  const [loginId, setLoginId] = useState(initialValues?.loginId ?? "");
  const [password, setPassword] = useState(initialValues?.password ?? "");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!serviceName.trim() || !loginId.trim() || !password) return;
    onSubmit({
      serviceName: serviceName.trim(),
      loginId: loginId.trim(),
      password,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-neutral-700">
          서비스명
        </label>
        <input
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          placeholder="예: 인스타그램"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-neutral-700">
          아이디
        </label>
        <input
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="아이디를 입력하세요"
          required
          className={inputClass}
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-semibold text-neutral-700">
          비밀번호
        </label>
        <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 px-4 py-3 transition focus-within:border-amber-300 focus-within:ring-2 focus-within:ring-amber-100">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
            className="w-full text-sm outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="shrink-0 text-xs font-semibold text-neutral-400 hover:text-amber-500"
          >
            {showPassword ? "숨기기" : "보기"}
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-amber-400 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-amber-500 active:scale-[0.99]"
      >
        {submitLabel}
      </button>
    </form>
  );
}
