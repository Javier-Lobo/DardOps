export function getCricketBeamView(playerCount, currentPlayer, winnerId) {
  return {
    visible: !winnerId,
    playerCount,
    playerIndex: currentPlayer
  };
}

export function isActiveCricketColumn(columnIndex, currentPlayer, winnerId) {
  return !winnerId && columnIndex === currentPlayer;
}

export function renderCricketBeam(view) {
  if (!view.visible) {
    return "";
  }
  return `<span class="cricket-beam-layer" data-player-count="${view.playerCount}" aria-hidden="true">
  <svg class="cricket-turn-beam" data-player-index="${view.playerIndex}" viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
    <defs><linearGradient id="cricket-beam-gradient" x1="0" y1="0" x2="1" y2="1">
      <stop class="cricket-beam-stop-pink" offset="0%" />
      <stop class="cricket-beam-stop-primary" offset="52%" />
      <stop class="cricket-beam-stop-cyan" offset="100%" />
    </linearGradient></defs>
    <rect class="cricket-beam-track" x="1" y="1" width="98" height="98" rx="2" pathLength="100" />
    <rect class="cricket-beam-runner" x="1" y="1" width="98" height="98" rx="2" pathLength="100" stroke="url(#cricket-beam-gradient)" />
  </svg></span>`;
}
