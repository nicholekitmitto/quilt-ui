import { api } from "./client";

export interface Component {
  id: number;
  key: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ComponentHistoryItem {
  version: string;
  released_at: string;
  change_type: string;
  change_note: string;
}

export function getComponents() {
  return api<Component[]>("/components");
}

export function getComponent(key: string) {
  return api<Component>(`/components/${key}`);
}

export function getComponentHistory(key: string) {
  return api<ComponentHistoryItem[]>(`/components/${key}/history`);
}
