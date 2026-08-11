import "acs-audio";
import "./styles.css";
import { renderAbout } from "./about.js";
import { getAboutContent } from "./about-content.js";
import { getCricketBeamView, isActiveCricketColumn, renderCricketBeam } from "./cricket-beam.js";
import { updateCricketNameScroll } from "./cricket-name-scroll.js";
import { createDartboardMarkup } from "./dartboard.js";
import { isMissAreaClick } from "./dart-input.js";
import { getCricketMarkView } from "./cricket-marks.js";
import { GAME_CONFIGS, GAME_ORDER, CRICKET_TARGETS } from "./game-config.js";
import { createGame, getGameStatus, getTurnAwardedTotal, getTurnStatus, getTurnTotal, getWinner, throwDart, undoDart } from "./game-engine.js";
import { getInsult } from "./insults.js";
import { renderHeaderBrand } from "./header-brand.js";
import { icon } from "./icons.js";
import { formatDartLabel, getGameText, getNextLanguage, translate } from "./i18n.js";
import { cancelSpeech, speakDart, speakPlayerTurn, speakTurn, speakWinner } from "./speech.js";
import { clearGame, loadGame, loadPreferences, saveGame, savePreference } from "./preferences.js";
import { getRestartModalView } from "./restart-modal.js";
import { configureSound, playSound } from "./sound.js";
import { hasCompletedTurn } from "./turn-events.js";
import { getWinnerInsult } from "./winner-insults.js";
import { getNextVoiceMode, getVoiceModeView, VOICE_MODES } from "./voice-modes.js";

const root = document.querySelector("#app");
const state = {
  screen: "players",
  playerCount: 2,
  playerNames: ["", ""],
  game: loadGame(),
  preferences: loadPreferences(),
  toast: null,
  lastInsult: "",
  winnerInsult: "",
  restartModalOpen: false,
  aboutReturnScreen: "players"
};

if (state.game) {
  state.screen = "game";
}

applyTheme();
render();
bindGlobalEvents();
window.setTimeout(() => configureSound(state.preferences.sound), 100);

function render() {
  root.innerHTML = `${renderHeader()}<main>${renderScreen()}</main>${renderFooter()}${renderRestartModal()}${renderToast()}`;
  bindScreenEvents();
}

function renderHeader() {
  const themeIcon = state.preferences.theme === "dark" ? "sun" : "moon";
  const voiceView = getVoiceModeView(state.preferences.voiceMode, state.preferences.language);
  const aboutContent = getAboutContent(state.preferences.language);
  return `<header class="app-header">
    <button class="brand" data-action="home" aria-label="${text("newGameLabel")}">
      ${renderHeaderBrand()}
      <span><strong>Dard<span>Ops</span></strong><small>${text("brandTagline")}</small></span>
    </button>
    <div class="header-actions">
      <button class="icon-button voice-mode-button" data-action="voice" data-voice-mode="${state.preferences.voiceMode}"
        aria-label="${voiceView.label}. ${text("voiceChange")}" title="${voiceView.label}">
        ${icon(voiceView.icon)}<span class="voice-mode-badge" aria-hidden="true">${voiceView.badge}</span>
      </button>
      <button class="icon-button" data-action="sound" aria-pressed="${state.preferences.sound}" title="${text("soundToggle")}">${icon(state.preferences.sound ? "volume" : "muted")}</button>
      <button class="icon-button" data-action="theme" title="${text("themeToggle")}">${icon(themeIcon)}</button>
      <button class="icon-button language-button" data-action="language" title="${text("languageToggle")}">${state.preferences.language.toUpperCase()}</button>
      <button class="icon-button about-button" data-action="about" aria-label="${aboutContent.title}" aria-pressed="${state.screen === "about"}" title="${aboutContent.title}">${icon("info")}</button>
    </div>
  </header>`;
}

function renderScreen() {
  if (state.screen === "about") {
    return renderAbout(state.preferences.language);
  }
  if (state.screen === "players") {
    return renderPlayerSetup();
  }
  if (state.screen === "games") {
    return renderGameSetup();
  }
  return renderGame();
}

