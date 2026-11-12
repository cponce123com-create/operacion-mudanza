# Mejoras de reglas y modos

Cada objeto muestra peso y fragilidad de 1 a 5 en el listado. La misma función pura `validatePlacement()` calcula la advertencia antes de cargar y el daño al completar la carga: al cancelar no se mueve ni se pierde puntaje. Un cojín cargado inmediatamente antes de un objeto frágil lo protege de las dos siguientes cargas pesadas. Un ancla cargada en primer lugar protege los frágiles normales. El espejo es frágil extremo: ni el ancla ni el cojín lo protegen de una carga pesada posterior. Si se colocan dos cojines, solamente cuenta el inmediatamente anterior. Los gatos siguen necesitando transportadora y los platos, protección.

Hay 23 objetos en 24 casillas. En el modo contrarreloj se comienza con 180 segundos, se añaden 3 segundos por entrega sin daño y se descuentan 5 por daño o por un gato escapado. Se puede deshacer la última acción dos veces; deshacer no recupera tiempo ni permite ganar segundos repetidamente. Hay 0–3 estrellas según daños y escapadas. Los sonidos y vibración dependen del dispositivo y sus ajustes.

Pendiente: animaciones detalladas y gráficos 3D de cada objeto, partículas, hit-stop, reacciones faciales, desbloqueos persistentes, desafío diario y ranking global. El ranking necesita un servicio y no se simula como si fuera global. Las pruebas automatizadas no sustituyen una prueba en Android.
