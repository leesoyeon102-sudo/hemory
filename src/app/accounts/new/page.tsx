"use client";

import { useRouter } from "next/navigation";
import { AccountForm } from "@/components/AccountForm";
import { useApp } from "@/context/app-context";

export default function NewAccountPage() {
  const router = useRouter();
  const { addAccount } = useApp();

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8">
      <h1 className="mb-6 text-xl font-extrabold text-neutral-800">
        새 계정 추가
      </h1>
      <AccountForm
        submitLabel="저장하기"
        onSubmit={(values) => {
          addAccount(values);
          router.push("/");
        }}
      />
    </div>
  );
}
