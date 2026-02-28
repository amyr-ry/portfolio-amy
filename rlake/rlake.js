document.addEventListener("DOMContentLoaded", () => {
  const banner = document.querySelector(".thumb-banner");
  const track = document.getElementById("thumbTrack");
  const img = document.getElementById("thumbStrip");

  if (!banner || !track || !img) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    banner.style.overflowX = "auto";
    banner.style.scrollBehavior = "smooth";
    return;
  }

  const clone = img.cloneNode(true);
  clone.alt = "";
  clone.setAttribute("aria-hidden", "true");
  track.appendChild(clone);

  const speed = 0.6;
  let x = 0;
  let w = 0;

  const measure = () => {
    w = img.getBoundingClientRect().width;
  };

  const animate = () => {
    if (!w) measure();
    x += speed;
    if (x >= w) x = 0;
    track.style.transform = `translateX(${-x}px)`;
    requestAnimationFrame(animate);
  };

  if (img.complete) {
    measure();
    requestAnimationFrame(animate);
  } else {
    img.addEventListener("load", () => {
      measure();
      requestAnimationFrame(animate);
    }, { once: true });
  }

  window.addEventListener("resize", () => {
    measure();
  });
});