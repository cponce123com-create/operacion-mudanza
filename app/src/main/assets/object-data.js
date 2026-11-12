(function(root){
'use strict';
const sizes=[[24,17],[17,23],[24,40],[26,29],[22,20],[18,25],[46,28],[25,22],[21,27],[22,22],[18,23],[39,28],[18,18],[45,30],[26,43],[20,15],[22,31],[21,24],[21,24],[17,17],[22,17],[24,20],[28,25]];
const weights=[1,1,5,5,3,2,5,2,2,1,2,4,1,5,5,1,2,1,1,1,1,1,5];
const fragilities=[4,4,1,1,1,2,1,4,2,4,1,1,1,1,1,1,5,1,1,1,1,1,1];
function objectData(id){const [w,h]=sizes[id];return {special:id===21?'cushion':id===22?'anchor':null,sprite:'art/objects/'+String(id).padStart(2,'0')+'.svg',sizeBase:{w,h},shape:[0,4,7,16,17,18,19,20].includes(id)?'irregular':'rectangle',weight:weights[id],fragility:fragilities[id],anchor:{x:.5,y:1},bounds:{x:-w/2,y:-h,w,h}};}
root.ObjectData={objectData};if(typeof module!=='undefined')module.exports=root.ObjectData;
})(typeof globalThis!=='undefined'?globalThis:this);
