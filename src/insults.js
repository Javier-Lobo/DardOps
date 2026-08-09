import { ENGLISH_INSULTS } from "./insults-en.js";

const GENERAL_INSULTS = [
  "Te has lucido, {name}. Vergüenza debería darte.",
  "{name}, la diana está quieta. Por si necesitabas el dato.",
  "Enhorabuena, {name}: has convertido lanzar tres dardos en una amenaza pública.",
  "{name}, quizá deberías apuntar antes de lanzar. Es una técnica revolucionaria.",
  "La física ha vuelto a perder la fe en ti, {name}.",
  "{name}, hasta el silencio después de ese turno ha sido incómodo.",
  "Tres dardos, {name}. Ni uno pidió acabar en tus manos.",
  "{name}, tu precisión tiene la consistencia de una promesa electoral.",
  "Hay gente con talento, {name}. Tú aportas contraste.",
  "{name}, la diana solicita una orden de alejamiento.",
  "Magnífico, {name}. Has fallado con una seguridad conmovedora.",
  "{name}, lo tuyo no es mala suerte: ya es una metodología.",
  "La buena noticia, {name}, es que el turno ha terminado.",
  "{name}, si el objetivo era preocupar a los muebles, impecable.",
  "He visto ventiladores con mejor puntería, {name}.",
  "{name}, cada lanzamiento tuyo es una carta de amor a la mediocridad.",
  "La diana tiene veinte números, {name}. Alguno acabarás conociendo.",
  "{name}, tu técnica combina duda, caos y una preocupante falta de vergüenza.",
  "No ha sido tu peor turno, {name}. Dame tiempo para revisar el archivo.",
  "{name}, estás a una cerveza de empezar a poner excusas profesionales.",
  "Qué despliegue, {name}. Mucho brazo para tan poca consecuencia.",
  "{name}, hasta el marcador parece estar juzgándote.",
  "Eso no fue un turno, {name}; fue una petición de ayuda.",
  "{name}, si bajar la moral diera puntos, ya habrías ganado.",
  "Admirable, {name}: tres oportunidades y ninguna idea.",
  "{name}, tu rival no necesita jugar; solo esperar.",
  "Se esperaba poco de ti, {name}, y aun así has innovado.",
  "{name}, el talento te persigue, pero tú corres más.",
  "La próxima vez cierra los ojos, {name}. Estadísticamente no puede empeorar.",
  "{name}, gracias por demostrar que el cero también es una actitud.",
  "{name}, tu coordinación mano-ojo parece una relación a distancia.",
  "La diana ha visto venir tu dardo, {name}, y ni siquiera se ha preocupado.",
  "{name}, lanzas como si cada número te debiera dinero y no quisieras cobrarlo.",
  "Bonito gesto de brazo, {name}. Lástima que el dardo participara.",
  "{name}, el azar trabaja horas extra para disimular tu técnica.",
  "A este ritmo, {name}, terminarás la partida durante la próxima legislatura.",
  "{name}, hasta tu sombra ha apartado la mirada.",
  "No apuntes tanto, {name}; podrías estropear la coherencia de tus fallos.",
  "{name}, eso ha sido menos un lanzamiento y más una evacuación.",
  "La diana agradece que sigas respetando su espacio personal, {name}.",
  "{name}, tienes la puntería de una tostadora lanzada por una escalera.",
  "Otra obra maestra del desconcierto, {name}.",
  "{name}, si esto fuera entrenamiento, pedirían cancelar el experimento.",
  "Tu brazo ha tomado una decisión, {name}. Nadie sabe cuál.",
  "{name}, acabas de hacer que el turno anterior parezca competente.",
  "La constancia importa, {name}, y tú eres consistentemente preocupante.",
  "{name}, la diana no se mueve. Tú tampoco progresas.",
  "Ese turno tenía tres actos, {name}, y los tres eran tragedia.",
  "{name}, tu plan de juego parece escrito con el dardo en pleno vuelo.",
  "Un turno inolvidable, {name}. Por desgracia para todos."
];

const LOW_SCORE_INSULTS = [
  "{name}, {points} puntos. Un total tan pequeño que casi necesita microscopio.",
  "Solo {points}, {name}. La diana ni se ha enterado.",
  "{points} puntos, {name}. Tres dardos habrían hecho más daño en la caja.",
  "{name}, con {points} puntos hasta celebrar sería falta de respeto.",
  "{points}, {name}. Eso no es una puntuación, es un error de redondeo.",
  "{name}, has sumado {points}. El listón estaba en el suelo y has traído una pala.",
  "{points} puntos, {name}. He visto propinas más generosas.",
  "{name}, {points} puntos entre tres dardos. El reparto ha sido miserable.",
  "Con {points} puntos, {name}, hasta el marcador habla bajito por pudor.",
  "{name}, has conseguido {points}. No hace falta que saludes al público.",
  "{points} puntos, {name}. La aritmética también se siente decepcionada.",
  "{name}, tu turno suma {points}; tu dignidad, algo menos.",
  "Solo {points}, {name}. El esfuerzo se presupone, porque no se aprecia.",
  "{name}, {points} puntos. Técnicamente cuenta, moralmente no.",
  "{points}, {name}. La diana ha cobrado más daño emocional que físico.",
  "{name}, has rascado {points} puntos. Y rascado es ser generoso.",
  "{points} puntos, {name}. Un bostezo habría tenido más impacto.",
  "{name}, con {points} puntos sigues participando por una cuestión administrativa.",
  "Has sumado {points}, {name}. Tres dardos para producir una nota al pie.",
  "{name}, {points} puntos. El fracaso también sabe contar."
];

