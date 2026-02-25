import { api } from "./client";

export interface Release {
  id: number;
  version: string;
  notes: string;
  commit_sha: string;
  created_at: string;
}

export async function getLatestRelease(): Promise<Release | null> {
  const releases = await api<Release[]>("/releases");
  return releases.length > 0 ? releases[releases.length - 1] : null;
}
