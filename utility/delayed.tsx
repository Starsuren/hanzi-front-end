import { useState,useEffect, PropsWithChildren, ReactNode } from "react";

 
export const Delayed:React.FC<PropsWithChildren<{waitBeforeShow?: number}>> = ({children, waitBeforeShow}) => {
    const [isShown, setIsShown] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsShown(true);
      }, waitBeforeShow);
      return () => clearTimeout(timer);
    }, [waitBeforeShow]);
  
    return isShown ? children as JSX.Element : null as unknown as JSX.Element ;
  };
  
  