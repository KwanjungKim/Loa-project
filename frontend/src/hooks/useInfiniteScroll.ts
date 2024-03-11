import { useEffect, useRef } from "react";

const useInfinteScroll = (callback: () => void) => {
  const isThrottling = useRef(false);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isThrottling.current) return;
      if (
        window.innerHeight + document.documentElement.scrollTop <=
        document.documentElement.offsetHeight - 10
      )
        return;
      callback();
      isThrottling.current = true;
      timeoutId.current = setTimeout(() => {
        isThrottling.current = false;
      }, 1000);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [callback]);
};

export default useInfinteScroll;
