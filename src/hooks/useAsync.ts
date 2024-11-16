import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../utils/error';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

export function useAsync<T>(
  asyncFn: () => Promise<T>,
  immediate = true,
  deps: any[] = []
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await asyncFn();
      setState({ data, loading: false, error: null });
    } catch (error) {
      setState({ data: null, loading: false, error: error as ApiError });
    }
  }, deps);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute]);

  return state;
}