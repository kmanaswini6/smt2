import { useEffect, useRef } from 'react';

interface ShadowPoint {
  x: number;
  y: number;
}

/**
 * Casts a soft "paper shadow" that follows the cursor across a container.
 * Cards near the pointer shift by a few pixels as if lifted by a draft.
 * No tilt, no 3D — just a calm parallax of stacked documents.
 */
export function usePaperCursor<T extends HTMLElement>(shift = 3) {
  const ref = useRef<T>(null);
  const raf = useRef<number | null>(null);
  const point = useRef<ShadowPoint>({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layers = Array.from(
      el.querySelectorAll<HTMLElement>('[data-paper-layer]')
    );

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      point.current = { x: px, y: py };
      if (raf.current == null) {
        raf.current = requestAnimationFrame(apply);
      }
    };

    const apply = () => {
      raf.current = null;
      const { x, y } = point.current;
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? '1');
        const s = shift * depth;
        layer.style.transform = `translate3d(${(-x * s).toFixed(2)}px, ${(-y * s).toFixed(2)}px, 0)`;
      });
    };

    const onLeave = () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
      raf.current = null;
      layers.forEach((layer) => {
        layer.style.transform = 'translate3d(0,0,0)';
      });
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, [shift]);

  return ref;
}
