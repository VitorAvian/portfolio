import React, { useEffect, useRef } from 'react';

export const DistortionGrain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const loop = () => {
      // Clear with very transparent black to leave trails? No, just clear.
      ctx.clearRect(0, 0, width, height);

      // Create noise
      const imageData = ctx.createImageData(width, height);
      const buffer32 = new Uint32Array(imageData.data.buffer);
      const len = buffer32.length;

      // We don't want to fill every pixel every frame (too heavy), 
      // let's fill random pockets to simulate static
      for (let i = 0; i < len; i += 4) { // Optimization: Skip pixels
        if (Math.random() < 0.1) { // Density
           // Gray noise
           const val = Math.random() * 255;
           // Alpha 15 (approx 0.05 opacity)
           // ABGR format for little-endian
           buffer32[i] = (15 << 24) | (val << 16) | (val << 8) | val;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Draw scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1);
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] mix-blend-overlay opacity-50"
    />
  );
};