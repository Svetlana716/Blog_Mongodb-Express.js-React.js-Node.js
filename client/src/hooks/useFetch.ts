import { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect, useCallback } from "react";
import { IResponseError } from "../utils/types";

export function useFetch<T>(promise: Promise<AxiosResponse<T>>) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError<IResponseError> | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await promise;
      setResponse(response.data);
    } catch (err) {
      const error = err as AxiosError<IResponseError>;
      setError(error);
    }

    setLoading(false);
  }, [promise]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, response, error };
}
