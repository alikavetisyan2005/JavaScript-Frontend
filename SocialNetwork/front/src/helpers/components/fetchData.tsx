import { useCallback, useState } from "react";
import { Http } from "../../config/api";

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await Http.get<T>(url);
      setData(res.data);
    } finally {
      setLoading(false);
    }
  }, [url]);

  return { data, loading, refetch, setData };
}