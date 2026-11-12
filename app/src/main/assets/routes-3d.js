(function(root){'use strict';
// Grid routing in metres. Furniture footprints are expanded by the avatar radius.
const SIZE=5, STEP=.25, N=Math.round(SIZE/STEP)+1, RADIUS=.16;
function blocked(x,z,obstacles){if(x<RADIUS||z<RADIUS||x>SIZE-RADIUS||z>SIZE-RADIUS)return true;return obstacles.some(o=>x>o.x-RADIUS&&x<o.x+o.w+RADIUS&&z>o.z-RADIUS&&z<o.z+o.d+RADIUS)}
function route(start,obstacles,isGoal){const clamp=n=>Math.max(1,Math.min(N-2,Math.round(n/STEP)));let sx=clamp(start.x),sz=clamp(start.z),key=(x,z)=>z*N+x,startKey=key(sx,sz);let seen=new Set([startKey]),queue=[[sx,sz]],parent=new Map(),end=null;
 for(let i=0;i<queue.length;i++){let [x,z]=queue[i],wx=x*STEP,wz=z*STEP;if(!blocked(wx,wz,obstacles)&&isGoal(wx,wz)){end=key(x,z);break}for(let [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){let nx=x+dx,nz=z+dz,k=key(nx,nz);if(nx<1||nz<1||nx>=N-1||nz>=N-1||seen.has(k)||blocked(nx*STEP,nz*STEP,obstacles))continue;seen.add(k);parent.set(k,key(x,z));queue.push([nx,nz])}}
 if(end===null)return null;let result=[];while(end!==startKey){result.push({x:(end%N)*STEP,z:Math.floor(end/N)*STEP});end=parent.get(end)}result.reverse();return result.length?result:[{x:sx*STEP,z:sz*STEP}];}
function toObject(start,obstacles,target){return route(start,obstacles,(x,z)=>{let dx=Math.max(target.x-x,0,x-target.x-target.w),dz=Math.max(target.z-z,0,z-target.z-target.d);return Math.hypot(dx,dz)<=.55})}
function toExit(start,obstacles){return route(start,obstacles,(x,z)=>x>=4.5&&z>=4.5)}
root.RoomRoutes={blocked,route,toObject,toExit};if(typeof module!=='undefined')module.exports=root.RoomRoutes;
})(typeof globalThis!=='undefined'?globalThis:this);
