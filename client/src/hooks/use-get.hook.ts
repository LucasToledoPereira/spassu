'use client';

import { useCallback, useEffect, useState } from 'react';
import { LRUCache } from 'lru-cache';
import md5 from 'md5';

const cache = new LRUCache({ max: 50 });

export interface GetFetchOptions {
  eager?: boolean;
  header?: Record<string, any>;
  queryParams?: Record<string, any>;
  cache?: boolean;
}

export function useGet<T>(
  base: string,
  options: GetFetchOptions = { eager: false, cache: true }
): {
  loading: boolean;
  finished: boolean;
  error: Error | any;
  response: T | undefined;
  get: (queryParams?: Record<string, any>, concat?: string) => void;
} {
  //Set cache to true if the cache attribute is not sent
  options.cache = options.cache === undefined ? true : options.cache;
  const [loading, setLoading] = useState(options.eager ?? false);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState<Error | any>();
  const [response, setResponse] = useState<T>();

  const get = useCallback(
    (queryParams?: Record<string, any>, concat?: string) => {
      setLoading(true);
      const resource = concat ? `${base}${concat}` : base;
      const key = `${resource}.${md5(
        JSON.stringify({ ...options, ...queryParams })
      )}`;
      const value = options.cache ? (cache.get(key) as any) : null;
      const _query = options.queryParams
        ? { ...options.queryParams, ...queryParams }
        : queryParams;
      const params = new URLSearchParams(_query);
      const url = _query ? `${resource}?${params}` : resource;

      if (value) {
        setLoading(false);
        setFinished(true);
        setError(value.error);
        setResponse(value.response);
        return;
      }

      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          ...(options.header || {}),
        },
      })
        .then(async (response) => {
          const ok = await response.ok;
          let result;
          try {
            result = await response.json();
          } catch {
            result = {}
          }
          const setStateFn = ok ? setResponse : setError;
          setStateFn(result);
          cache.set(key, {
            error: !ok ? result : null,
            response: ok ? result : null,
          });
        })
        .catch((e) => {
          setError(e);
          cache.set(key, { error: e, response: null });
        })
        .finally(() => {
          setLoading(false);
          setFinished(true);
        });
    },
    [base, options]
  );

  /**
   * Auto execute after call useGet
   */
  useEffect(() => {
    if (options.eager) {
      get();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    finished,
    response,
    error,
    get,
  };
}
