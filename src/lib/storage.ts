import { Account, ForgetLog } from "./types";

const ACCOUNTS_KEY = "hemmory:accounts";
const LOGS_KEY = "hemmory:logs";

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadAccounts(): Account[] {
  if (typeof window === "undefined") return [];
  return safeParse<Account[]>(window.localStorage.getItem(ACCOUNTS_KEY), []);
}

export function saveAccounts(accounts: Account[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function loadLogs(): ForgetLog[] {
  if (typeof window === "undefined") return [];
  return safeParse<ForgetLog[]>(window.localStorage.getItem(LOGS_KEY), []);
}

export function saveLogs(logs: ForgetLog[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}
