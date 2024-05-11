'use client';

import { useState } from 'react';

export function useDelete<T>(base: string): {
  loading: boolean;
  finished: boolean;
  success: boolean;
  error: Error | any;
  response: T | any | undefined;
  remove: (concat?: string) => void;
} {
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<Error | any>();
  const [response, setResponse] = useState<T | any | undefined>();

  const remove = (concat?: string) => {
    const resource = concat ? `${base}${concat}` : base;
    setLoading(true);
    setFinished(false);
    setSuccess(false);
    setError(undefined);
    setResponse(undefined);

    fetch(resource, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        const ok = await response.ok;
        const result = response.status !== 204 ? await response.json() : null;
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

  return {
    loading,
    finished,
    response,
    error,
    remove,
    success,
  };
}
