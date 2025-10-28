import { useEffect, useRef, useState } from "react";

export const useInfiniteScroll = (totalItems: number, batchSize = 100) => {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (totalItems === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && visibleCount < totalItems) {
          setVisibleCount((prev) => Math.min(prev + batchSize, totalItems));
        }
      },
      { threshold: 0.5 }
    );

    const current = loadMoreRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [visibleCount, totalItems, batchSize]);

  return { visibleCount, loadMoreRef, setVisibleCount };
};
