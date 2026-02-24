document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tl = document.querySelector(".tile-tl");
  const tr = document.querySelector(".tile-tr");
  const bl = document.querySelector(".tile-bl");
  const br = document.querySelector(".tile-br");
  const center = document.querySelector(".tile-center");

  if (prefersReducedMotion) {
    tl?.classList.add("in");
    tr?.classList.add("in");
    bl?.classList.add("in");
    br?.classList.add("in");
    center?.classList.add("show");
    return;
  }

  const steps = [
    () => tl?.classList.add("in"),
    () => tr?.classList.add("in"),
    () => bl?.classList.add("in"),
    () => br?.classList.add("in"),
    () => center?.classList.add("show")
  ];

  let i = 0;

  const run = () => {
    if (i >= steps.length) return;
    steps[i]();
    i += 1;
    setTimeout(run, 420);
  };

  run();
});
