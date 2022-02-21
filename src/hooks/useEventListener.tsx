import { useEffect, useRef, RefObject } from 'react';

export default function useEventListener<T extends HTMLElement>(
  eventType: keyof WindowEventMap,
  callback: (e: Event) => void,
  element?: RefObject<T>
) {
  // Create a ref that stores handler
  const callbackRef = useRef<(e: Event) => void>(callback);

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current || window;
    if (!(targetElement && targetElement.addEventListener)) {
      return;
    }
    // Update saved handler if necessary
    if (callbackRef.current !== callback) {
      callbackRef.current = callback;
    }
    const handler = (e: Event) => callbackRef.current(e);
    targetElement.addEventListener(eventType, handler);

    return () => targetElement.removeEventListener(eventType, handler);
  }, [eventType, element, callback]);
}
