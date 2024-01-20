import { MutableRefObject, useEffect, useRef, useState } from 'react';

interface UseIsVisibleProps {
  options?: IntersectionObserverInit;
}

interface UseIsVisibleReturn {
  ref: MutableRefObject<null>;
  isVisible: boolean;
}

export const useIsVisible = (props: UseIsVisibleProps = { options: { root: null } }): UseIsVisibleReturn => {
  const { options = {} } = props;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(intersectionCallback, options);
    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref]);

  return { ref, isVisible };
};
