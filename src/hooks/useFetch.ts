import { useEffect, useReducer, useRef } from 'react';

import axios from 'util/axios';

interface State<T> {
  loading: boolean;
  data?: T;
  error?: Error;
}
type Action<T> = { type: 'fetched'; payload: T } | { type: 'error'; payload: Error };

function useFetch<T = unknown>(url: string): State<T> {
  // Ref to ensure we don't call a state update on an unmounted component.
  const endRequest = useRef(false);

  // Initial state of loading is true. Is set to false when the request is completed/errors.
  const initialState: State<T> = {
    loading: true,
    error: undefined,
    data: undefined,
  };

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'fetched':
        return { ...initialState, data: action.payload, loading: action.payload ? false : true };
      case 'error':
        return { ...initialState, error: action.payload, loading: action.payload ? false : true };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(url);
        if (!response.data) {
          throw new Error("We didn't get any data from the server");
        }
        const data = response.data as T;

        if (endRequest.current) return;
        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (endRequest.current) return;
        dispatch({ type: 'error', payload: error as Error });
      }
    };

    fetchData();

    // Initial value is false, set to true on useEffect cleanup to avoid a possible state update after the component is unmounted.
    return () => {
      endRequest.current = true;
    };
  }, [url]);

  return state;
}

export default useFetch;
