(function(root){
'use strict';
const COLUMNS=8,ROWS=3,PAGE_SIZE=COLUMNS*ROWS,CAPACITY=120;
function position(index,bounds){if(!Number.isInteger(index)||index<0||index>=CAPACITY)throw new RangeError('Camión lleno');const width=bounds.w/COLUMNS,height=bounds.h/ROWS,slot=index%PAGE_SIZE;return {x:bounds.x+(slot%COLUMNS)*width,y:bounds.y+Math.floor(slot/COLUMNS)*height,w:width,h:height};}
function contain(source,cell,padding=0){const scale=Math.min((cell.w-padding*2)/source.w,(cell.h-padding*2)/source.h);return {x:cell.x+(cell.w-source.w*scale)/2,y:cell.y+(cell.h-source.h*scale)/2,w:source.w*scale,h:source.h*scale};}
function onObjectPlaced(items,object){if(items.length>=CAPACITY)return false;items.push(object);return true;}
root.TruckView={COLUMNS,ROWS,PAGE_SIZE,CAPACITY,position,contain,onObjectPlaced};if(typeof module!=='undefined')module.exports=root.TruckView;
})(typeof globalThis!=='undefined'?globalThis:this);
