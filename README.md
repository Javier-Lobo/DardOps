# DardOps

Marcador local para jugar con una diana analógica. Incluye diana interactiva,
turnos automáticos de tres dardos, voz española, feedback AudioCSS y cinco juegos:
501, 301, Cricket, Vuelta al reloj y Puntuación alta.

## Arranque con Docker

```sh
./start.sh
```

Abre `http://localhost:3847`. El contenedor sirve la aplicación en el puerto
interno `8087`, se ejecuta sin privilegios y con el sistema de archivos de solo
lectura.

## Desarrollo

```sh
npm ci
npm test
npm run dev
```

La partida y las preferencias se guardan únicamente en `localStorage`. La voz
usa la síntesis integrada en el navegador y el feedback táctil se genera con
AudioCSS, sin ficheros MP3/WAV.

El botón de voz alterna entre modo completo (`A`), solo jugador/total/pulla
(`T`) y silencio (`0`). El botón de sonido controla AudioCSS por separado.
