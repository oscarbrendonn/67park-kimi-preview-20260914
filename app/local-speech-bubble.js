import {Vector3} from 'three';
let bubble=null,expires=0,visual=null,head=null;
const anchor=new Vector3();
export function showLocalSpeech(text){
 const message=String(text??'').trim().slice(0,140);
 if(!message)return;
 if(!bubble){
  bubble=document.createElement('div');bubble.id='local-speech-bubble';
  bubble.setAttribute('role','status');bubble.setAttribute('aria-live','polite');
  bubble.style.cssText='position:fixed;left:0;top:0;z-index:25;pointer-events:none;max-width:min(240px,65vw);padding:9px 14px;border:1px solid #ded6ca;border-radius:18px;background:#fffaf1;color:#3f4650;box-shadow:0 3px 10px #0002;font:600 15px/1.3 system-ui;text-align:center;overflow-wrap:anywhere;white-space:pre-wrap;';
  document.body.append(bubble);
 }
 bubble.textContent=message; // Never interpret chat as HTML.
 bubble.hidden=true;expires=performance.now()+4500;
}
export function updateLocalSpeech(context){
 if(!bubble)return;
 if(performance.now()>expires||document.hidden||!context?.camera||!context.position||context.blocked||context.hawk||context.parked||!context.control){bubble.hidden=true;return;}
 if(visual!==context.visual){visual=context.visual;head=null;visual?.traverse?.(node=>{if(!head&&node.isBone&&/^Head(?:_\d+)?$/.test(node.name))head=node;});}
 if(head){head.getWorldPosition(anchor);anchor.y+=.55;}
 else {anchor.set(context.position.x,context.position.y+2,context.position.z);}
 anchor.project(context.camera);
 if(![anchor.x,anchor.y,anchor.z].every(Number.isFinite)||Math.abs(anchor.x)>1||Math.abs(anchor.y)>1||anchor.z<-1||anchor.z>1){bubble.hidden=true;return;}
 bubble.style.transform=`translate(${(anchor.x+1)*innerWidth/2}px,${(1-anchor.y)*innerHeight/2}px) translate(-50%,-100%)`;
 bubble.hidden=false;
}