function renderPlayerSetup() {
  const inputs = Array.from({ length: state.playerCount }, (_, index) => `
    <label class="player-field">
      <span>${text("player", { number: index + 1 })}</span>
      <input data-player-index="${index}" maxlength="24" autocomplete="off"
        value="${escapeHtml(state.playerNames[index] ?? "")}" placeholder="${text("victimPlaceholder", { number: index + 1 })}" />
    </label>`).join("");
  return `<section class="setup-shell bounce-in-top">
    ${renderStepHeader(1, text("setupPlayersTitle"), text("setupPlayersSubtitle"))}
    <div class="panel setup-panel">
      <label class="count-field"><span>${text("playerCount")}</span>
        <select data-player-count>${renderCountOptions()}</select>
      </label>
      <div class="player-grid">${inputs}</div>
      <button class="primary wide" data-action="choose-game">${text("chooseGame")} <span>→</span></button>
    </div>
  </section>`;
}

function renderCountOptions() {
  return Array.from({ length: 8 }, (_, index) => index + 1)
    .map((count) => `<option value="${count}" ${count === state.playerCount ? "selected" : ""}>${count}</option>`)
    .join("");
}

function renderGameSetup() {
  const cards = GAME_ORDER.map((gameId, index) => {
    const game = GAME_CONFIGS[gameId];
    const gameText = getGameText(gameId, state.preferences.language);
    return `<button class="game-card slide-in" style="--delay:${index * 65}ms" data-game-id="${game.id}">
      <span class="game-index">0${index + 1}</span><strong>${gameText.name}</strong><p>${gameText.description}</p><span class="select-label">${text("select")} →</span>
    </button>`;
  }).join("");
  return `<section class="game-picker">
    ${renderStepHeader(2, text("gameSetupTitle"), `${state.playerNames.filter(Boolean).map(escapeHtml).join(" · ")}`)}
    <div class="game-grid">${cards}</div>
    <button class="text-button" data-action="back-players">← ${text("backPlayers")}</button>
  </section>`;
}

function renderStepHeader(step, title, subtitle) {
  return `<div class="eyebrow">${text("setupStep", { step })}</div><h1>${title}</h1><p class="lede">${subtitle}</p>`;
}

function renderGame() {
  const game = state.game;
  const winner = getWinner(game);
  return `<section class="game-layout">
    <aside class="score-panel panel">${renderScorePanel(game)}</aside>
    <div class="board-panel panel" data-miss-area>
      <div class="board-heading">
        <div class="turn-heading"><span>${text("turnOf")}</span><strong>${escapeHtml(game.players[game.currentPlayer].name)}</strong></div>
      </div>
      ${createDartboardMarkup(state.preferences.language)}
      ${renderCurrentDarts(game)}
    </div>
    <aside class="intel-panel panel">${renderGameIntel(game)}</aside>
    ${winner && !state.restartModalOpen ? renderWinner(winner, state.winnerInsult) : ""}
  </section>`;
}

function renderScorePanel(game) {
  const players = game.players.map((player, index) => {
    const active = index === game.currentPlayer && !game.winnerId;
    return `<article class="score-row ${active ? "active" : ""}">
      <span class="player-position">${String(index + 1).padStart(2, "0")}</span>
      <div><strong>${escapeHtml(player.name)}</strong><small>${renderPlayerMeta(game, player)}</small></div>
      <b>${renderPrimaryScore(game, player)}</b>
    </article>`;
  }).join("");
  return `<div class="panel-title"><span>${text("scoreboard")}</span><em>${getGameText(game.gameId, state.preferences.language).name}</em></div>${players}
    <div class="score-actions">
      <button data-action="undo" ${game.history.length === 0 ? "disabled" : ""}>${icon("undo")} ${text("undo")}</button>
      <button class="danger" data-action="restart">${icon("reset")} ${text("newGame")}</button>
    </div>`;
}

function renderPrimaryScore(game, player) {
  const kind = GAME_CONFIGS[game.gameId].kind;
  if (kind === "clock") {
    return player.clockTarget === 25 ? "BULL" : player.clockTarget;
  }
  return player.score;
}

function renderPlayerMeta(game, player) {
  const kind = GAME_CONFIGS[game.gameId].kind;
  if (kind === "cricket") {
    const closed = CRICKET_TARGETS.filter((target) => player.cricket[target] === 3).length;
    return text("closed", { count: closed });
  }
  if (kind === "clock") {
    return text("currentTarget");
  }
  return text("turns", { count: player.turnsPlayed });
}

