import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const HOLD_MS = 10_000;

export function HappyPromiseTrigger() {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  function clearHold() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function startHold() {
    clearHold();
    timerRef.current = setTimeout(() => {
      clearHold();
      navigate("/admin");
    }, HOLD_MS);
  }

  useEffect(() => clearHold, []);

  return (
    <p
      role="button"
      tabIndex={0}
      aria-label="Happy promise"
      className="inline-block cursor-default select-none font-display text-lg font-bold text-ink outline-none"
      onMouseDown={startHold}
      onMouseUp={clearHold}
      onMouseLeave={clearHold}
      onTouchStart={startHold}
      onTouchEnd={clearHold}
      onTouchCancel={clearHold}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          startHold();
        }
      }}
      onKeyUp={clearHold}
      onBlur={clearHold}
    >
      Happy promise
    </p>
  );
}
