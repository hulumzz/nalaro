import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

// Initialize Smooth Scrolling (Lenis) if not prefers-reduced-motion
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis: Lenis | null = null;

if (!prefersReducedMotion) {
  lenis = new Lenis({
    duration: 1.0,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
  });

  // Use GSAP's ticker as the single animation clock.
  // Running Lenis from two RAF loops caused uneven scroll and duplicate work.
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });
  
  gsap.ticker.lagSmoothing(0);
}

// Ensure GSAP works correctly with Astro view transitions if added later
document.addEventListener("DOMContentLoaded", initMotion);

function initMotion() {
  if (prefersReducedMotion) return; // Fallback to static CSS

  // 1. Initial Page Load Sequence (Desain.md §13.2)
  const tl = gsap.timeline();

  // 0ms: Hairline Rail and top strip
  tl.fromTo(
    ".rail",
    { scaleY: 0, transformOrigin: "top" },
    { scaleY: 1, duration: 0.48, ease: "power3.out" }
  , 0);
  tl.fromTo(
    "header",
    { scaleX: 0, transformOrigin: "left" },
    { scaleX: 1, duration: 0.48, ease: "power3.out" }
  , 0);

  // 120ms: Headline reveal
  tl.fromTo(
    ".reveal-text",
    { y: "100%" },
    { y: "0%", duration: 0.6, ease: "power3.out", stagger: 0.09 }
  , 0.12);

  // Font-stretch animation for headline (handled via class addition for cleaner transition)
  setTimeout(() => {
    document.querySelectorAll('.reveal-text').forEach(el => {
      el.parentElement?.classList.add('font-stretch-ready');
    });
  }, 120 + (600)); // After reveal

  // 500ms: Diagram path reveal (handled in field.ts)
  
  // 700ms: Ticker scramble (handled in separate logic if needed, but static text for now)
  
  // 800ms: Gate Row reveal
  tl.fromTo(
    "#index .gate",
    { y: 16, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.1 }
  , 0.8);

  // Hero fade-ins
  tl.fromTo(
    ".reveal-fade",
    { opacity: 0 },
    { opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 }
  , 0.8);


  // 2. Scroll Animations (Desain.md §13.3)
  
  // Reveal h2
  gsap.utils.toArray(".t-h2").forEach((el: any) => {
    if (el.closest('#index')) return; // Skip hero headline
    
    // Wrap text in a span for clip-path reveal if not already wrapped
    if (!el.querySelector('.reveal-inner')) {
      const text = el.innerHTML;
      el.innerHTML = `<span class="reveal-inner inline-block" style="clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%); transition: clip-path 0.6s cubic-bezier(0.16, 1, 0.3, 1);">${text}</span>`;
    }
    
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        const inner = el.querySelector('.reveal-inner');
        if (inner) inner.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      },
      once: true
    });
  });

  // Reveal connector lines in Solutions
  gsap.utils.toArray(".reveal-line").forEach((el: any) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        gsap.to(el, { scaleX: 1, duration: 0.6, ease: "power3.out" });
      },
      once: true
    });
  });

  // 3. Dock Progress & Section Tracking
  const sections = document.querySelectorAll("section[data-section]");
  const dockPct = document.getElementById("dock-pct");
  const dockTick = document.getElementById("dock-tick");
  const railActiveName = document.getElementById("rail-active-name");
  const dockSectionCount = document.getElementById("dock-section-count");
  const dockSectionName = document.getElementById("dock-section-name");
  
  // Track scroll percentage
  ScrollTrigger.create({
    trigger: document.body,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => {
      const pct = Math.round(self.progress * 100);
      if (dockPct) dockPct.textContent = `${pct}%`;
      if (dockTick) dockTick.style.left = `${self.progress * 100}%`;
    }
  });

  // Track active section for Rail and Dock
  sections.forEach((section: any) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => updateActiveSection(section),
      onEnterBack: () => updateActiveSection(section)
    });
  });

  function updateActiveSection(section: HTMLElement) {
    const sectionId = section.id;
    
    // Update Rail Name
    const nameEl = section.querySelector('.t-h2, .t-hero');
    let name = sectionId.toUpperCase();
    if (nameEl) {
       name = nameEl.textContent?.trim().toUpperCase() || name;
       if(sectionId === 'index') name = 'INDEX'; // Specific override
    }
    if (railActiveName) railActiveName.textContent = name;

    const sectionIndex = Array.from(sections).indexOf(section);
    if (sectionIndex >= 0) {
      if (dockSectionCount) {
        dockSectionCount.textContent = `${String(sectionIndex).padStart(2, "0")} / 06`;
      }
      if (dockSectionName) {
        dockSectionName.textContent = ` — ${sectionId.toUpperCase()}`;
      }
    }

    // Update Rail indicators
    document.querySelectorAll('.rail-nav-item').forEach(item => {
      item.classList.remove('is-active');
      if (item.getAttribute('data-target') === sectionId) {
        item.classList.add('is-active');
      }
    });

    // Handle Contact section specific behavior
    if (sectionId === 'contact') {
      document.body.classList.add('contact-active');
      
      // Keep the contact transition restrained: one panel movement,
      // rather than animating every nested flex column independently.
      gsap.fromTo(
        "#contact-form",
        { y: 12, opacity: 0.75 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", overwrite: true }
      );
    } else {
      document.body.classList.remove('contact-active');
    }
  }

  // Initial call
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);
}
