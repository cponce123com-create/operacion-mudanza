(function(root){'use strict';
const precision=n=>Math.round(n*100)/100;
// Inverse of the isometric projection used by the scene; movement stays on its current level.
function dragPosition(item,dx,dy,scale,step=.2){if(!Number.isFinite(scale)||scale<=0)throw new RangeError('Escala inválida');let x=(dx/(2*scale)+dy/(.96*scale)),z=(dy/(.96*scale)-dx/(2*scale));return {...item,x:precision(item.x+Math.round(x/step)*step),z:precision(item.z+Math.round(z/step)*step)}}
function validateLayout(cargo,item,candidate,packing){let next=cargo.map(o=>o===item?candidate:o);for(let i=0;i<next.length;i++){let result=packing.validate(next.filter((_,j)=>i!==j),next[i],next[i]);if(!result.ok)return result}return {ok:true}}
function balance(items,truck){let weight=items.reduce((sum,o)=>sum+o.weight,0);if(!weight)return {weight:0,centerX:null,centerZ:null,advice:'El camión está vacío.'};let centerX=items.reduce((sum,o)=>sum+(o.x+o.w/2)*o.weight,0)/weight,centerZ=items.reduce((sum,o)=>sum+(o.z+o.d/2)*o.weight,0)/weight;let advice=Math.abs(centerX-truck.w/2)>truck.w*.2?'Distribuye mejor el peso entre ambos lados.':centerZ>truck.d*.7?'Acerca parte del peso hacia el fondo del camión.':'Distribución lateral aproximada equilibrada. Asegura toda la carga.';return {weight,centerX,centerZ,advice}}
root.CargoControls={dragPosition,validateLayout,balance};if(typeof module!=='undefined')module.exports=root.CargoControls;
})(typeof globalThis!=='undefined'?globalThis:this);