function renderCurrentDarts(game) {
  const darts = [0, 1, 2].map((index) => {
    const dart = game.darts[index];
    return `<div class="dart-slot ${dart ? "filled" : ""}"><span>D${index + 1}</span><strong>${dart ? formatDartLabel(dart, state.preferences.language) : "—"}</strong><em>${dart ? renderDartMetric(game, dart) : ""}</em></div>`;
  }).join("");
  const total = GAME_CONFIGS[game.gameId].kind === "cricket" ? getTurnAwardedTotal(game) : getTurnTotal(game);
  return `<div class="turn-strip">${darts}<div class="turn-total"><span>${text("total")}</span><strong>${total}</strong></div></div>`;
}

function renderDartMetric(game, dart) {
  if (GAME_CONFIGS[game.gameId].kind !== "cricket") {
    return dart.points;
  }
  if (dart.awardedPoints > 0) {
    return `+${dart.awardedPoints}`;
  }
  return dart.marksAdded > 0 ? `+${dart.marksAdded}M` : "";
}

function renderGameIntel(game) {
  const config = GAME_CONFIGS[game.gameId];
  const status = getGameStatus(game, state.preferences.language);
  return `<div class="panel-title"><span>${text("state")}</span><em>${text("round", { round: game.round })}</em></div>
    <p class="status-copy">${escapeHtml(status)}</p>
    ${config.kind === "cricket" ? renderCricketGrid(game) : renderRules(config)}
    <div class="commentary-box"><span>${text("lastVerdict")}</span><p>${state.lastInsult ? escapeHtml(state.lastInsult) : text("waitingVerdict")}</p></div>`;
}

function renderCricketGrid(game) {
  const headers = game.players.map((player, index) => `<th${getCricketColumnAttributes(game, index, true)}><span class="cricket-player-name-viewport" data-cricket-player-name><span class="cricket-player-name-track">${escapeHtml(player.name)}</span></span></th>`).join("");
  const rows = CRICKET_TARGETS.map((target) => {
    const marks = game.players.map((player, index) => `<td${getCricketColumnAttributes(game, index)}>${renderCricketMarks(player.cricket[target])}</td>`).join("");
    const closed = game.players.every((player) => player.cricket[target] === 3);
    return `<tr class="${closed ? "closed" : ""}"><th>${target === 25 ? "B" : target}</th>${marks}</tr>`;
  }).join("");
  const beam = renderCricketBeam(getCricketBeamView(game.players.length, game.currentPlayer, game.winnerId));
  return `<div class="cricket-grid-wrap"><table class="cricket-grid"><thead><tr><th>${text("objective")}</th>${headers}</tr></thead><tbody>${rows}</tbody></table>${beam}</div>`;
}

function getCricketColumnAttributes(game, columnIndex, isHeader = false) {
  let attributes = "";
  if (isActiveCricketColumn(columnIndex, game.currentPlayer, game.winnerId)) {
    attributes = ' class="active-player-column"';
    if (isHeader) {
      attributes += ' aria-current="true"';
    }
  }
  return attributes;
}

function renderCricketMarks(markCount) {
  const mark = getCricketMarkView(markCount, state.preferences.language);
  return `<span class="cricket-marks ${mark.className}" aria-label="${mark.label}" title="${mark.label}">${mark.dots}</span>`;
}

function renderRules(config) {
  const rules = {
    x01: text("ruleX01"),
    clock: text("ruleClock"),
    high: text("ruleHigh")
  };
  return `<div class="rules"><span>${text("quickRule")}</span><p>${rules[config.kind]}</p></div>`;
}

function renderWinner(winner, insult) {
  const verdict = insult || text("winnerFallback");
  return `<div class="winner-overlay" role="dialog" aria-modal="true"><div class="winner-card bounce-in-top">
    <span class="winner-kicker">${text("gameFinished")}</span><h2>${text("wins", { name: escapeHtml(winner.name) })}</h2>
    <p>${escapeHtml(verdict)}</p>
    <button class="primary confirm" data-action="restart">${text("anotherHumiliation")}</button>
  </div></div>`;
}

