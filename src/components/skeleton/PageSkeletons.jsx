export function Skeleton({ className = "" }) {
  return (
    <div
      aria-hidden
      className={`animate-pulse rounded-2xl border-4 border-ink/10 bg-secondary/80 ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <article className="rounded-4xl border-4 border-ink bg-card p-7 shadow-pop">
      <Skeleton className="relative aspect-[4/3] w-full rounded-3xl" />
      <div className="mt-5 rounded-3xl border-4 border-ink/10 bg-background/50 p-5">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-8 w-2/5 rounded-full" />
          <Skeleton className="h-7 w-24 rounded-full" />
        </div>
        <Skeleton className="mt-3 h-4 w-full rounded-full" />
        <Skeleton className="mt-2 h-4 w-4/5 rounded-full" />
        <div className="mt-4 flex gap-2">
          <Skeleton className="h-11 flex-1 rounded-full" />
          <Skeleton className="h-11 w-28 rounded-full" />
        </div>
      </div>
    </article>
  );
}

export function PackCardSkeleton() {
  return (
    <article className="rounded-4xl border-4 border-ink bg-card p-6 shadow-pop">
      <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
      <Skeleton className="mt-4 h-7 w-3/4 rounded-full" />
      <Skeleton className="mt-2 h-4 w-1/2 rounded-full" />
      <Skeleton className="mt-3 h-9 w-28 rounded-full" />
      <Skeleton className="mt-2 h-3 w-40 rounded-full" />
      <Skeleton className="mt-5 h-12 w-full rounded-full" />
    </article>
  );
}

export function PageHeaderSkeleton({ centered = false }) {
  return (
    <div className={centered ? "mx-auto max-w-lg text-center" : "max-w-xl"}>
      <Skeleton className={`h-12 rounded-full ${centered ? "mx-auto w-72" : "w-64"}`} />
      <Skeleton className={`mt-3 h-5 rounded-full ${centered ? "mx-auto w-full" : "w-full max-w-md"}`} />
      {centered ? <Skeleton className="mx-auto mt-2 h-5 w-4/5 rounded-full" /> : null}
    </div>
  );
}

export function ShopPageSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <PageHeaderSkeleton />
      <div className="mt-10 grid gap-7 sm:grid-cols-2">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
      <section className="mt-20">
        <Skeleton className="h-10 w-72 rounded-full" />
        <Skeleton className="mt-2 h-5 w-96 max-w-full rounded-full" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PackCardSkeleton />
          <PackCardSkeleton />
        </div>
      </section>
    </div>
  );
}

export function HomeProductsSkeleton() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <PageHeaderSkeleton centered />
      <div className="mt-10 grid gap-7 sm:grid-cols-2">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </section>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <Skeleton className="h-4 w-28 rounded-full" />
      <div className="mt-6 grid items-start gap-10 md:grid-cols-2">
        <Skeleton className="aspect-[4/5] w-full rounded-4xl sm:aspect-[3/4]" />
        <div>
          <Skeleton className="h-6 w-40 rounded-full" />
          <Skeleton className="mt-3 h-12 w-3/4 rounded-full" />
          <Skeleton className="mt-3 h-10 w-36 rounded-full" />
          <Skeleton className="mt-4 h-20 w-full rounded-3xl" />
          <div className="mt-6 space-y-3">
            <Skeleton className="h-16 w-full rounded-3xl" />
            <Skeleton className="h-16 w-full rounded-3xl" />
            <Skeleton className="h-16 w-full rounded-3xl" />
          </div>
          <div className="mt-8 flex gap-3">
            <Skeleton className="h-14 w-48 rounded-full" />
            <Skeleton className="h-14 w-36 rounded-full" />
          </div>
          <div className="mt-8 grid gap-3 rounded-3xl border-4 border-ink/10 bg-card p-6 sm:grid-cols-2">
            <Skeleton className="h-16 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartPageSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <Skeleton className="h-12 w-48 rounded-full" />
      <ul className="mt-8 space-y-4">
        {[0, 1].map((i) => (
          <li key={i} className="flex items-center gap-4 rounded-3xl border-4 border-ink bg-card p-4 shadow-pop">
            <Skeleton className="size-16 shrink-0 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-6 w-2/3 rounded-full" />
              <Skeleton className="h-4 w-1/2 rounded-full" />
            </div>
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </li>
        ))}
      </ul>
      <div className="mt-8 rounded-4xl border-4 border-ink bg-card p-7 shadow-pop">
        <Skeleton className="h-4 w-full rounded-full" />
        <Skeleton className="mt-3 h-4 w-full rounded-full" />
        <Skeleton className="mt-5 h-8 w-full rounded-full" />
        <Skeleton className="mt-6 h-12 w-full rounded-full" />
      </div>
    </div>
  );
}

export function CheckoutPageSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <Skeleton className="h-12 w-56 rounded-full" />
      <Skeleton className="mt-2 h-5 w-80 max-w-full rounded-full" />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-4xl border-4 border-ink bg-card p-7 shadow-pop">
          <Skeleton className="h-8 w-48 rounded-full" />
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className={`h-14 rounded-2xl ${i >= 2 && i <= 3 ? "sm:col-span-2" : ""}`} />
            ))}
          </div>
          <Skeleton className="mt-6 h-24 w-full rounded-3xl" />
          <Skeleton className="mt-6 h-14 w-full rounded-full" />
        </div>
        <aside className="rounded-4xl border-4 border-ink bg-card p-7 shadow-pop">
          <Skeleton className="h-8 w-40 rounded-full" />
          <div className="mt-5 space-y-3">
            <Skeleton className="h-14 w-full rounded-2xl" />
            <Skeleton className="h-14 w-full rounded-2xl" />
          </div>
          <Skeleton className="mt-5 h-8 w-full rounded-full" />
        </aside>
      </div>
    </div>
  );
}

export function AboutPageSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <Skeleton className="h-14 w-full max-w-2xl rounded-full" />
      <Skeleton className="mt-4 h-24 w-full rounded-3xl" />
      <Skeleton className="mt-10 aspect-[16/9] w-full rounded-4xl" />
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-4xl border-4 border-ink bg-card p-6 shadow-pop">
            <Skeleton className="h-9 w-12 rounded-full" />
            <Skeleton className="mt-2 h-6 w-3/4 rounded-full" />
            <Skeleton className="mt-2 h-16 w-full rounded-2xl" />
          </div>
        ))}
      </div>
      <Skeleton className="mt-12 h-12 w-48 rounded-full" />
    </div>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 w-48 rounded-full" />
      <Skeleton className="mt-2 h-5 w-72 rounded-full" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="rounded-4xl border-4 border-ink bg-card p-6 shadow-pop">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="mt-3 h-10 w-20 rounded-full" />
          </div>
        ))}
      </div>
      <div className="mt-10 space-y-8">
        {[0, 1, 2].map((i) => (
          <div key={i}>
            <Skeleton className="h-8 w-40 rounded-full" />
            <div className="mt-4 space-y-3">
              <Skeleton className="h-20 w-full rounded-3xl" />
              <Skeleton className="h-20 w-full rounded-3xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminOrdersSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-32 rounded-full" />
        <Skeleton className="h-10 w-24 rounded-full" />
      </div>
      <div className="mt-8 space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-4xl border-4 border-ink bg-card p-6 shadow-pop">
            <div className="flex justify-between gap-4">
              <Skeleton className="h-8 w-40 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdminProductsSkeleton() {
  return (
    <div className="space-y-12">
      <Skeleton className="h-10 w-40 rounded-full" />
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-4xl border-4 border-ink bg-card p-6 shadow-pop">
          <Skeleton className="h-8 w-48 rounded-full" />
          <div className="mt-4 space-y-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-2xl" />
            ))}
          </div>
        </div>
        <div className="rounded-4xl border-4 border-ink bg-card p-6 shadow-pop">
          <Skeleton className="h-8 w-40 rounded-full" />
          <div className="mt-4 space-y-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminGuardSkeleton() {
  return (
    <div className="mx-auto max-w-lg px-5 py-20">
      <div className="rounded-4xl border-4 border-ink bg-card p-10 shadow-pop">
        <Skeleton className="mx-auto h-10 w-48 rounded-full" />
        <Skeleton className="mx-auto mt-4 h-5 w-full rounded-full" />
      </div>
    </div>
  );
}

export function NotFoundSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20">
      <div className="rounded-4xl border-4 border-ink bg-card p-14 shadow-pop">
        <Skeleton className="mx-auto h-8 w-36 rounded-full" />
        <Skeleton className="mx-auto mt-6 h-28 w-64 rounded-full" />
        <Skeleton className="mx-auto mt-4 h-10 w-80 max-w-full rounded-full" />
        <Skeleton className="mx-auto mt-4 h-16 w-full max-w-md rounded-3xl" />
        <div className="mx-auto mt-8 flex justify-center gap-3">
          <Skeleton className="h-12 w-32 rounded-full" />
          <Skeleton className="h-12 w-36 rounded-full" />
        </div>
      </div>
    </div>
  );
}
