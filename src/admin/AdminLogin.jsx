import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
      return;
    }

    navigate("/admin");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-5 py-16">
      <form
        onSubmit={submit}
        className="w-full rounded-4xl border-4 border-ink bg-card p-8 shadow-pop"
      >
        <Link to="/" className="text-sm font-bold text-muted-foreground hover:text-foreground">
          ← Back to store
        </Link>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-ink">Admin login</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to manage orders and products.
        </p>

        <label className="mt-6 block">
          <span className="text-sm font-bold text-ink">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-2xl border-4 border-ink/10 bg-background px-4 py-3 font-semibold outline-none focus:border-primary"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-sm font-bold text-ink">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 w-full rounded-2xl border-4 border-ink/10 bg-background px-4 py-3 font-semibold outline-none focus:border-primary"
          />
        </label>

        {error ? (
          <p className="mt-4 text-sm font-bold text-destructive">{error}</p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="press-pop mt-6 w-full rounded-full border-4 border-ink bg-gradient-sun py-3 font-display text-lg font-extrabold text-ink shadow-pop disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
