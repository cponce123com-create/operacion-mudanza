const assert=require('node:assert/strict'),R=require('../app/src/main/assets/routes-3d');
const obstacle={x:2,z:1,w:1,d:3};const path=R.toObject({x:1,z:2},[obstacle],obstacle);assert(path&&path.length);assert(path.every(p=>!R.blocked(p.x,p.z,[obstacle])));
const wall={x:2.3,z:0,w:.4,d:5};assert.equal(R.route({x:1,z:1},[wall],(x)=>x>3),null);
const detour=R.route({x:1,z:1},[{x:2,z:0,w:.5,d:3}],(x,z)=>x>=3&&z<=1);assert(detour&&detour.some(p=>p.z>3));assert(detour.every(p=>!R.blocked(p.x,p.z,[{x:2,z:0,w:.5,d:3}])));
const exit=R.toExit({x:1,z:1},[]);assert(exit.at(-1).x>=4.5&&exit.at(-1).z>=4.5);
console.log('Rutas: obstáculos, desvíos, bloqueo y salida correctos');
