const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),path=require('node:path');
let elements={},queue=[],now=0,db={};const ctx=new Proxy({}, {get(t,k){return t[k]||(()=>{})},set(t,k,v){t[k]=v;return true}});
function element(id){return elements[id]??={textContent:'',children:[],style:{},classList:{add(){},remove(){},toggle(){}},append(...a){this.children.push(...a)},replaceChildren(){this.children=[]},addEventListener(k,v){this[k]=v},getContext(){return ctx},getBoundingClientRect(){return{left:0,top:0}},clientWidth:900,clientHeight:480}}
const world={document:{getElementById:element,createElement:()=>({textContent:'',style:{},children:[],append(...a){this.children.push(...a)}}),createTextNode:s=>s},window:{devicePixelRatio:1,addEventListener(){}},localStorage:{getItem:k=>db[k],setItem:(k,v)=>db[k]=v},requestAnimationFrame:f=>queue.push(f),location:{href:''},console,Math,Number};vm.createContext(world);
const base=path.join(__dirname,'../app/src/main/assets');for(const file of ['packing-3d.js','mundo3d.js'])vm.runInContext(fs.readFileSync(path.join(base,file),'utf8'),world);
assert.equal(element('items').children.length,5);element('items').children[0].onclick();
for(let i=0;i<300;i++){now+=50;let q=queue;queue=[];q.forEach(f=>f(now))}
assert.match(element('stats').textContent,/Objetos 1\/24/);let save=JSON.parse(db['mudanza-world3d-v1']);assert.equal(save.cargo.length,1);assert.equal(save.cargo[0].name,'Refrigeradora');assert.equal(element('items').children[0].textContent,'Acomodar carga');
console.log('Mundo 3D: habitación, recorrido, carga y guardado correctos');
