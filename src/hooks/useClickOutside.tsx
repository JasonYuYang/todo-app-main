import React, { useEffect } from 'react';

// interface DOMEvent<T extends EventTarget> extends Event {
//   readonly target: T;
// }
// type HTMLElementEvent<T extends HTMLElement> = Event & {
//   target: T;
//   // probably you might want to add the currentTarget as well
//   // currentTarget: T;
// };

const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: (ev: MouseEvent | TouchEvent) => void
) => {
  useEffect(() => {
    let maybeHandler = (ev: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(ev.target as Node)) {
        handler(ev);
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  }, [ref, handler]);
};

export default useClickOutside;
