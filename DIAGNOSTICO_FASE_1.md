# Fase 1: presentación y carga

## Diagnóstico
El canvas anterior tenía un búfer fijo de 480 × 270 ampliado con `image-rendering: pixelated` y `imageSmoothingEnabled=false`, con objetos dibujados a mano a tamaños muy pequeños. En el camión se mostraban solo los últimos ocho objetos como cuadrados; el traslado utilizaba otra caja genérica.

## Corrección
Canvas ajusta el búfer al tamaño mostrado y devicePixelRatio, conservando coordenadas lógicas de 480 × 270 y filtrado suave. La casa y Anthonela se han cambiado por ilustraciones suaves inspiradas en la referencia. Los 21 objetos usan SVG independientes, compartidos entre casa, traslado, animación de carga y camión. La cuadrícula fija tiene 21 posiciones sin solapamiento; «Ver camión» permite examinarlos ampliados. Los dañados siguen visibles. Se conserva el criterio existente de daño cuando se carga un objeto pesado después de uno frágil.

La animación del vuelo utiliza easing cubic-out y dura 320 ms. `object-data.js` define geometría, sprite, peso y fragilidad; `truck-view.js` concentra el espacio y el escalado proporcional. Los dibujos de objetos son vectoriales simplificados y aún no alcanzan el acabado tridimensional del escenario. El avatar no tiene todavía una animación de caminata por fotogramas.

## Comprobación
`node tests/truck-view.test.js` comprueba límites, capacidad, 21 posiciones y proporciones. `node tests/game-smoke.test.js` simula una partida completa y verifica la carga, la animación y penalizaciones. Estas pruebas no sustituyen las capturas ni las pruebas en Android y tablet reales, que quedan pendientes.
