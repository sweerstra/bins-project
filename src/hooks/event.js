import { useEffect } from 'react';

export const useKeyDown = (predicate, handler) => {
  const callback = e => {
    return predicate(e) && handler(e);
  };

  useEffect(() => {
    window.addEventListener('keydown', callback);

    return () => {
      window.removeEventListener('keydown', callback);
    }
  }, [predicate, handler]);
};
