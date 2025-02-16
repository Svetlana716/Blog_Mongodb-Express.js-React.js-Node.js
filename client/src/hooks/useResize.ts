import { useState, useEffect } from "react";
import { SCREEN_LG, SCREEN_SM } from "../utils/constants";

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
    isMobile: width <= SCREEN_SM,
    isTablet: width >= SCREEN_SM && width <= SCREEN_LG,
    isDesktop: width >= SCREEN_LG,
  };
};

export default useResize;
