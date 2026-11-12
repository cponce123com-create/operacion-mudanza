(function(root){
'use strict';
const extra={
 Cocina:[['Microondas',3],['Horno eléctrico',3],['Cafetera',5],['Tetera',4],['Olla arrocera',4],['Sartén',4],['Cacerola grande',4],['Taza de café',1],['Tazón',0],['Jarra',1],['Copas',1],['Cuchillos',12],['Cucharones',12],['Tabla de picar',11],['Colador',4],['Especieros',0],['Manteles individuales',21],['Tostadora',5],['Vajilla especial',0],['Botellas de cocina',1]],
 Sala:[['Lámpara de pie',8],['Lámpara de mesa',8],['Mesa de centro',11],['Alfombra',20],['Control remoto',5],['Parlante',7],['Consola de juegos',7],['Fotos familiares',9],['Adorno favorito',9],['Maceta pequeña',8],['Manta del sofá',21],['Cojín azul',21],['Cojín rojo',21],['Revistas',9],['Reloj de pared',9]],
 Comedor:[['Silla de madera 1',10],['Silla de madera 2',10],['Silla de madera 3',10],['Silla de madera 4',10],['Vitrina',14],['Florero',1],['Centro de mesa',8],['Mantel',21],['Servilletero',0],['Bandeja',0],['Fuente de vidrio',0],['Jarra de agua',1]],
 Dormitorio:[['Almohada',21],['Frazada',21],['Sábanas',21],['Colchón',13],['Mesa de noche',11],['Lámpara de noche',8],['Zapatera',14],['Perchas',12],['Bolso de viaje',20],['Ropa de invierno',21],['Vestidos',21],['Caja de recuerdos',9],['Reloj despertador',5],['Libros favoritos',9],['Perfumes',1],['Joyero',9]],
 Gatos:[['Arenero de Bruno',20],['Arenero de Camila',20],['Comedero de Bruno',0],['Comedero de Camila',0],['Bebedero',0],['Rascador',14],['Pelota de Bruno',19],['Ratón de Camila',19],['Manta de los gatos',21],['Bolsa de comida',20],['Cepillo de gatos',12],['Pala de arenero',12],['Transportadora extra',20],['Caja de juguetes',20]]
};
function items(){let id=23,result=[];for(const [room,list] of Object.entries(extra)){for(const [name,baseId] of list){result.push({id:id++,room,name,baseId})}}if(result.length!==77)throw Error('Catálogo incompleto: '+result.length);return result}
root.ExtraCatalog={items};if(typeof module!=='undefined')module.exports=root.ExtraCatalog;
})(typeof globalThis!=='undefined'?globalThis:this);
