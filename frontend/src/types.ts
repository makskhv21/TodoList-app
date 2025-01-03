export interface User {
  uid: string;
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  important: boolean;
  createdAt: string;
}

export type Project = string;

export interface AppProps {
  onLogout: () => void;
}
