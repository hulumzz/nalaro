// Interactive 2D Canvas Field (Desain.md §9.2)

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
const isStaticField = isStaticField || isSmallScreen;

class Point {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  targetX: number;
  targetY: number;
  active: boolean = false;
  intensity: number = 0; // For scanline effect

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.baseX = x;
    this.baseY = y;
    this.targetX = x;
    this.targetY = y;
  }
}

function initField() {
  const canvas = document.getElementById("hero-field") as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let points: Point[] = [];
  
  const SPACING = 24;
  const RADIUS = 1;
  const HOVER_RADIUS = 140;
  const HOVER_FORCE = 10; // max distance to push
  const LERP_SPEED = 0.12;

  // Colors based on CSS variables (hardcoded hex for canvas performance)
  const COLOR_LINE = "#2A2C27";
  const COLOR_MUTE = "#8B8E86";
  const COLOR_FLARE = "#FF5B2E";

  let mouseX = -1000;
  let mouseY = -1000;
  let isMouseIn = false;
  
  // Scanline state
  let scanlineX = -1000;
  let scanlineActive = false;
  let lastScanTime = 0;

  let animationFrameId = 0;
  let loopTimer = 0;
  let isVisible = true;
  let isLoopRunning = false;

  // Setup Observer to pause animation when offscreen
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
    if (isVisible && !isStaticField) {
      startLoop();
    } else {
      stopLoop();
    }
  });
  observer.observe(canvas.parentElement!);

  function resize() {
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    width = parent.clientWidth;
    height = parent.clientHeight;
    
    // Handle device pixel ratio for crisp rendering (limit to 2 per PRD)
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx?.scale(dpr, dpr);
    
    createPoints();
    if (isStaticField) {
      draw(); // Draw once
    }
  }

  function createPoints() {
    points = [];
    const cols = Math.floor(width / SPACING) + 1;
    const rows = Math.floor(height / SPACING) + 1;
    
    // Limit to 6000 points per PRD
    if (cols * rows > 6000) return; 

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        points.push(new Point(i * SPACING, j * SPACING));
      }
    }
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, RADIUS, 0, Math.PI * 2);
      
      if (p.intensity > 0) {
        // Blend flare based on intensity
        ctx.fillStyle = COLOR_FLARE;
        ctx.globalAlpha = p.intensity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      } else if (p.active) {
        ctx.fillStyle = COLOR_MUTE;
        ctx.fill();
      } else {
        ctx.fillStyle = COLOR_LINE;
        ctx.fill();
      }
    }
  }

  function loop(time: number) {
    if (!isVisible || isStaticField) return;

    // Scanline logic (Every 7 seconds, scan takes 900ms)
    if (time - lastScanTime > 7000) {
      scanlineActive = true;
      lastScanTime = time;
    }

    if (scanlineActive) {
      const scanProgress = (time - lastScanTime) / 900;
      if (scanProgress > 1) {
        scanlineActive = false;
        scanlineX = -1000;
      } else {
        scanlineX = scanProgress * width;
      }
    }

    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      
      // Hover physics
      if (isMouseIn) {
        const dx = mouseX - p.baseX;
        const dy = mouseY - p.baseY;
        const distSq = dx * dx + dy * dy;
        const radiusSq = HOVER_RADIUS * HOVER_RADIUS;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          const safeDist = Math.max(dist, 0.001);
          const force = (HOVER_RADIUS - dist) / HOVER_RADIUS;
          
          p.targetX = p.baseX - (dx / safeDist) * force * HOVER_FORCE;
          p.targetY = p.baseY - (dy / safeDist) * force * HOVER_FORCE;
          p.active = true;
        } else {
          p.targetX = p.baseX;
          p.targetY = p.baseY;
          p.active = false;
        }
      } else {
        p.targetX = p.baseX;
        p.targetY = p.baseY;
        p.active = false;
      }

      // Lerp position
      p.x += (p.targetX - p.x) * LERP_SPEED;
      p.y += (p.targetY - p.y) * LERP_SPEED;

      // Scanline logic
      if (scanlineActive) {
        // If scanline passes this point
        if (Math.abs(p.baseX - scanlineX) < SPACING) {
          p.intensity = 1.0;
        }
      }
      
      // Fade out intensity
      if (p.intensity > 0) {
        // Fade out over roughly 400ms at 60fps (~0.04 per frame)
        p.intensity -= 0.04;
        if (p.intensity < 0) p.intensity = 0;
      }
    }

    draw();

    // 30 FPS cap per PRD
    loopTimer = window.setTimeout(() => {
      animationFrameId = requestAnimationFrame(loop);
    }, 1000 / 30);
  }

  function startLoop() {
    if (isLoopRunning || isStaticField || !isVisible) return;
    isLoopRunning = true;
    lastScanTime = performance.now();
    animationFrameId = requestAnimationFrame(loop);
  }

  function stopLoop() {
    isLoopRunning = false;
    cancelAnimationFrame(animationFrameId);
    window.clearTimeout(loopTimer);
  }

  // Event Listeners
  window.addEventListener("resize", resize);
  
  if (!isStaticField) {
    canvas.parentElement?.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isMouseIn = true;
    });

    canvas.parentElement?.addEventListener("mouseleave", () => {
      isMouseIn = false;
    });
    
    // Stop on tab hide
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        isVisible = false;
        stopLoop();
      } else {
        isVisible = true;
        startLoop();
      }
    });
  }

  // Init
  resize();
  if (!isStaticField) {
    startLoop();
  }
}

// Ensure it runs after DOM is ready
document.addEventListener("DOMContentLoaded", initField);
