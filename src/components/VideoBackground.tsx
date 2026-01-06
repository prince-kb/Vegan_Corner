import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

const FRAME_COUNT = 120;
const FRAME_PATH = (i: number) => new URL(`../assets/videoSequence/ezgif-frame-${String(i).padStart(3, "0")}.jpg`, import.meta.url).href;

export default function VideoBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  // Track scroll progress for the container section (0 when section top hits viewport top, 1 when section bottom hits viewport bottom)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // Smooth frame tracking (springed motion value for smooth interpolation)
  const progressSpring = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    let mounted = true;
    const loadedImgs: HTMLImageElement[] = [];
    let loadCount = 0;

    const onImgLoad = (img: HTMLImageElement) => {
      loadCount++;
      if (!mounted) return;

      // Update progress percent as frames are attempted (successful or errored)
      setProgress(Math.round((loadCount / FRAME_COUNT) * 100));

      // After first load, sample background color and set body background for seamless blend
      if (loadCount === 1) {
        try {
          const sCanvas = document.createElement("canvas");
          sCanvas.width = img.width;
          sCanvas.height = img.height;
          const ctx = sCanvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const p = ctx.getImageData(0, 0, 1, 1).data;
            const color = `rgb(${p[0]}, ${p[1]}, ${p[2]})`;
            document.documentElement.style.setProperty("--bg-image-sampled", color);
            document.body.style.background = color;
          }
        } catch {
          // ignore
        }
      }
      if (loadCount === FRAME_COUNT) {
        // Post-process frames: if any image failed (naturalWidth === 0), replace it with
        // the nearest successful frame. If none exist, use a 1x1 transparent fallback.
        for (let i = 0; i < loadedImgs.length; i++) {
          const imgI = loadedImgs[i];
          if (!imgI || imgI.naturalWidth === 0) {
            let replacement: HTMLImageElement | null = null;

            // search backwards for nearest good frame
            for (let j = i - 1; j >= 0; j--) {
              if (loadedImgs[j] && loadedImgs[j].naturalWidth > 0) {
                replacement = loadedImgs[j];
                break;
              }
            }

            // search forwards if not found backwards
            if (!replacement) {
              for (let j = i + 1; j < loadedImgs.length; j++) {
                if (loadedImgs[j] && loadedImgs[j].naturalWidth > 0) {
                  replacement = loadedImgs[j];
                  break;
                }
              }
            }

            // if still not found, create a 1x1 transparent image as a fallback
            if (!replacement) {
              const filler = document.createElement('canvas');
              filler.width = 1;
              filler.height = 1;
              const ctx2 = filler.getContext('2d');
              if (ctx2) {
                ctx2.clearRect(0, 0, 1, 1);
              }
              const imgFallback = new Image();
              imgFallback.src = filler.toDataURL();
              replacement = imgFallback;
            }

            loadedImgs[i] = replacement;
          }
        }

        const good = loadedImgs.filter((im) => im && im.naturalWidth > 0).length;
        console.info(`[VideoBackground] frames ready: ${good}/${loadedImgs.length}`);

        setProgress(100);
        setLoaded(true);
        setImages(loadedImgs.slice());
      }
    };

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = document.createElement("img") as HTMLImageElement;
      img.src = FRAME_PATH(i);
      img.onload = () => onImgLoad(img);
      img.onerror = () => {
        // If any image fails, still count it so spinner doesn't hang forever
        console.warn('[VideoBackground] failed to load frame', img.src);
        onImgLoad(img);
      };
      loadedImgs.push(img);
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Draw loop
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;

    const draw = () => {
      animationFrame = requestAnimationFrame(draw);
      const progress = progressSpring.get(); // 0..1
      const rawIndex = progress * (FRAME_COUNT - 1);
      const index = Math.round(rawIndex);

      const img = images[index];
      // If image failed to load it may be in a 'broken' state (naturalWidth === 0). Skip drawing.
      if (!img || img.naturalWidth === 0) return;

      // If the frame was replaced with a 1x1 fallback, fill canvas with the sampled background color.
      if (img.naturalWidth === 1 && img.naturalHeight === 1) {
        const sampled = getComputedStyle(document.documentElement).getPropertyValue('--bg-image-sampled') || 'black';
        ctx.fillStyle = sampled.trim() || 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }

      // handle DPR for crispness
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw with contain fit and center
      const imgAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;
      let drawW = canvas.width;
      let drawH = canvas.height;

      if (imgAspect > canvasAspect) {
        drawW = canvas.width;
        drawH = drawW / imgAspect;
      } else {
        drawH = canvas.height;
        drawW = drawH * imgAspect;
      }

      const dx = (canvas.width - drawW) / 2;
      const dy = (canvas.height - drawH) / 2;

      ctx.drawImage(img, dx, dy, drawW, drawH);
    };

    draw();

    return () => cancelAnimationFrame(animationFrame);
  }, [images, progressSpring]);

  // Text transforms (only CTA remains)
  const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full text-black">
      {/* Sticky canvas */}
      <canvas
        ref={canvasRef}
        className="sticky top-0 h-screen w-full block mx-auto"
        aria-hidden
      />

      {/* Loading overlay */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" aria-live="polite">
          <div className="flex flex-col items-center gap-6">
            <div aria-hidden className="text-9xl font-extrabold text-gray-800 select-none" style={{ lineHeight: 1 }}>{progress}%</div>
            <div className="text-sm text-gray-700">Loading frames…</div>
            <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Text overlays (reduced) */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="absolute bottom-10 w-full flex items-center justify-center pointer-events-auto">
          <motion.div style={{ opacity: ctaOpacity }}>
            <a href="https://veganseller.princekb.media" target="_blank" className="bg-[#4b2e2a] text-white px-6 py-3 rounded-full font-semibold">
              Sell with Vegan Corner
            </a>
          </motion.div>
        </div>
      </div>

      {/* Accessibility: hidden image fallback for assistive tech */}
      <div className="sr-only" aria-hidden={!loaded}>
        {loaded && (
          // Small, hidden image for accessibility (keeps linter happy)
          <img src={FRAME_PATH(1)} alt={"Vegan's bucket animation frame"} width={1} height={1} className="hidden" />
        )}
      </div>
    </div>
  );
}
