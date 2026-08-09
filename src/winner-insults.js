const WINNER_INSULTS = [
  "Has ganado, {name}. Intenta no convertirlo en el único logro de tu vida.",
  "Enhorabuena, {name}. Eras la opción menos mala y eso ha bastado.",
  "Victoria para {name}. El listón estaba bajo, pero al menos no tropezaste.",
  "{name} gana. Contra rivales así, tampoco prepares el desfile.",
  "Felicidades, {name}. Has demostrado ser el tuerto en este reino de ciegos.",
  "{name}, te llevas la partida. La dignidad colectiva ya estaba perdida.",
  "Victoria de {name}. Disfruta estos segundos antes de volver a ser normal.",
  "Has ganado, {name}. Qué manera tan aparatosa de cumplir con lo mínimo.",
  "{name} vence. El deporte sobrevive, aunque con secuelas.",
  "Felicidades, {name}. Alguien tenía que ganar y el sistema te ha señalado.",
  "{name}, eres el campeón. Una frase que hoy ha perdido bastante prestigio.",
  "Victoria para {name}. No fue talento; fue resistencia al bochorno.",
  "{name} gana. Los demás han colaborado de forma vergonzosamente generosa.",
  "Enhorabuena, {name}. Ya puedes presumir ante gente que no haya visto la partida.",
  "Has vencido, {name}. Borra los turnos malos y construye tu propia leyenda.",
  "{name}, campeón por eliminación natural de la competencia.",
  "Victoria de {name}. El marcador lo confirma aunque el juego no lo merezca.",
  "{name} gana. La diana pide que no se saque ninguna conclusión deportiva.",
  "Felicidades, {name}. Hoy la mediocridad ha encontrado a su monarca.",
  "Partida para {name}. El resto puso el fracaso; tú pusiste un poco menos.",
  "{name}, has ganado. Celébralo antes de que alguien pida una revancha.",
  "Victoria para {name}. Estadísticamente posible, estéticamente discutible.",
  "{name} vence. Ni brillante ni elegante, pero desgraciadamente válido.",
  "Enhorabuena, {name}. Has sido la persona más precisa de una habitación preocupante.",
  "Has ganado, {name}. La historia recordará esto exactamente hasta mañana.",
  "{name}, victoria confirmada. El comité de calidad ha presentado su dimisión.",
  "Fin de partida para {name}. La suerte también merece vacaciones.",
  "{name} gana. Un desenlace sorprendente, especialmente para la puntería.",
  "Campeón, {name}. Respira hondo: es probable que no vuelva a ocurrir.",
  "Victoria de {name}. Puedes levantar los brazos, pero aléjate de los dardos."
];

export function getWinnerInsult(playerName, previousInsult = "", randomValue = Math.random()) {
  const insults = WINNER_INSULTS.map((template) => template.replaceAll("{name}", playerName));
  const available = insults.filter((insult) => insult !== previousInsult);
  const index = Math.floor(randomValue * available.length);
  return available[index];
}
