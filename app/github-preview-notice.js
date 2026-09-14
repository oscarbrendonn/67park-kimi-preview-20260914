const notice=document.createElement('aside');
notice.setAttribute('role','status');
notice.style.cssText='position:fixed;z-index:2147483000;left:50%;top:5px;transform:translateX(-50%);max-width:78vw;padding:7px 12px;border-radius:14px;background:#fff8e7;color:#534c3c;font:12px/1.35 system-ui;text-align:center;box-shadow:0 2px 10px #0002;pointer-events:none';
notice.textContent='GitHub harita önizlemesi · Çok oyunculu sunucu henüz bağlı değil';
document.body.append(notice);
