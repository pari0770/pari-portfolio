'use client';

import { createContext, useContext, useState } from 'react';

interface ActiveProjectContextType {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  openDetailId: string | null;
  setOpenDetailId: (id: string | null) => void;
}

const ActiveProjectContext = createContext<ActiveProjectContextType>({
  activeIndex: 0,
  setActiveIndex: () => {},
  openDetailId: null,
  setOpenDetailId: () => {},
});

export function ActiveProjectProvider({ children }: { children: React.ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openDetailId, setOpenDetailId] = useState<string | null>(null);
  return (
    <ActiveProjectContext.Provider value={{ activeIndex, setActiveIndex, openDetailId, setOpenDetailId }}>
      {children}
    </ActiveProjectContext.Provider>
  );
}

export function useActiveProject() {
  return useContext(ActiveProjectContext);
}
