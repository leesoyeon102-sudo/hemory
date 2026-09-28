"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Account, AccountInput, ActionType, ForgetLog } from "@/lib/types";
import { loadAccounts, loadLogs, saveAccounts, saveLogs } from "@/lib/storage";
import { MESSAGES, randomMessage } from "@/lib/messages";

interface TopService {
  serviceName: string;
  count: number;
}

interface AppContextValue {
  hydrated: boolean;
  accounts: Account[];
  logs: ForgetLog[];
  hamsterMessage: string | null;
  say: (message: string) => void;
  addAccount: (input: AccountInput) => void;
  updateAccount: (id: string, input: AccountInput) => void;
  deleteAccount: (id: string) => void;
  recordAction: (accountId: string, actionType: ActionType) => void;
  getAccount: (id: string) => Account | undefined;
  totalForgetCount: number;
  topServices: TopService[];
}

const AppContext = createContext<AppContextValue | null>(null);

interface PersistedState {
  accounts: Account[];
  logs: ForgetLog[];
  hydrated: boolean;
}

export function AppProvider({ children }: { children: ReactNode }) {
  // localStorage is unavailable during SSR, so state starts empty and is
  // filled in once after mount to keep the server/client render in sync.
  const [{ accounts, logs, hydrated }, setPersisted] = useState<PersistedState>({
    accounts: [],
    logs: [],
    hydrated: false,
  });
  const [hamsterMessage, setHamsterMessage] = useState<string | null>(null);
  const messageTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // One-time sync from localStorage (an external system) on mount; this is
    // exactly the "synchronize with external system" case the lint rule allows.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPersisted({ accounts: loadAccounts(), logs: loadLogs(), hydrated: true });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveAccounts(accounts);
  }, [accounts, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    saveLogs(logs);
  }, [logs, hydrated]);

  const say = useCallback((message: string) => {
    setHamsterMessage(message);
    if (messageTimer.current) clearTimeout(messageTimer.current);
    messageTimer.current = setTimeout(() => setHamsterMessage(null), 3200);
  }, []);

  const addAccount = useCallback(
    (input: AccountInput) => {
      const now = new Date().toISOString();
      const newAccount: Account = {
        id: crypto.randomUUID(),
        serviceName: input.serviceName,
        loginId: input.loginId,
        password: input.password,
        forgetCount: 0,
        createdAt: now,
        updatedAt: now,
      };
      setPersisted((prev) => ({
        ...prev,
        accounts: [newAccount, ...prev.accounts],
      }));
      say(randomMessage(MESSAGES.addAccount));
    },
    [say],
  );

  const updateAccount = useCallback(
    (id: string, input: AccountInput) => {
      setPersisted((prev) => ({
        ...prev,
        accounts: prev.accounts.map((account) =>
          account.id === id
            ? { ...account, ...input, updatedAt: new Date().toISOString() }
            : account,
        ),
      }));
      say(randomMessage(MESSAGES.update));
    },
    [say],
  );

  const deleteAccount = useCallback(
    (id: string) => {
      setPersisted((prev) => ({
        ...prev,
        accounts: prev.accounts.filter((account) => account.id !== id),
        logs: prev.logs.filter((log) => log.accountId !== id),
      }));
      say(randomMessage(MESSAGES.delete));
    },
    [say],
  );

  const recordAction = useCallback(
    (accountId: string, actionType: ActionType) => {
      setPersisted((prev) => {
        const account = prev.accounts.find((item) => item.id === accountId);
        if (!account) return prev;

        const newLog: ForgetLog = {
          id: crypto.randomUUID(),
          accountId,
          serviceName: account.serviceName,
          actionType,
          viewedAt: new Date().toISOString(),
        };

        return {
          ...prev,
          accounts: prev.accounts.map((item) =>
            item.id === accountId
              ? { ...item, forgetCount: item.forgetCount + 1 }
              : item,
          ),
          logs: [newLog, ...prev.logs].slice(0, 500),
        };
      });
      say(randomMessage(actionType === "view" ? MESSAGES.view : MESSAGES.copy));
    },
    [say],
  );

  const getAccount = useCallback(
    (id: string) => accounts.find((account) => account.id === id),
    [accounts],
  );

  const totalForgetCount = useMemo(() => logs.length, [logs]);

  const topServices = useMemo<TopService[]>(() => {
    const counts = new Map<string, number>();
    logs.forEach((log) => {
      counts.set(log.serviceName, (counts.get(log.serviceName) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([serviceName, count]) => ({ serviceName, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [logs]);

  const value: AppContextValue = {
    hydrated,
    accounts,
    logs,
    hamsterMessage,
    say,
    addAccount,
    updateAccount,
    deleteAccount,
    recordAction,
    getAccount,
    totalForgetCount,
    topServices,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
