export function configureSound(enabled) {
  if (window.ACS?.setEnabled) {
    window.ACS.setEnabled(enabled);
  }
}

export function playSound(name, enabled) {
  if (!enabled || !window.ACS?.trigger) {
    return;
  }
  const sounds = {
    dart: "tick",
    turn: "complete",
    win: "success",
    undo: "tap-tactile",
    warning: "warning"
  };
  window.ACS.trigger({ sound: sounds[name] ?? "notify" }, name);
}
