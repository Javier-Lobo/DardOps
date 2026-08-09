export const GAME_CONFIGS = Object.freeze({
  501: {
    id: "501",
    name: "501 · Doble salida",
    description: "Baja desde 501. Llegar a cero exige un doble.",
    kind: "x01",
    initialScore: 501
  },
  301: {
    id: "301",
    name: "301 · Doble salida",
    description: "Más corto, igual de despiadado. Cero exacto con doble.",
    kind: "x01",
    initialScore: 301
  },
  cricket: {
    id: "cricket",
    name: "Cricket",
    description: "Cierra 15–20 y bull. Puntúa mientras alguien siga abierto.",
    kind: "cricket"
  },
  clock: {
    id: "clock",
    name: "Vuelta al reloj",
    description: "Acierta 1–20 en orden y termina en bull.",
    kind: "clock"
  },
  high: {
    id: "high",
    name: "Puntuación alta",
    description: "Ocho rondas. Suma todo y finge que había estrategia.",
    kind: "high",
    maxRounds: 8
  }
});

export const GAME_ORDER = ["501", "301", "cricket", "clock", "high"];
export const CRICKET_TARGETS = [20, 19, 18, 17, 16, 15, 25];
