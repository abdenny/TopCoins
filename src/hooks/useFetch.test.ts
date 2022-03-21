import { renderHook, act } from '@testing-library/react-hooks';

import useFetch from './useFetch';

describe('useFetch', () => {
  it('returns initial state loading as true by default', () => {
    const { result } = renderHook(() => useFetch('/assets'));
    expect(result.current.state).toEqual({ loading: true, data: undefined, error: undefined });
  });

  it('returns initial state loading as false when disabled options are passed', () => {
    const { result } = renderHook(() => useFetch('/assets', { isDisabled: true }));
    expect(result.current.state).toEqual({ loading: false, data: undefined, error: undefined });
  });
});
