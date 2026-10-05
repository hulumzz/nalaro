// Registry Preview Logic (Desain.md §10.1 & §10.2)

function initMobileRegistry() {
  const toggles = document.querySelectorAll<HTMLButtonElement>("[data-mobile-product-toggle]");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const panelId = toggle.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;

      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      panel.classList.toggle("hidden", isOpen);
      panel.classList.toggle("flex", !isOpen);

      const arrow = toggle.querySelector<HTMLElement>(".registry-mobile-arrow");
      if (arrow) {
        arrow.style.transform = isOpen ? "" : "rotate(180deg)";
      }
    });
  });
}

function initRegistry() {
  initMobileRegistry();

  const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
  if (!isDesktop) return;

  const container = document.querySelector('.registry-container');
  const preview = document.getElementById('registry-preview');
  const previewContent = preview?.querySelector('.preview-content');
  const rows = document.querySelectorAll('.registry-row:not([data-product=""])');
  
  if (!container || !preview || !previewContent) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let currentProduct = "";
  let mouseX = 0;
  let mouseY = 0;
  let previewX = 0;
  let previewY = 0;
  let isVisible = false;
  let rafId: number;

  function updatePreviewPosition() {
    if (!isVisible) return;
    
    if (prefersReducedMotion) {
      // Static position (right side of the row) handled by CSS, just show it
      preview!.style.transform = `translate(0, 0)`;
      return;
    }

    // Lerp position .15 per PRD
    previewX += (mouseX - previewX) * 0.15;
    previewY += (mouseY - previewY) * 0.15;
    
    // Clamp to viewport
    const pw = 300;
    const ph = 200;
    const padding = 24;
    
    const x = Math.min(Math.max(previewX + padding, padding), window.innerWidth - pw - padding);
    const y = Math.min(Math.max(previewY + padding, padding), window.innerHeight - ph - padding);
    
    preview!.style.transform = `translate(${x}px, ${y}px)`;
    
    rafId = requestAnimationFrame(updatePreviewPosition);
  }

  function showPreview(productCode: string, e: MouseEvent | FocusEvent) {
    if (productCode === currentProduct && isVisible) return;
    
    const template = document.querySelector(`.${productCode}-template`);
    if (!template) return;

    // Clone SVG to preview content
    previewContent!.innerHTML = '';
    previewContent!.appendChild(template.cloneNode(true));
    
    currentProduct = productCode;
    isVisible = true;
    preview!.style.opacity = '1';
    
    if (!prefersReducedMotion && e instanceof MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Snap to initial position without lerp on first show
      previewX = mouseX;
      previewY = mouseY;
      cancelAnimationFrame(rafId);
      updatePreviewPosition();
    }
  }

  function hidePreview() {
    isVisible = false;
    preview!.style.opacity = '0';
    cancelAnimationFrame(rafId);
  }

  // Event Listeners
  rows.forEach(row => {
    const code = row.getAttribute('data-product');
    if (!code) return;

    row.addEventListener('mouseenter', (e) => showPreview(code, e as MouseEvent));
    row.addEventListener('focus', (e) => showPreview(code, e as FocusEvent));
    
    if (!prefersReducedMotion) {
      row.addEventListener('mousemove', (e) => {
        const me = e as MouseEvent;
        mouseX = me.clientX;
        mouseY = me.clientY;
      });
    }
  });

  container.addEventListener('mouseleave', hidePreview);
  container.addEventListener('focusout', (e) => {
    // Hide if focus moved outside container
    if (!container.contains((e as FocusEvent).relatedTarget as Node)) {
      hidePreview();
    }
  });
}

document.addEventListener("DOMContentLoaded", initRegistry);