function renderRestartModal() {
  if (!state.restartModalOpen) {
    return "";
  }
  const view = getRestartModalView(state.preferences.language, Boolean(state.game?.winnerId));
  return `<div class="modal-backdrop">
    <dialog open class="confirm-dialog ${view.dialogClass}" aria-labelledby="restart-title" aria-describedby="restart-copy">
      <span class="dialog-kicker">${view.kicker}</span>
      <div class="dialog-warning">${view.icon}</div>
      <h2 id="restart-title">${view.title}</h2>
      <p id="restart-copy">${view.copy}</p>
      <div class="dialog-actions">
        <button data-action="cancel-restart">${view.cancel}</button>
        <button class="${view.confirmClass}" data-action="confirm-restart">${view.confirm}</button>
      </div>
    </dialog>
  </div>`;
}

function renderFooter() {
  if (state.screen === "about") {
    return renderStatusFooter(getAboutContent(state.preferences.language).footer);
  }
  const status = state.game
    ? text("playersRound", { players: state.game.players.length, round: state.game.round })
    : text("systemReady");
  return renderStatusFooter(status);
}

function renderStatusFooter(status) {
  return `<footer><span class="live-dot"></span><strong>DARDOPS ONLINE</strong><span>${status}</span><span class="footer-spacer"></span><span>${text("footerLocal")}</span></footer>`;
}

function renderToast() {
  return state.toast ? `<div class="toast" role="alert">${escapeHtml(state.toast)}</div>` : "";
}

function bindGlobalEvents() {
  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeyboardDart);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
  window.addEventListener("resize", () => updateCricketNameScroll());
}

function bindScreenEvents() {
  document.documentElement.dataset.theme = state.preferences.theme;
  document.documentElement.lang = state.preferences.language;
  updateCricketNameScroll();
}

function handleClick(event) {
  const actionElement = event.target.closest("[data-action]");
  const gameCard = event.target.closest("[data-game-id]");
  const dartElement = event.target.closest("[data-value]");
  if (actionElement) {
    handleAction(actionElement.dataset.action);
  } else if (gameCard) {
    startGame(gameCard.dataset.gameId);
  } else if (dartElement) {
    recordDart(readDart(dartElement));
  } else if (isMissAreaClick(event.target)) {
    recordDart({ value: 0, multiplier: 1, label: text("outside") });
  }
}

function handleAction(action) {
  const actions = {
    home: requestRestart,
    "choose-game": chooseGame,
    "back-players": () => changeScreen("players"),
    undo: undoLastDart,
    restart: requestRestart,
    "cancel-restart": closeRestartModal,
    "confirm-restart": resetGame,
    theme: toggleTheme,
    sound: toggleSound,
    voice: toggleVoiceMode,
    language: toggleLanguage,
    about: openAbout,
    "close-about": closeAbout
  };
  actions[action]?.();
}

function handleInput(event) {
  if (event.target.matches("[data-player-index]")) {
    state.playerNames[Number(event.target.dataset.playerIndex)] = event.target.value;
  }
}

function handleChange(event) {
  if (!event.target.matches("[data-player-count]")) {
    return;
  }
  state.playerCount = Number(event.target.value);
  state.playerNames = Array.from({ length: state.playerCount }, (_, index) => state.playerNames[index] ?? "");
  render();
  document.querySelector(`[data-player-index="${state.playerCount - 1}"]`)?.focus();
}

function handleKeyboardDart(event) {
  if (event.key === "Escape" && state.restartModalOpen) {
    closeRestartModal();
    return;
  }
  if (event.key === "Escape" && state.screen === "about") {
    closeAbout();
    return;
  }
  const dartElement = event.target.closest("[data-value]");
  if (dartElement && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    recordDart(readDart(dartElement));
  }
}

function chooseGame() {
  const names = state.playerNames.map((name) => name.trim());
  if (names.some((name) => !name)) {
    showToast(text("missingNames"));
    return;
  }
  state.playerNames = names;
  changeScreen("games");
}

function startGame(gameId) {
  state.game = createGame(state.playerNames, gameId);
  state.screen = "game";
  state.lastInsult = "";
  state.winnerInsult = "";
  saveGame(state.game);
  render();
  announceCurrentPlayer();
}

