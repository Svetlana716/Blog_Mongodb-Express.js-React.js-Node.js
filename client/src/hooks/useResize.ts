import { useState, useEffect } from "react";
import { SCREEN_DESKTOP, SCREEN_MOBILE } from "../utils/constants";

const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = (event: Event) => {
    const { innerWidth } = event.target as Window;
    setWidth(innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    isMobile: width <= SCREEN_MOBILE,
    isTablet: width >= SCREEN_MOBILE && width <= SCREEN_DESKTOP,
    isDesktop: width >= SCREEN_DESKTOP,
  };
};

export default useResize;
