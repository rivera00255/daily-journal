import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: Function) => {
  const ref: any = useRef(null);

  useEffect(() => {
    const handleClick = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);

  return ref;
};
