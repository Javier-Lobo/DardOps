const BOARD_ORDER = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];
const CENTER = 230;

export function createDartboardMarkup() {
  const segments = BOARD_ORDER.map((value, index) => createNumberSegments(value, index)).join("");
  const labels = BOARD_ORDER.map((value, index) => createNumberLabel(value, index)).join("");
  return `
    <div class="board-wrap">
      <svg class="dartboard" viewBox="0 0 460 460" role="group" aria-label="Diana de dardos interactiva">
        <circle cx="${CENTER}" cy="${CENTER}" r="226" class="board-surround" />
        ${segments}
        ${createBullSegment(25, 1, "bull-outer", 28, "Bull 25")}
        ${createBullSegment(25, 2, "bull-inner", 12, "Doble bull 50")}
        ${labels}
      </svg>
      <button class="miss-button danger" data-dart="miss" type="button">FUERA · 0</button>
    </div>`;
}

function createNumberSegments(value, index) {
  const startAngle = index * 18 - 99;
  const endAngle = startAngle + 18;
  const isEven = index % 2 === 0;
  return [
    createSegment(value, 1, 28, 104, startAngle, endAngle, isEven ? "single-light" : "single-dark"),
    createSegment(value, 3, 104, 122, startAngle, endAngle, isEven ? "triple-red" : "triple-green"),
    createSegment(value, 1, 122, 170, startAngle, endAngle, isEven ? "single-light" : "single-dark"),
    createSegment(value, 2, 170, 190, startAngle, endAngle, isEven ? "double-red" : "double-green")
  ].join("");
}

function createSegment(value, multiplier, innerRadius, outerRadius, startAngle, endAngle, colorClass) {
  const label = formatDartLabel(value, multiplier);
  const points = value * multiplier;
  const path = createRingPath(innerRadius, outerRadius, startAngle, endAngle);
  return `<path class="dart-segment ${colorClass}" data-value="${value}" data-multiplier="${multiplier}"
    data-label="${label}" d="${path}" tabindex="0" role="button" aria-label="${label}, ${points} puntos" />`;
}

function createBullSegment(value, multiplier, colorClass, radius, label) {
  return `<circle class="dart-segment ${colorClass}" data-value="${value}" data-multiplier="${multiplier}"
    data-label="${label}" cx="${CENTER}" cy="${CENTER}" r="${radius}"
    tabindex="0" role="button" aria-label="${label}, ${value * multiplier} puntos" />`;
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

function formatDartLabel(value, multiplier) {
  if (multiplier === 3) {
    return `Triple ${value}`;
  }
  if (multiplier === 2) {
    return `Doble ${value}`;
  }
  return String(value);
}