const BUST_INSULTS = [
  "Te has pasado, {name}. Saber restar también era parte del juego.",
  "Turno anulado, {name}. Mucha potencia y ninguna actividad cerebral.",
  "Bust, {name}. Has ganado exactamente nada con muchísimo entusiasmo.",
  "{name}, cerrar sin doble es como llamar sin saber dónde vives.",
  "Todo el turno a la basura, {name}. Al menos eres eficiente perdiendo.",
  "{name}, acabas de convertir puntos en arrepentimiento. Bust.",
  "Bust, {name}. Has cruzado la meta y seguido corriendo hacia el ridículo.",
  "{name}, te sobraron puntos y te faltó pensamiento.",
  "Turno perdido, {name}. La resta vuelve a derrotarte.",
  "{name}, acabas de donar todo el turno al vacío. Muy solidario.",
  "Bust. Excelente manera de convertir una oportunidad en decoración, {name}.",
  "{name}, lo difícil era parar a tiempo. Naturalmente, no pudiste.",
  "Te has pasado, {name}. También de optimista.",
  "Cero puntos válidos, {name}. El marcador ha borrado tu entusiasmo.",
  "{name}, has cerrado la puerta después de tirar la partida por la ventana.",
  "Bust, {name}. Tu calculadora interior ha pedido la baja.",
  "{name}, todo ese brazo para volver exactamente al mismo sitio.",
  "Turno anulado. Brillante viaje de ida y vuelta, {name}.",
  "{name}, incluso tu error venía con exceso de puntos.",
  "Bust. La próxima vez intenta perder con menos pasos, {name}."
];

const GOOD_SCORE_INSULTS = [
  "No ha estado mal, {name}. Qué incómodo tener que admitirlo.",
  "{points} puntos, {name}. Disfrútalo antes de volver a tu nivel habitual.",
  "Bien tirado, {name}. Hasta un reloj roto acierta dos veces al día.",
  "{name}, eso parecía talento. No hagamos conclusiones precipitadas.",
  "{points} puntos. Casi pareces alguien que sabe jugar, {name}.",
  "{name}, {points} puntos. Ha salido bien pese a tu participación.",
  "Buen turno, {name}. Procura no acostumbrarte a esta anomalía.",
  "{points} puntos, {name}. El talento ha pasado cerca y algo se te ha pegado.",
  "{name}, eso ha sido competente. Voy a comprobar si la diana está trucada.",
  "Inquietantes {points} puntos, {name}. Casi obligas a respetarte.",
  "{name}, has tirado bien. Qué desagradable giro de los acontecimientos.",
  "{points} puntos. Guarda el recuerdo, {name}; quizá no vuelva.",
  "{name}, por un instante parecías peligroso. Ya se nos pasará.",
  "Buen lanzamiento, {name}. Hasta tus rivales están confundidos.",
  "{points} puntos, {name}. No compensa todo lo anterior, pero distrae.",
  "{name}, eso sí ha dolido. Sobre todo a mis prejuicios sobre ti.",
  "Gran turno, {name}. Qué oportuno que nadie estuviera grabando los otros.",
  "{points} puntos, {name}. El accidente estadístico de la noche.",
  "{name}, rozas la excelencia. Tranquilo, seguro que se te pasa."
];

export function getInsult(turn, previousInsult = "", language = "es", randomValue = Math.random()) {
  const localizedInsults = getLocalizedInsults(language);
  let collection = localizedInsults.general;
  if (turn.bust) {
    collection = localizedInsults.bust;
  } else if (turn.rawPoints <= 25) {
    collection = localizedInsults.low;
  } else if (turn.rawPoints >= 100) {
    collection = localizedInsults.good;
  }
  const insults = collection.map((template) => formatInsult(template, turn));
  return selectDifferentInsult(insults, previousInsult, randomValue);
}

function getLocalizedInsults(language) {
  if (language === "en") {
    return ENGLISH_INSULTS;
  }
  return { general: GENERAL_INSULTS, low: LOW_SCORE_INSULTS, bust: BUST_INSULTS, good: GOOD_SCORE_INSULTS };
}

function formatInsult(template, turn) {
  return template
    .replaceAll("{name}", turn.playerName)
    .replaceAll("{points}", String(turn.rawPoints));
}

function selectDifferentInsult(insults, previousInsult, randomValue) {
  const available = insults.filter((insult) => insult !== previousInsult);
  const index = Math.floor(randomValue * available.length);
  return available[index];
}
