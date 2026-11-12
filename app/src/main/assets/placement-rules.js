(function(root){
'use strict';
// Pure shared decision: previews and final placement consume the same result.
function validatePlacement(stack,item){
 if(!Array.isArray(stack)||!item)throw new TypeError('Carga u objeto inválido');
 const anchored=stack.length>0&&stack[0].special==='anchor';
 const previous=stack[stack.length-1];
 const protection=item.type==='fragil'&&item.fragility<5&&previous?.special==='cushion'?'cushion':item.type==='fragil'&&anchored&&item.fragility<5?'anchor':null;
 if(item.type!=='pesado'&&item.special!=='anchor')return {damageId:null,protection,warning:null};
 for(let i=0;i<stack.length;i++){
  const fragile=stack[i];if(fragile.type!=='fragil'||fragile.damaged)continue;
  const heavySince=stack.slice(i+1).filter(o=>o.type==='pesado'||o.special==='anchor').length;
  const protectedByCushion=fragile.fragility<5&&fragile.protection==='cushion'&&heavySince<2;
  const protectedByAnchor=fragile.protection==='anchor'&&fragile.fragility<5;
  if(!protectedByCushion&&!protectedByAnchor)return {damageId:fragile.id,protection:null,warning:'Al cargar '+item.name+' se dañará '+fragile.name+'.'};
 }
 return {damageId:null,protection:null,warning:null};
}
root.PlacementRules={validatePlacement};if(typeof module!=='undefined')module.exports=root.PlacementRules;
})(typeof globalThis!=='undefined'?globalThis:this);
