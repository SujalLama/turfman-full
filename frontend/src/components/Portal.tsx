"use client";

//components/ClientPortal.tsx

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ClientPortalInterface = {
  children: React.ReactNode;
  show?: boolean;
  onClose?: () => void;
  selector: string;
};

export default function Portal ({ children, selector, show }: ClientPortalInterface)  {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);

    if(show) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "auto"
    }
    
  }, [selector, show]);
  return show && ref.current ? createPortal(children, ref.current) : null;
};

