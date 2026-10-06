import { buildEvents, buildScenarios } from "../data/home";

const root = document.querySelector<HTMLElement>("[data-build-terminal]")!;
const buttons = [...root.querySelectorAll<HTMLButtonElement>("[data-scenario]")];
const rows = [...root.querySelectorAll<HTMLElement>("[data-event]")].map(element => ({
  element,
  marker: element.querySelector<HTMLElement>(".event-marker")!,
  tag: element.querySelector<HTMLElement>(".event-tag")!,
  text: element.querySelector<HTMLElement>(".event-message")!,
}));
const client = root.querySelector<HTMLElement>("[data-client]")!;
const reply = root.querySelector<HTMLElement>("[data-reply]")!;
const progress = root.querySelector<HTMLElement>("[role=progressbar]")!;
const bar = progress.firstElementChild as HTMLElement;
const status = root.querySelector<HTMLElement>("[data-build-status]")!;
const count = root.querySelector<HTMLElement>("[data-event-count]")!;
const message = root.querySelector<HTMLElement>("[data-terminal-message]")!;
const pause = root.querySelector<HTMLButtonElement>("[data-pause]")!;
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const idleDuration = 4500;
const characterDuration = 18;
let selection = 0, elapsed = 0, finishAt = 0;
let visible = false, paused = false;
let timer: ReturnType<typeof setInterval> | undefined;
let schedule: { tag: string; text: string; start: number; messageStart: number; finish: number }[] = [];

function type(element: HTMLElement, text: string, duration: number, speed: number) {
  const length = Math.min(text.length, Math.max(0, Math.floor(duration / speed)));
  const typed = text.slice(0, length);
  if (element.firstElementChild!.textContent !== typed) element.firstElementChild!.textContent = typed;
  element.classList.toggle("is-typing", duration > 0 && length < text.length);
}

function render() {
  const scenario = buildScenarios[selection];
  const done = elapsed >= finishAt;
  type(client, scenario.client, done ? Infinity : elapsed - 200, 15);
  type(reply, scenario.reply, done ? Infinity : elapsed - 1850, 15);
  root.classList.toggle("reply-waiting", !done && elapsed < 1850);
  let finished = 0;
  rows.forEach((row, i) => {
    const event = schedule[i];
    const eventDone = elapsed >= event.finish;
    if (eventDone) finished++;
    row.element.classList.toggle("event-visible", elapsed >= event.start);
    row.element.classList.toggle("event-done", eventDone);
    row.marker.textContent = eventDone ? "✓" : "›";
    type(row.tag, event.tag, done ? Infinity : elapsed - event.start, 28);
    type(row.text, event.text, done ? Infinity : elapsed - event.messageStart, characterDuration);
  });
  count.textContent = `${finished} / ${rows.length}`;
  progress.setAttribute("aria-valuenow", String(finished));
  bar.style.transform = `scaleX(${finished / rows.length})`;
  status.textContent = paused ? "Dijeda" : done ? "Siap digunakan" : "Membangun";
  message.textContent = done ? "Build selesai" : elapsed < 3400 ? "Memahami kebutuhan" : "Menyiapkan produk";
  root.classList.toggle("is-complete", done);
  root.classList.toggle("is-paused", paused || !visible || document.hidden || reduced.matches);
}

function stop() { clearInterval(timer); timer = undefined; }

function resume() {
  stop();
  if (!visible || document.hidden || paused || reduced.matches) return;
  let previous = performance.now();
  timer = setInterval(() => {
    const now = performance.now();
    elapsed += now - previous;
    previous = now;
    if (elapsed >= finishAt + idleDuration) elapsed = 0;
    render();
  }, 40);
}

function start(index: number, announce = false) {
  stop();
  selection = index;
  paused = false;
  const scenario = buildScenarios[index];
  let next = 3400;
  schedule = buildEvents.map((event, i) => {
    const text = i === rows.length - 1 ? scenario.final : event.text;
    const start = next;
    const messageStart = start + event.tag.length * 28 + 80;
    const finish = messageStart + text.length * characterDuration;
    next = finish + 260;
    rows[i].text.dataset.fullText = text;
    return { tag: event.tag, text, start, messageStart, finish };
  });
  finishAt = next;
  elapsed = reduced.matches ? finishAt : 0;
  client.dataset.fullText = scenario.client;
  reply.dataset.fullText = scenario.reply;
  buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === index)));
  root.querySelector("[data-module]")!.textContent = scenario.module;
  root.querySelector("[data-endpoint]")!.textContent = scenario.endpoint;
  if (announce) root.querySelector("[data-build-announcement]")!.textContent = `Demo ${scenario.label}. ${scenario.client} ${scenario.reply}`;
  pause.textContent = "Jeda animasi";
  pause.hidden = reduced.matches;
  render();
  resume();
}

buttons.forEach((button, i) => button.addEventListener("click", () => start(i, true)));
pause.addEventListener("click", () => {
  paused = !paused;
  pause.textContent = paused ? "Lanjutkan animasi" : "Jeda animasi";
  render();
  resume();
});
new IntersectionObserver(([entry]) => {
  visible = entry.isIntersecting;
  render();
  resume();
}, { threshold: 0.12 }).observe(root);
document.addEventListener("visibilitychange", () => { render(); resume(); });
window.addEventListener("pagehide", stop);
window.addEventListener("pageshow", resume);
reduced.addEventListener("change", () => start(selection));
root.classList.add("is-enhanced");
start(0);
