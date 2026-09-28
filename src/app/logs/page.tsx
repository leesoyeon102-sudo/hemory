"use client";

import { useApp } from "@/context/app-context";
import type { ActionType } from "@/lib/types";

const ACTION_LABEL: Record<ActionType, string> = {
  view: "비밀번호 확인",
  copy_id: "아이디 복사",
  copy_password: "비밀번호 복사",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LogsPage() {
  const { hydrated, logs, totalForgetCount, topServices } = useApp();

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <h1 className="mb-1 text-2xl font-extrabold text-neutral-800">
        망각 로그
      </h1>
      <p className="mb-6 text-sm text-neutral-500">
        내가 몇 번이나 까먹었는지 확인해보세요 🐹
      </p>

      {!hydrated ? (
        <div className="rounded-3xl border border-dashed border-amber-200 bg-amber-50/40 p-10 text-center text-sm text-neutral-400">
          불러오는 중...
        </div>
      ) : (
        <>
          <div className="mb-8 rounded-2xl bg-amber-400 p-5 text-white shadow-sm">
            <p className="text-xs opacity-90">총 까먹은 횟수</p>
            <p className="mt-1 text-3xl font-extrabold">
              {totalForgetCount}
              <span className="ml-1 text-base font-semibold opacity-90">회</span>
            </p>
          </div>

          <section className="mb-8">
            <h2 className="mb-3 text-sm font-bold text-neutral-700">
              가장 많이 까먹은 서비스
            </h2>
            {topServices.length === 0 ? (
              <p className="rounded-xl bg-white px-4 py-6 text-center text-sm text-neutral-400 ring-1 ring-neutral-100">
                아직 데이터가 없어요.
              </p>
            ) : (
              <ol className="space-y-2">
                {topServices.map((service, index) => (
                  <li
                    key={service.serviceName}
                    className="flex items-center justify-between rounded-xl bg-white px-4 py-3 shadow-sm ring-1 ring-neutral-100"
                  >
                    <span className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                      <span className="text-amber-500">{index + 1}</span>
                      {service.serviceName}
                    </span>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-600">
                      {service.count}회
                    </span>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section>
            <h2 className="mb-3 text-sm font-bold text-neutral-700">
              최근 기록
            </h2>
            {logs.length === 0 ? (
              <p className="rounded-xl bg-white px-4 py-6 text-center text-sm text-neutral-400 ring-1 ring-neutral-100">
                아직 기록이 없어요.
              </p>
            ) : (
              <ul className="space-y-2">
                {logs.slice(0, 50).map((log) => (
                  <li
                    key={log.id}
                    className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm shadow-sm ring-1 ring-neutral-100"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-neutral-700">
                        {log.serviceName}
                      </p>
                      <p className="text-xs text-neutral-400">
                        {formatDate(log.viewedAt)}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500">
                      {ACTION_LABEL[log.actionType]}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
