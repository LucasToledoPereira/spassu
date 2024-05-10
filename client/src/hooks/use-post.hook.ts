'use client';

import { useState, useEffect } from 'react';

export interface PostFetchOptions {
  header?: Record<string, any>;
  queryParams?: Record<string, any>;
  formData?: boolean;
  body?: any;
  eager?: boolean;
}

export function usePost<T>(
  base: string,
  options: PostFetchOptions = { formData: false, eager: false }
): {
  loading: boolean;
  finished: boolean;
  success: boolean;
  error: Error | any;
  response: T | any | undefined;
  post: (body?: any, concat?: string) => void;
} {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | any>();
  const [response, setResponse] = useState<T | any | undefined>();
  const header = options.formData
    ? { Accept: 'application/json' }
    : { Accept: 'application/json', 'Content-Type': 'application/json' };

  const post = (body: Record<string, any> | FormData = {}, concat?: string) => {
    setLoading(true);
    setFinished(false);
    setSuccess(false);
    setError(undefined);
    setResponse(undefined);
    const resource = concat ? `${base}${concat}` : base;

    fetch(resource, {
      method: 'POST',
      headers: header as any,
      body: body instanceof FormData ? body : JSON.stringify(body),
    })
      .then(async (response) => {
        const ok = await response.ok;
        const result = await response.json();
        const setStateFn = ok ? setResponse : setError;
        setSuccess(ok);
        setStateFn(result);
      })
      .catch((e) => {
        setError(e);
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
        setFinished(true);
      });
  };

  /**
   * Auto execute after call useGet
   */
  useEffect(() => {
    if (options.eager) {
      post(options.body);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    loading,
    finished,
    response,
    error,
    post,
    success,
  };
}
