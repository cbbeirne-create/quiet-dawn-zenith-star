import { useEffect, useState } from "react";
import { useT4 } from "./store";

export function useHydrated() {
  const [hydrated, setHydrated] = useState(() => useT4.persist.hasHydrated());

  useEffect(() => {
    setHydrated(useT4.persist.hasHydrated());
    return useT4.persist.onFinishHydration(() => setHydrated(true));
  }, []);

  return hydrated;
}
