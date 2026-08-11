import dardOpsLogo from "./assets/dardops.png";
import authorPortrait from "./assets/javierlobo.png";
import { getAboutContent } from "./about-content.js";
import { icon } from "./icons.js";

export function renderAbout(language) {
  const content = getAboutContent(language);
  return `<section class="about-shell">
    <button class="about-back text-button" data-action="close-about">${icon("back")} ${content.back}</button>
    ${renderHero(content)}
    ${renderStory(content)}
    ${renderPillars(content)}
    ${renderTechnologies(content)}
  </section>`;
}

function renderHero(content) {
  return `<article class="about-hero panel slide-in">
    <div class="about-logo-frame"><img src="${dardOpsLogo}" alt="${content.logoAlt}"></div>
    <div><span class="eyebrow">${content.kicker}</span><h1>${content.title}</h1><p>${content.intro}</p></div>
  </article>`;
}

function renderStory(content) {
  return `<div class="about-story-grid">
    <article class="about-author panel slide-in" style="--delay:70ms">
      <div class="about-author-frame"><img src="${authorPortrait}" alt="${content.authorAlt}"></div>
      <div><h2>${content.authorTitle}</h2><p>${content.authorCopy}</p><p>${content.authorNote}</p></div>
    </article>
    <article class="about-card panel slide-in" style="--delay:120ms">
      <span class="about-card-icon">${icon("sparkles")}</span><h2>${content.identityTitle}</h2><p>${content.identityCopy}</p>
    </article>
  </div>`;
}

function renderPillars(content) {
  const cards = content.pillars.map((pillar, index) => `<article class="about-card panel slide-in" style="--delay:${170 + index * 50}ms">
    <span class="about-card-icon">${icon(pillar.icon)}</span><h2>${pillar.title}</h2><p>${pillar.copy}</p>
  </article>`).join("");
  return `<div class="about-pillars">${cards}</div>`;
}

function renderTechnologies(content) {
  const technologies = content.technologies.map((technology) => `<div class="about-tech-item">
    <strong>${technology.name}</strong><span>${technology.copy}</span>
  </div>`).join("");
  return `<section class="about-stack panel slide-in" style="--delay:340ms">
    <h2>${content.stackTitle}</h2><div class="about-tech-grid">${technologies}</div>
  </section>`;
}
