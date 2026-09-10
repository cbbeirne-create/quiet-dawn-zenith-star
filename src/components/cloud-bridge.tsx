import { useEffect, useRef } from "react";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useT4 } from "@/lib/store";
import { getWorkspace, saveWorkspace } from "@/lib/workspace-api";

export function CloudBridge() {
  const { user, isPending } = useCurrentUserState();
  const loadedFor = useRef<string | null>(null);
  const ready = useRef(false);

  useEffect(() => {
    if (isPending || !user) {
      loadedFor.current = null;
      ready.current = false;
      return;
    }
    if (loadedFor.current === user.id) return;
    loadedFor.current = user.id;
    ready.current = false;
    let cancelled = false;
    void (async () => {
      try {
        const remote = await getWorkspace();
        if (cancelled) return;
        const local = useT4.getState();
        const remoteEmpty = !remote.profile && remote.applications.length === 0;
        const localHas = Boolean(local.profile) || local.applications.length > 0;
        if (remoteEmpty && localHas) {
          await saveWorkspace({
            data: {
              profile: local.profile,
              applications: local.applications,
              savedIds: local.savedIds,
            },
          });
        } else if (!remoteEmpty) {
          useT4.setState({
            profile: remote.profile,
            applications: remote.applications,
            savedIds: remote.savedIds,
          });
        }
        if (!cancelled) ready.current = true;
      } catch {
        loadedFor.current = null;
        ready.current = false;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  useEffect(() => {
    if (isPending || !user) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    const unsub = useT4.subscribe((state) => {
      if (!ready.current || loadedFor.current !== user.id) return;
      if (t) clearTimeout(t);
      t = setTimeout(() => {
        void saveWorkspace({
          data: {
            profile: state.profile,
            applications: state.applications,
            savedIds: state.savedIds,
          },
        }).catch(() => {
          /* keep local copy */
        });
      }, 800);
    });
    return () => {
      unsub();
      if (t) clearTimeout(t);
    };
  }, [user, isPending]);

  return null;
}
