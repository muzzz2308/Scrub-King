import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { AdminGuardSkeleton } from "../components/skeleton/PageSkeletons";

export default function AdminGuard() {
  const location = useLocation();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="mx-auto max-w-lg px-5 py-20 text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink">Admin unavailable</h1>
        <p className="mt-3 text-muted-foreground">
          Add <code className="font-bold">VITE_SUPABASE_URL</code> and{" "}
          <code className="font-bold">VITE_SUPABASE_ANON_KEY</code> to your env file.
        </p>
      </div>
    );
  }

  if (loading) {
    return <AdminGuardSkeleton />;
  }

  if (!session && location.pathname !== "/admin/login") {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  if (session && location.pathname === "/admin/login") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
}
