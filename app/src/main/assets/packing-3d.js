(function(root){'use strict';
// Dimensions are metres. Boxes may be supported by the truck floor or one stable object.
const TRUCK={w:2.2,h:2.2,d:4.2,maxWeight:1500};
const eps=1e-7;
function overlap(a,b){return a.x<b.x+b.w-eps&&a.x+a.w>b.x+eps&&a.y<b.y+b.h-eps&&a.y+a.h>b.y+eps&&a.z<b.z+b.d-eps&&a.z+a.d>b.z+eps}
function validate(items,item,p,truck=TRUCK){
 const a={...item,...p};if(![a.x,a.y,a.z,a.w,a.h,a.d,a.weight].every(Number.isFinite)||[a.w,a.h,a.d].some(n=>n<=0)||a.weight<0)return {ok:false,reason:'Medidas inválidas.'};
 if(a.x<0||a.y<0||a.z<0||a.x+a.w>truck.w+eps||a.y+a.h>truck.h+eps||a.z+a.d>truck.d+eps)return {ok:false,reason:'El objeto no cabe dentro del camión.'};
 if(items.reduce((n,o)=>n+o.weight,0)+a.weight>truck.maxWeight)return {ok:false,reason:'Se superó la capacidad de peso del camión.'};
 if(items.some(b=>overlap(a,b)))return {ok:false,reason:'El objeto se superpone con otra carga.'};
 if(a.y>eps){const base=items.find(b=>Math.abs(b.y+b.h-a.y)<eps&&a.x>=b.x-eps&&a.x+a.w<=b.x+b.w+eps&&a.z>=b.z-eps&&a.z+a.d<=b.z+b.d+eps);if(!base)return {ok:false,reason:'El objeto necesita una base que lo sostenga por completo.'};if(base.fragile||!base.stackable||a.weight>base.weight)return {ok:false,reason:'La base no soporta esta carga. Pon lo pesado abajo y protege lo frágil.'};}
 return {ok:true};
}
function findSpace(items,item,truck=TRUCK){const xs=[0,...items.map(o=>o.x+o.w)],zs=[0,...items.map(o=>o.z+o.d)],ys=[0,...items.filter(o=>o.stackable&&!o.fragile).map(o=>o.y+o.h)];for(const y of [...new Set(ys)].sort((a,b)=>a-b))for(const z of [...new Set(zs)].sort((a,b)=>a-b))for(const x of [...new Set(xs)].sort((a,b)=>a-b)){let p={x,y,z};if(validate(items,item,p,truck).ok)return p}return null}
root.Packing3D={TRUCK,overlap,validate,findSpace};if(typeof module!=='undefined')module.exports=root.Packing3D;
})(typeof globalThis!=='undefined'?globalThis:this);
