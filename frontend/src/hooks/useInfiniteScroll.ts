import { useEffect } from "react";

const useInfinteScroll = (callback: () => void) => {
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop <=
        document.documentElement.offsetHeight - 10
      )
        return;
      callback();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback]);
};

export default useInfinteScroll;
