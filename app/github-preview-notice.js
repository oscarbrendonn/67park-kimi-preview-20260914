const notice=document.createElement('aside');
notice.id='github-preview-notice';
notice.setAttribute('role','status');
notice.textContent='Preview · Multiplayer not connected';
const sheet=document.createElement('link');
sheet.rel='stylesheet';
sheet.href=new URL('./responsive-shell.css?v=responsive-15',import.meta.url).href;
document.head.append(sheet);
document.body.append(notice);
