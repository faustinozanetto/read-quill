import type { RefObject } from 'react';
import { useState, useEffect, useRef } from 'react';

interface UseCountUpScrollProps {
  startValue: number;
  endValue: number;
  startOnInView?: boolean;
  duration?: number;
  easingFunction?: (t: number) => number;
}

interface UseCountUpReturn {
  count: number;
  ref: RefObject<HTMLDivElement>;
}

const easeOutQuad = (t: number): number => t * (2 - t);

export const useCountUp = ({
  startValue,
  endValue,
  startOnInView = true,
  duration = 1000,
  easingFunction = easeOutQuad,
}: UseCountUpScrollProps): UseCountUpReturn => {
  const [count, setCount] = useState(startValue);
  const [_isVisible, setIsVisible] = useState(startOnInView);

  const countRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;

    const animateCount = (timestamp: number): void => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easingFunction(progress);
      const currentCount = Math.floor(startValue + easedProgress * (endValue - startValue));

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]): void => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setIsVisible(true);
        animationFrameId = requestAnimationFrame(animateCount);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.25, // Adjust as needed based on when you want the animation to start
    });

    if (startOnInView && countRef.current) {
      observer.observe(countRef.current);
    } else {
      animationFrameId = requestAnimationFrame(animateCount);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [startValue, endValue, duration, startOnInView]);

  return { count, ref: countRef };
};
