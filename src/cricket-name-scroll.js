export function getCricketNameOffset(contentWidth, viewportWidth) {
  return Math.min(0, viewportWidth - contentWidth);
}

export function updateCricketNameScroll(root = document) {
  const viewports = root.querySelectorAll("[data-cricket-player-name]");
  viewports.forEach((viewport) => updateCricketNameViewport(viewport));
}

function updateCricketNameViewport(viewport) {
  const track = viewport.querySelector(".cricket-player-name-track");
  const offset = getCricketNameOffset(track.scrollWidth, viewport.clientWidth);
  viewport.classList.toggle("is-overflowing", offset < 0);
  track.style.setProperty("--cricket-name-offset", `${offset}px`);
}
