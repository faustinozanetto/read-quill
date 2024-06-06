import { MutableRefObject, RefObject, useEffect, useRef, useState } from 'react';

interface UseIsVisibleProps {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseIsVisibleReturn<T extends HTMLElement> {
  ref: RefObject<T>;
  inView: boolean;
}

export const useIsVisible = <T extends HTMLElement>(props: UseIsVisibleProps = {}): UseIsVisibleReturn<T> => {
  const { root = null, rootMargin = '0px', threshold = 0.2 } = props;

  const [inView, setInView] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return { ref, inView };
};
