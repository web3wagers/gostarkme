import { useState, useEffect, useRef, RefObject } from "react";

/**
 * Hook to get the size of a component
 * @description This hook is used to get the size of a specific component.
 * @param initialWidth - The initial width of the component
 * @param initialHeight - The initial height of the component
 * @returns The size of the component
 */

const useComponentSize = (
  initialWidth: number = 1200,
  initialHeight: number = 500
): [RefObject<HTMLDivElement>, number, number] => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(initialWidth);
  const [height, setHeight] = useState<number>(initialHeight);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
      setHeight(entries[0].contentRect.height);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ref.current && observer.unobserve(ref.current);
    };
  }, []);

  return [ref, width, height] as const;
};

export default useComponentSize;
