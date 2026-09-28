export type ActionType = "view" | "copy_id" | "copy_password";

export interface Account {
  id: string;
  serviceName: string;
  loginId: string;
  password: string;
  forgetCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ForgetLog {
  id: string;
  accountId: string;
  serviceName: string;
  actionType: ActionType;
  viewedAt: string;
}

export interface AccountInput {
  serviceName: string;
  loginId: string;
  password: string;
}
