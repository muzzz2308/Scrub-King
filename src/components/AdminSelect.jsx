import { ChevronDown } from "lucide-react";

export function AdminSelect({ value, onChange, options, className = "", fullWidth = false }) {
  return (
    <div className={`relative ${fullWidth ? "block w-full" : "inline-flex"} ${className}`}>
      <select
        value={value}
        onChange={onChange}
        className={`appearance-none rounded-full border-4 border-ink bg-card py-2.5 pr-10 pl-4 font-display text-sm font-extrabold text-ink shadow-pop-sm outline-none transition-colors focus:border-primary ${fullWidth ? "w-full" : ""}`}
      >
        {options.map((option) => {
          const val = typeof option === "string" ? option : option.value;
          const label = typeof option === "string" ? option : option.label;
          return (
            <option key={val} value={val}>
              {label}
            </option>
          );
        })}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink"
      />
    </div>
  );
}
