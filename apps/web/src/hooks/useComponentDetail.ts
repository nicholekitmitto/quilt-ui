import { useEffect, useState } from "react";
import {
  getComponent,
  getComponentHistory,
  type Component,
  type ComponentHistoryItem,
} from "../api/components";

export function useComponentDetail(key: string | undefined) {
  const [component, setComponent] = useState<Component | null>(null);
  const [history, setHistory] = useState<ComponentHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!key) return;
    setLoading(true);
    setError(null);
    Promise.all([getComponent(key), getComponentHistory(key)])
      .then(([comp, hist]) => {
        setComponent(comp);
        setHistory(hist);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [key]);

  return { component, history, loading, error };
}
