import { useState, useEffect } from 'react';

export default function useMediaQuery(mediaQuery: string) {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList>();

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);
  useEffect(() => {
    const handler = (e: { matches: boolean }) => setIsMatch(e.matches);
    mediaQueryList?.addEventListener('change', handler);
    return () => mediaQueryList?.removeEventListener('change', handler);
  }, [mediaQueryList]);

  return isMatch;
}
