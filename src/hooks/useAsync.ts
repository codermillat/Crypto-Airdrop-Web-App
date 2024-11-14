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
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await asyncFn();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const apiError = error instanceof ApiError ? error : new ApiError('An unexpected error occurred');
      setState({ data: null, loading: false, error: apiError });
      throw apiError;
    }
  }, [asyncFn, ...deps]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    ...state,
    execute,
    reset: () => setState({ data: null, loading: false, error: null }),
  };
}

export default useAsync;