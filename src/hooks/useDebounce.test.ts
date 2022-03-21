import { renderHook, act } from '@testing-library/react-hooks';
import useDebounce from './useDebounce';

describe('useDebounce', () => {
  it('should return the initial value', () => {
    const { result } = renderHook(() => useDebounce('', 1000));
    expect(result.current).toBe('');
  });

  it('should return the debounced value', () => {
    const { result } = renderHook(() => useDebounce('Hello', 1000));
    expect(result.current).toBe('Hello');
    act(() => {
      jest.useFakeTimers();
      jest.advanceTimersByTime(1000);
    });
    expect(result.current).toBe('Hello');
  });
});
