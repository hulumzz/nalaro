/** Native scroll, one event-driven frame, cached geometry and no full-page filters. */
export function initFoldScroll() {
  const main = document.querySelector<HTMLElement>(".book-scroll");
  if (!main) return;
  const header = document.querySelector<HTMLElement>(".site-header")!;
  const headerInner = header.querySelector<HTMLElement>(".header-inner")!;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const pages = Array.from(main.querySelectorAll<HTMLElement>("[data-fold-page]")).map(page => ({
    page,
    sheet: page.querySelector<HTMLElement>(".fold-sheet")!,
    shade: page.querySelector<HTMLElement>(".fold-shade")!,
    section: page.querySelector<HTMLElement>("section[id]")!,
    top: 0, height: 0, progress: -1, covered: false,
  }));
  const nav = Array.from(document.querySelectorAll<HTMLAnchorElement>(".desktop-nav a, .mobile-nav a"));
  let viewport = innerHeight;
  let headerHeight = 85;
  let frame = 0;
  let needsMeasure = true;
  let activeId = "";

  function measure() {
    headerHeight = headerInner.offsetHeight + parseFloat(getComputedStyle(header).paddingTop) + 1;
    main!.style.setProperty("--fold-header", `${headerHeight}px`);
    viewport = document.documentElement.clientHeight;
    let top = main!.getBoundingClientRect().top + scrollY;
    // Sticky bounding boxes move. Sum normal flow heights to keep navigation stable.
    const heights = pages.map(({ page }) => page.offsetHeight);
    pages.forEach((entry, index) => {
      entry.top = top;
      entry.height = heights[index];
      top += entry.height;
      // Pin tall pages at their bottom, after all their content has scrolled past.
      entry.page.style.setProperty("--fold-top", `${Math.min(headerHeight, viewport - entry.height)}px`);
      entry.sheet.style.transformOrigin = `50% ${Math.max(0, entry.height - viewport + headerHeight)}px`;
    });
    needsMeasure = false;
  }

  function render() {
    frame = 0;
    if (document.hidden) return;
    if (needsMeasure) measure();
    const y = scrollY;
    let active = pages[0];
    pages.forEach((entry, index) => {
      const next = pages[index + 1];
      const raw = next ? Math.min(1, Math.max(0, (y + viewport - next.top) / (viewport - headerHeight))) : 0;
      const progress = reduced.matches ? 0 : raw * raw * (3 - 2 * raw);
      if (Math.abs(progress - entry.progress) > 0.0001) {
        entry.progress = progress;
        entry.sheet.style.transform = progress === 0 ? "" : `perspective(1800px) translate3d(0,${-8 * progress}px,0) rotateX(${3 * progress}deg) scale(${1 - 0.035 * progress})`;
        entry.shade.style.opacity = `${progress * 0.64}`;
        entry.page.classList.toggle("is-folding", progress > 0 && progress < 1);
        const covered = progress >= 1;
        if (entry.covered !== covered) {
          entry.covered = covered;
          entry.page.classList.toggle("fold-covered", covered);
          document.dispatchEvent(new Event("foldvisibilitychange"));
        }
      }
      if (entry.top <= y + headerHeight + (viewport - headerHeight) * 0.42) active = entry;
    });
    if (active && activeId !== active.section.id) {
      activeId = active.section.id;
      nav.forEach(link => {
        if (link.hash === `#${activeId}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
  }

  function schedule(measureAgain = false) {
    needsMeasure ||= measureAgain;
    if (!frame && !document.hidden) frame = requestAnimationFrame(render);
  }

  // Layout offsets inside a sheet are unaffected by the current 3D transform.
  function offsetWithin(element: HTMLElement, page: HTMLElement) {
    let offset = 0;
    let node: HTMLElement | null = element;
    while (node && node !== page) { offset += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
    return offset;
  }

  function positionFor(target: HTMLElement, entry: typeof pages[number]) {
    const content = target === entry.section
      ? target.querySelector<HTMLElement>(".eyebrow, .section-heading, .solutions-intro") || target
      : target;
    const offset = offsetWithin(content, entry.page);
    // Short pages pin below the header before their centered content can reach 32px.
    // Stop at the pin position so navigation never lands in the next fold.
    const within = reduced.matches ? offset - 32 : Math.min(offset - 32, Math.max(0, entry.height - viewport + headerHeight));
    return Math.max(0, entry.top + within - headerHeight);
  }

  document.addEventListener("click", event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
    if (!link || link.target || link.hasAttribute("download")) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    const entry = pages.find(({ page }) => target && page.contains(target));
    if (!entry || !target) return;
    event.preventDefault();
    measure();
    target.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("revealed"));
    if (url.hash !== location.hash) history.pushState(null, "", url.hash);
    window.scrollTo({ top: positionFor(target, entry), behavior: reduced.matches ? "instant" : "smooth" });
  });

  // Reveal a covered sticky page when keyboard focus returns to one of its controls.
  document.addEventListener("focusin", event => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const entry = pages.find(({ page }) => page.contains(target));
    if (!entry || entry.progress <= 0) return;
    measure();
    window.scrollTo({ top: positionFor(target, entry), behavior: "instant" });
    render();
  });

  function restoreHash() {
    if (!location.hash) return;
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    const entry = pages.find(({ page }) => target && page.contains(target));
    if (!entry || !target) return;
    measure();
    window.scrollTo({ top: positionFor(target, entry), behavior: "instant" });
    render();
  }

  main.classList.add("is-fold-ready");
  const resize = new ResizeObserver(() => schedule(true));
  pages.forEach(({ sheet }) => resize.observe(sheet));
  resize.observe(headerInner);
  addEventListener("scroll", () => schedule(), { passive: true });
  addEventListener("resize", () => schedule(true), { passive: true });
  addEventListener("hashchange", restoreHash);
  addEventListener("pageshow", () => schedule(true));
  document.addEventListener("visibilitychange", () => schedule(true));
  reduced.addEventListener("change", () => {
    pages.forEach(entry => { entry.progress = -1; });
    schedule(true);
  });
  document.fonts.ready.then(() => { schedule(true); restoreHash(); });
  schedule(true);
}