function recordDart(dart) {
  if (!state.game || state.game.winnerId) {
    return;
  }
  const previousGame = state.game;
  state.game = throwDart(state.game, dart);
  const recordedDart = getLatestRecordedDart(state.game);
  saveGame(state.game);
  playSound(state.game.winnerId ? "win" : "dart", state.preferences.sound);
  speakDart(recordedDart, GAME_CONFIGS[state.game.gameId].kind, state.preferences.voiceMode, state.preferences.language);
  if (hasCompletedTurn(previousGame, state.game)) {
    announceTurn(state.game.lastTurn);
    if (state.game.winnerId) {
      announceWinner();
    } else {
      announceCurrentPlayer();
    }
  }
  render();
}

function getLatestRecordedDart(game) {
  const activeDart = game.darts.at(-1);
  return activeDart ?? game.lastTurn.darts.at(-1);
}

function announceTurn(turn) {
  const insult = getInsult(turn, state.lastInsult, state.preferences.language);
  state.lastInsult = insult;
  playSound("turn", state.preferences.sound);
  const status = getTurnStatus(state.game, turn, state.preferences.language);
  speakTurn(turn, status, insult, state.preferences.voiceMode, state.preferences.language);
}

function announceWinner() {
  const winner = getWinner(state.game);
  const insult = getWinnerInsult(winner.name, state.lastInsult, state.preferences.language);
  state.winnerInsult = insult;
  state.lastInsult = insult;
  speakWinner(winner.name, insult, state.preferences.voiceMode, state.preferences.language);
}

function announceCurrentPlayer() {
  const player = state.game.players[state.game.currentPlayer];
  speakPlayerTurn(player.name, state.preferences.voiceMode, state.preferences.language);
}

function undoLastDart() {
  if (!state.game || state.game.history.length === 0) {
    return;
  }
  state.game = undoDart(state.game);
  state.lastInsult = text("undoVerdict");
  cancelSpeech();
  saveGame(state.game);
  playSound("undo", state.preferences.sound);
  render();
}

function requestRestart() {
  if (!state.game) {
    resetGame();
    return;
  }
  state.restartModalOpen = true;
  render();
  document.querySelector('[data-action="cancel-restart"]')?.focus();
}

function closeRestartModal() {
  state.restartModalOpen = false;
  render();
}

function resetGame() {
  cancelSpeech();
  clearGame();
  state.game = null;
  state.screen = "players";
  state.lastInsult = "";
  state.winnerInsult = "";
  state.restartModalOpen = false;
  render();
}

function toggleTheme() {
  state.preferences.theme = state.preferences.theme === "dark" ? "light" : "dark";
  savePreference("theme", state.preferences.theme);
  applyTheme();
  render();
}

function toggleSound() {
  state.preferences.sound = !state.preferences.sound;
  savePreference("sound", state.preferences.sound);
  configureSound(state.preferences.sound);
  render();
}

function toggleVoiceMode() {
  state.preferences.voiceMode = getNextVoiceMode(state.preferences.voiceMode);
  savePreference("voiceMode", state.preferences.voiceMode);
  if (state.preferences.voiceMode === VOICE_MODES.SILENT) {
    cancelSpeech();
  }
  render();
}

function toggleLanguage() {
  state.preferences.language = getNextLanguage(state.preferences.language);
  state.lastInsult = "";
  state.winnerInsult = getLocalizedWinnerInsult();
  cancelSpeech();
  savePreference("language", state.preferences.language);
  render();
}

function openAbout() {
  if (state.screen !== "about") {
    state.aboutReturnScreen = state.screen;
  }
  cancelSpeech();
  state.screen = "about";
  render();
}

function closeAbout() {
  state.screen = state.aboutReturnScreen;
  render();
}

function getLocalizedWinnerInsult() {
  const winner = state.game ? getWinner(state.game) : null;
  return winner ? getWinnerInsult(winner.name, "", state.preferences.language) : "";
}

function changeScreen(screen) {
  state.screen = screen;
  render();
}

function applyTheme() {
  document.documentElement.dataset.theme = state.preferences.theme;
}

function readDart(element) {
  return {
    value: Number(element.dataset.value),
    multiplier: Number(element.dataset.multiplier),
    label: element.dataset.label
  };
}

function showToast(message) {
  state.toast = message;
  render();
  window.setTimeout(() => {
    state.toast = null;
    render();
  }, 3200);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function text(key, parameters) {
  return translate(state.preferences.language, key, parameters);
}
