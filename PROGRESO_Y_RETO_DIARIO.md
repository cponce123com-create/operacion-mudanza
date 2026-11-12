# Progreso y reto diario

El reto diario selecciona 10 objetos reproducibles a partir de la fecha local del dispositivo, más el cojín y el ancla. Los objetos pesados pueden trasladarse antes que los frágiles, de manera que existe un orden sin daños si también se protegen los platos y se utilizan las transportadoras. La fecha depende del reloj y la zona horaria del dispositivo; no está sincronizada con un servidor.

Las mejores estrellas de cada modo se suman (máximo nueve). Se desbloquea un borde violeta del camión a las tres estrellas y uno dorado a las seis. El color se puede elegir en «Premios». Se guardan en el dispositivo el progreso, el mejor puntaje del modo tranquilo y contrarreloj y el mejor del reto diario de la fecha. Los datos no se comparten entre dispositivos y se pueden perder si se borran los datos de la app. No existe clasificación global ni cuenta de usuario.

Añadidos: partículas, aumento de tamaño al tocar y confeti al lograr tres estrellas. Los objetos todavía usan ilustraciones vectoriales planas; siguen pendientes sprites con acabado 3D, animaciones por fotogramas, hit-stop, mejores efectos y pruebas en dispositivos reales.

Ejecutar: `node tests/progress.test.js` y `node tests/daily-smoke.test.js`. El segundo realiza una partida diaria completa sin daños y verifica la persistencia.
