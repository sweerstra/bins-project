import { useCallback, useEffect } from 'react';

export function useKeyDown(predicate, prevent, handler) {
  const callback = useCallback(e => {
    if (predicate(e)) {
      if (prevent) e.preventDefault();
      handler(e);
    }
  }, [predicate, prevent, handler]);

  useEffect(() => {
    window.addEventListener('keydown', callback);

    return () => window.removeEventListener('keydown', callback);
  }, [callback]);
}
