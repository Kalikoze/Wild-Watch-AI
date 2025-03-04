import { RefObject, useEffect } from 'react';

/**
 * A hook that detects clicks outside of a specified element.
 * 
 * @param ref - React ref object for the element to detect clicks outside of
 * @param callback - Function to call when a click outside is detected
 */
const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void
): void => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside; 