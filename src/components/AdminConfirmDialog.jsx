export function AdminConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  destructive = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-ink/40"
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-confirm-title"
        className="relative w-full max-w-md rounded-4xl border-4 border-ink bg-card p-6 shadow-pop"
      >
        <h2 id="admin-confirm-title" className="font-display text-xl font-extrabold text-ink">
          {title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border-4 border-ink bg-background px-5 py-2.5 text-sm font-extrabold text-ink shadow-pop-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-full border-4 border-ink px-5 py-2.5 text-sm font-extrabold shadow-pop-sm ${
              destructive
                ? "bg-destructive text-destructive-foreground"
                : "bg-gradient-sun text-ink"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
