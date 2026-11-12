'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const truck=require('../app/src/main/assets/truck-view.js');
const {objectData}=require('../app/src/main/assets/object-data.js');
const objects=[];const bounds={x:373,y:80,w:84,h:89};const cells=[];
for(let id=0;id<23;id++){
 const o={id,...objectData(id)};assert(fs.existsSync(path.join(__dirname,'../app/src/main/assets',o.sprite)));assert(truck.onObjectPlaced(objects,o));const cell=truck.position(id,bounds);const sprite=truck.contain(o.sizeBase,cell,.5);assert(sprite.w>0&&sprite.h>0);assert(Math.abs(sprite.w/sprite.h-o.sizeBase.w/o.sizeBase.h)<1e-9);assert(sprite.x>=cell.x&&sprite.y>=cell.y&&sprite.x+sprite.w<=cell.x+cell.w+1e-8&&sprite.y+sprite.h<=cell.y+cell.h+1e-8);cells.push(cell);
}
assert.equal(objects.length,23);assert.equal(truck.onObjectPlaced(objects,{id:23}),true);assert.equal(truck.onObjectPlaced(objects,{id:24}),false);assert.throws(()=>truck.position(24,bounds),RangeError);
for(let i=0;i<cells.length;i++)for(let j=i+1;j<cells.length;j++){let a=cells[i],b=cells[j];assert(a.x+a.w<=b.x+1e-8||b.x+b.w<=a.x+1e-8||a.y+a.h<=b.y+1e-8||b.y+b.h<=a.y+1e-8)}
console.log('23 objetos: posiciones, límites y proporciones correctos');
