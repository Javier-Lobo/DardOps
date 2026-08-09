const BOARD_ORDER = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
const CENTER = 230;

export function createDartboardMarkup(language = "es") {
  const segments = BOARD_ORDER.map((value, index) => createNumberSegments(value, index, language)).join("");
  const labels = BOARD_ORDER.map((value, index) => createNumberLabel(value, index)).join("");
  return `
    <div class="board-wrap">
      <svg class="dartboard" viewBox="0 0 460 460" role="group" aria-label="${translate(language, "dartboardLabel")}">
        <circle cx="${CENTER}" cy="${CENTER}" r="226" class="board-surround" />
        ${segments}
        ${createBullSegment(25, 1, "bull-outer", 28, language)}
        ${createBullSegment(25, 2, "bull-inner", 12, language)}
        ${labels}
      </svg>
      <button class="miss-button danger" data-dart="miss" type="button">${translate(language, "outsideButton")}</button>
    </div>`;
}

function createNumberSegments(value, index, language) {
  const startAngle = index * 18 - 99;
  const endAngle = startAngle + 18;
  const isEven = index % 2 === 0;
  return [
    createSegment(value, 1, 28, 104, startAngle, endAngle, isEven ? "single-light" : "single-dark", language),
    createSegment(value, 3, 104, 122, startAngle, endAngle, isEven ? "triple-red" : "triple-green", language),
    createSegment(value, 1, 122, 170, startAngle, endAngle, isEven ? "single-light" : "single-dark", language),
    createSegment(value, 2, 170, 190, startAngle, endAngle, isEven ? "double-red" : "double-green", language)
  ].join("");
}

function createSegment(value, multiplier, innerRadius, outerRadius, startAngle, endAngle, colorClass, language) {
  const label = formatDartLabel({ value, multiplier }, language);
  const points = value * multiplier;
  const path = createRingPath(innerRadius, outerRadius, startAngle, endAngle);
  return `<path class="dart-segment ${colorClass}" data-value="${value}" data-multiplier="${multiplier}"
    data-label="${label}" d="${path}" tabindex="0" role="button" aria-label="${label}, ${translate(language, "points", { points })}" />`;
}

function createBullSegment(value, multiplier, colorClass, radius, language) {
  const label = formatDartLabel({ value, multiplier }, language);
  return `<circle class="dart-segment ${colorClass}" data-value="${value}" data-multiplier="${multiplier}"
    data-label="${label}" cx="${CENTER}" cy="${CENTER}" r="${radius}"
    tabindex="0" role="button" aria-label="${label}, ${translate(language, "points", { points: value * multiplier })}" />`;
}

function createRingPath(innerRadius, outerRadius, startAngle, endAngle) {
  const outerStart = polarPoint(outerRadius, startAngle);
  const outerEnd = polarPoint(outerRadius, endAngle);
  const innerEnd = polarPoint(innerRadius, endAngle);
  const innerStart = polarPoint(innerRadius, startAngle);
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerRadius} ${outerRadius} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerRadius} ${innerRadius} 0 0 0 ${innerStart.x} ${innerStart.y}`,
    "Z"
  ].join(" ");
}

function createNumberLabel(value, index) {
  const point = polarPoint(208, index * 18 - 90);
  return `<text x="${point.x}" y="${point.y}" class="board-number">${value}</text>`;
}

function polarPoint(radius, angle) {
  const radians = angle * Math.PI / 180;
  return {
    x: (CENTER + radius * Math.cos(radians)).toFixed(2),
    y: (CENTER + radius * Math.sin(radians)).toFixed(2)
  };
}

import { formatDartLabel, translate } from "./i18n.js";
