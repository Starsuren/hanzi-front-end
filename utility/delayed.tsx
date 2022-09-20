import { useState,useEffect, PropsWithChildren } from "react";

 
export const Delayed:React.FC<PropsWithChildren<{time?: number}>> = ({children, time}) => {
    const [isShown, setIsShown] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsShown(true);
      }, time);
      return () => clearTimeout(timer);
    }, [time]);
  
    return isShown ? children as JSX.Element : null as unknown as JSX.Element ;
  };
  
  