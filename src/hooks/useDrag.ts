import { useEffect, useState, useRef } from "react";
import { timer } from "d3-timer";
import type { Timer } from "d3-timer";

const useDrag = (alpha = 0.2) => {
  const elRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const position = { x: 0, y: 0 };
  const position2 = { x: 0, y: 0 };
  const shiftPosition = { x: 0, y: 0 };
  let timerRef: Timer;

  useEffect(() => {
    if (!elRef.current) return;

    const element = elRef.current;
    element.style.touchAction = "none";

    const updateElement = () => {
      if (
        !("dragging" in element.dataset) &&
        Math.abs(position2.x - position.x) < 0.01 &&
        Math.abs(position2.y - position.y) < 0.01
      ) {
        timerRef.stop();
      }

      position.x = position.x + (position2.x - position.x) * alpha;
      position.y = position.y + (position2.y - position.y) * alpha;
      element.style.transform = `translate(${position.x}px, ${position.y}px)`;
    };

    const startDrag = (e: PointerEvent) => {
      element.dataset.dragging = "";
      setIsDragging(true);

      const boundingRect = element.getBoundingClientRect();
      shiftPosition.x = e.clientX - boundingRect.left;
      shiftPosition.y = e.clientY - boundingRect.top;

      element.onpointermove = drag;
      element.setPointerCapture(e.pointerId);

      timerRef = timer(updateElement);
    };

    const drag = (e: PointerEvent) => {
      position2.x = e.clientX - shiftPosition.x;
      position2.y = e.clientY - shiftPosition.y;
    };

    const stopDrag = (e: PointerEvent) => {
      delete element.dataset.dragging;
      setIsDragging(false);

      element.onpointermove = null;
      element.releasePointerCapture(e.pointerId);
    };

    element.onpointerdown = startDrag;
    element.onpointerup = stopDrag;
  }, [elRef]);

  return { elRef, isDragging };
};

export default useDrag;
