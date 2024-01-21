import { useEffect, useRef, useState } from 'react';

interface UseIsVisibleProps {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number | number[];
}

interface UseIsVisibleReturn {
  targetRef: React.RefObject<HTMLDivElement>;
  isVisible: boolean;
}

export const useIsVisible = (props: UseIsVisibleProps = {}): UseIsVisibleReturn => {
  const { root = null, rootMargin = '0px', threshold = 0 } = props;

  const targetRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const target = targetRef.current;

    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [root, rootMargin, threshold]);

  return { targetRef, isVisible };
};
