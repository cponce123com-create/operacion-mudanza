(function(root){
'use strict';
const intro='Hoy es el día en el que me voy a mudar. Así que, por favor, ¡ayúdenme!';
const ending='Sí, ahora sí me mudaré. Gracias por ayudarme. Creo que sin tu ayuda no lo hubiese podido hacer.';
const excuses=[
 '¡Pucha! Paraguay se quedó sin presidente. No creo que me mude hoy… mejor mañana.',
 '¿Vino el Papa al Perú? No puedo mudarme mientras nos visita. Mejor espero a que se vaya.',
 'Dicen que viene el fenómeno de El Niño. Mejor espero a que pase.',
 '¡El precio del oro está bajando! En estas condiciones, ¿cómo me voy a mudar?',
 '¿Porky ya no será alcalde de Lima? ¡Qué noticia! Mejor me mudo otro día.',
 'Me parece que va a llover… o tal vez salga el sol. Mejor no arriesgar.',
 'Bruno está durmiendo. No puedo interrumpir un sueño tan importante.',
 'Camila se sentó en una caja. Claramente es una señal de que debemos esperar.',
 'Acabo de recordar que no he decidido dónde irá la licuadora. ¡Hay que pensarlo bien!'
];
function excuseAt(count){return count>0&&count%10===0?excuses[(count/10-1)%excuses.length]:null}
root.Dialogue={intro,ending,excuses,excuseAt};if(typeof module!=='undefined')module.exports=root.Dialogue;
})(typeof globalThis!=='undefined'?globalThis:this);
