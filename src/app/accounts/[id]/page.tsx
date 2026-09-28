"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { AccountForm } from "@/components/AccountForm";
import { useApp } from "@/context/app-context";

export default function AccountDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { hydrated, getAccount, updateAccount, deleteAccount } = useApp();
  const account = getAccount(id);

  if (!hydrated) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-16 text-center text-sm text-neutral-400">
        불러오는 중...
      </div>
    );
  }

  if (!account) {
    return (
      <div className="mx-auto w-full max-w-md px-4 py-16 text-center">
        <p className="text-4xl">🐹</p>
        <p className="mt-3 text-sm text-neutral-500">
          계정을 찾을 수 없어요.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8">
      <h1 className="mb-6 text-xl font-extrabold text-neutral-800">
        계정 수정
      </h1>
      <AccountForm
        initialValues={{
          serviceName: account.serviceName,
          loginId: account.loginId,
          password: account.password,
        }}
        submitLabel="수정 완료"
        onSubmit={(values) => {
          updateAccount(account.id, values);
          router.push("/");
        }}
      />
      <button
        type="button"
        onClick={() => {
          if (window.confirm("정말 삭제할까요?")) {
            deleteAccount(account.id);
            router.push("/");
          }
        }}
        className="mt-4 w-full rounded-full border border-red-200 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
      >
        계정 삭제
      </button>
    </div>
  );
}
