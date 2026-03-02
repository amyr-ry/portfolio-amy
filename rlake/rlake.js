document.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".thumb-banner");
  const track = document.getElementById("thumbTrack");
  const img = document.getElementById("thumbStrip");
  if (!banner || !track || !img) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    banner.style.overflowX = "auto";
    banner.style.scrollBehavior = "smooth";
    return;
  }

  const clone = img.cloneNode(true);
  clone.alt = "";
  clone.setAttribute("aria-hidden", "true");
  track.appendChild(clone);

  let x = 0;
  let w = 0;
  const speed = 0.6;

  const measure = () => {
    w = img.getBoundingClientRect().width;
  };

  const tick = () => {
    if (!w) measure();
    x += speed;
    if (x >= w) x = 0;
    track.style.transform = `translateX(${-x}px)`;
    requestAnimationFrame(tick);
  };

  const start = () => {
    measure();
    requestAnimationFrame(tick);
  };

  if (img.complete) start();
  else img.addEventListener("load", start, { once: true });

  window.addEventListener("resize", measure);
});