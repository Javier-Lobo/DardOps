import { translate } from "./i18n.js";

export function getRestartModalView(language, finishedGame) {
  if (finishedGame) {
    return {
      dialogClass: "replay-dialog",
      kicker: translate(language, "replayKicker"),
      icon: "↻",
      title: translate(language, "replayTitle"),
      copy: translate(language, "replayCopy"),
      cancel: translate(language, "replayCancel"),
      confirm: translate(language, "replayConfirm"),
      confirmClass: "primary confirm"
    };
  }
  return {
    dialogClass: "abandon-dialog",
    kicker: translate(language, "restartKicker"),
    icon: "!",
    title: translate(language, "restartTitle"),
    copy: translate(language, "restartCopy"),
    cancel: translate(language, "continueGame"),
    confirm: translate(language, "confirmRestart"),
    confirmClass: "danger"
  };
}
