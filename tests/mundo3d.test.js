const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
let elements={},queue=[],now=0,db={};const ctx=new Proxy({}, {get(t,k){return t[k]||(()=>{})},set(t,k,v){t[k]=v;return true}});
function element(id){return elements[id]??={textContent:'',children:[],style:{},classList:{add(){},remove(){},toggle(){}},append(...a){this.children.push(...a)},replaceChildren(){this.children=[]},addEventListener(k,v){this[k]=v},getContext(){return ctx},getBoundingClientRect(){return{left:0,top:0}},clientWidth:900,clientHeight:480}}
const world={document:{getElementById:element,createElement:()=>({textContent:'',style:{},children:[],append(...a){this.children.push(...a)}}),createTextNode:s=>s},window:{devicePixelRatio:1,addEventListener(){}},localStorage:{getItem:k=>db[k],setItem:(k,v)=>db[k]=v},requestAnimationFrame:f=>queue.push(f),location:{href:''},console,Math,Number};vm.createContext(world);
const base=path.join(__dirname,'../app/src/main/assets');for(const file of ['packing-3d.js','cargo-controls.js','routes-3d.js','mundo3d.js'])vm.runInContext(fs.readFileSync(path.join(base,file),'utf8'),world);
assert.equal(element('items').children.length,5);element('items').children[0].onclick();
for(let i=0;i<600;i++){now+=50;let q=queue;queue=[];q.forEach(f=>f(now))}
assert.match(element('stats').textContent,/Objetos 1\/24/);let save=JSON.parse(db['mudanza-world3d-v1']);assert.equal(save.cargo.length,1);assert.equal(save.cargo[0].name,'Refrigeradora');assert.equal(element('items').children[0].textContent,'Acomodar carga');
// Drag a projected point on the refrigerator's top face by 20 cm in X.
let ev=(x,y)=>({clientX:x,clientY:y,pointerId:1,preventDefault(){}});element('world').pointerdown(ev(459,19));element('world').pointermove(ev(472,25.2));element('world').pointerup(ev(472,25.2));assert.equal(JSON.parse(db['mudanza-world3d-v1']).cargo[0].x,.2,'el arrastre se guarda en la posición validada');
console.log('Mundo 3D: habitación, recorrido, arrastre y guardado correctos');
for(let pass=0;pass<4&&JSON.parse(db['mudanza-world3d-v1']).done.length<24;pass++){
 for(let ri=0;ri<5;ri++){
  for(let oi=0;oi<(ri===4?4:5);oi++){
   element('area').children[ri].onclick();let button=element('items').children[oi];if(button.disabled)continue;let before=JSON.parse(db['mudanza-world3d-v1']).done.length;button.onclick();
   for(let i=0;i<400;i++){now+=50;let q=queue;queue=[];q.forEach(f=>f(now))}
   if(JSON.parse(db['mudanza-world3d-v1']).done.length===before&&element('panel').children[0]?.textContent==='No hay espacio en este camión'){
    let send=element('panel').children.find(c=>c&&c.textContent==='Enviar y continuar');if(send){send.onclick();for(let i=0;i<100;i++){now+=50;let q=queue;queue=[];q.forEach(f=>f(now))}}element('panel').replaceChildren();
   }
  }
 }
}
const final=JSON.parse(db['mudanza-world3d-v1']);assert.equal(final.done.length,24,'todos los objetos deben ser accesibles');assert(!final.cargo.some(o=>o.name.startsWith('Transportadora de ')),'las mascotas no viajan en la carga');console.log('Partida 3D completa: 24 objetos y mascotas fuera de la carga');
vm.runInContext(fs.readFileSync(path.join(base,'mundo3d.js'),'utf8'),world);assert.match(element('stats').textContent,/Objetos 24\/24/,'el progreso debe restaurarse al abrir otra vez');console.log('Restauración de la partida completada correcta');
