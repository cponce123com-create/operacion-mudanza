(function(root){
'use strict';
const KEY='operacion-mudanza.progreso.v1', MODES=['normal','timed','daily'];
const skins=[{id:'classic',name:'Clásico',stars:0,color:'#f5efe3'},{id:'violet',name:'Violeta',stars:3,color:'#9b63b7'},{id:'gold',name:'Dorado',stars:6,color:'#efbf4d'}];
function dayKey(d){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function dailyIds(key){let h=2166136261;for(const c of key)h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;let pool=Array.from({length:100},(_,i)=>i).filter(i=>i!==21&&i!==22);for(let i=pool.length-1;i>0;i--){h=(Math.imul(h,1664525)+1013904223)>>>0;const j=h%(i+1);[pool[i],pool[j]]=[pool[j],pool[i]]}return pool.slice(0,10).concat([21,22]).sort((a,b)=>a-b)}
function empty(){return {best:{normal:0,timed:0,daily:0},high:{normal:0,timed:0},daily:{date:'',score:null,stars:0},skin:'classic'}}
function read(storage){try{let v=JSON.parse(storage.getItem(KEY)||'null');let base=empty();if(!v||typeof v!=='object')return base;for(const m of MODES)base.best[m]=Math.max(0,Math.min(3,Number(v.best?.[m])||0));for(const m of ['normal','timed'])base.high[m]=Number.isFinite(v.high?.[m])?v.high[m]:0;if(typeof v.daily?.date==='string'&&Number.isFinite(v.daily?.score))base.daily={date:v.daily.date,score:v.daily.score,stars:Math.max(0,Math.min(3,Number(v.daily.stars)||0))};const valid=skins.find(s=>s.id===v.skin);if(valid&&valid.stars<=totalStars(base))base.skin=valid.id;return base}catch(_){return empty()}}
function write(storage,progress){try{storage.setItem(KEY,JSON.stringify(progress));return true}catch(_){return false}}
function totalStars(p){return MODES.reduce((n,k)=>n+(p.best[k]||0),0)}
function record(p,mode,stars,score,date){if(!MODES.includes(mode))throw Error('Modo desconocido');p.best[mode]=Math.max(p.best[mode]||0,stars);if(mode==='daily'){if(p.daily.date!==date||p.daily.score===null||score>p.daily.score)p.daily={date,score,stars}}else p.high[mode]=Math.max(p.high[mode]||0,score);return p}
root.GameProgress={skins,dayKey,dailyIds,empty,read,write,totalStars,record};if(typeof module!=='undefined')module.exports=root.GameProgress;
})(typeof globalThis!=='undefined'?globalThis:this);
