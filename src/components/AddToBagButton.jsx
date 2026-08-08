import { useState } from "react";
import { useCart } from "../lib/Cart";

export function AddToBagButton({
  packId,
  disabled = false,
  className = "",
  children,
  addedLabel = "Added! ✨",
}) {
  const { add } = useCart();
  const [popping, setPopping] = useState(false);
  const [label, setLabel] = useState(children);

  function handleClick(event) {
    if (disabled || !packId) return;

    add(packId, 1, { x: event.clientX, y: event.clientY });
    setPopping(true);
    setLabel(addedLabel);

    window.setTimeout(() => {
      setPopping(false);
      setLabel(children);
    }, 650);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`${className} ${popping ? "animate-add-pop !bg-sunny !text-ink" : ""}`}
    >
      {label}
    </button>
  );
}
